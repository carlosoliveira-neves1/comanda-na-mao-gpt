const express = require("express")
const { PrismaClient } = require("@prisma/client")
const { requireAuth, requirePermission } = require("../middleware/auth")
const { print, openDrawer } = require("../services/printing/bridgeClient")
const { buildCashReport } = require("../services/printing/ticketBuilder")
const prisma = new PrismaClient()
const router = express.Router()

async function getCashPrinter() {
  const profile = await prisma.printerProfile.findFirst({
    where: { sector: "CAIXA", isActive: true },
    orderBy: { id: "asc" }
  })
  return profile || { bridgePrinterName: "AUTO_USB", paperWidth: 58, encoding: "CP860" }
}

router.get("/registers", requireAuth, requirePermission("cash.report"), async (_req, res) => {
  res.json(await prisma.cashRegister.findMany({ orderBy: { createdAt: "desc" }, include: { movements: true } }))
})

router.post("/open", requireAuth, requirePermission("cash.open"), async (req, res) => {
  const register = await prisma.cashRegister.create({
    data: {
      userName: req.user.name,
      status: "OPEN",
      openingAmount: Number(req.body.openingAmount || 0)
    }
  })
  await prisma.auditLog.create({
    data: {
      action: "CASH_OPEN",
      entityType: "CASH_REGISTER",
      entityId: String(register.id),
      userId: req.user.id,
      payloadJson: JSON.stringify({ openingAmount: register.openingAmount })
    }
  })
  res.json(register)
})

router.post("/movement", requireAuth, requirePermission("cash.move"), async (req, res) => {
  const movement = await prisma.cashMovement.create({
    data: {
      cashRegisterId: Number(req.body.cashRegisterId),
      type: req.body.type,
      amount: Number(req.body.amount || 0),
      note: req.body.note || ""
    }
  })
  await prisma.auditLog.create({
    data: {
      action: `CASH_${String(movement.type).toUpperCase()}`,
      entityType: "CASH_MOVEMENT",
      entityId: String(movement.id),
      userId: req.user.id,
      payloadJson: JSON.stringify({ amount: movement.amount, note: movement.note })
    }
  })
  if (req.body.openCashDrawer) {
    try { await openDrawer({ printerName: "AUTO_USB" }) } catch {}
  }
  res.json(movement)
})

router.post("/close/:id", requireAuth, requirePermission("cash.close"), async (req, res) => {
  const id = Number(req.params.id)
  const register = await prisma.cashRegister.findUnique({ where: { id }, include: { movements: true } })
  if (!register) return res.status(404).json({ error: "Caixa não encontrado" })

  const payments = await prisma.payment.findMany({ where: { createdAt: { gte: register.createdAt } } })
  const salesTotal = payments.reduce((s, p) => s + Number(p.amount || 0), 0)
  const pixTotal = payments.filter(p => p.method === "PIX").reduce((s, p) => s + Number(p.amount || 0), 0)
  const cardTotal = payments.filter(p => p.method === "CARTAO").reduce((s, p) => s + Number(p.amount || 0), 0)
  const cashTotal = payments.filter(p => p.method === "DINHEIRO").reduce((s, p) => s + Number(p.amount || 0), 0)
  const withdrawalTotal = register.movements.filter(m => m.type === "SANGRIA").reduce((s, m) => s + Number(m.amount || 0), 0)
  const supplyTotal = register.movements.filter(m => m.type === "SUPRIMENTO").reduce((s, m) => s + Number(m.amount || 0), 0)
  const expectedAmount = Number(register.openingAmount || 0) + cashTotal + supplyTotal - withdrawalTotal

  const closed = await prisma.cashRegister.update({
    where: { id },
    data: {
      status: "CLOSED",
      salesTotal,
      pixTotal,
      cardTotal,
      cashTotal,
      withdrawalTotal,
      supplyTotal,
      expectedAmount,
      closedAt: new Date()
    }
  })

  const printer = await getCashPrinter()
  const content = buildCashReport(closed)
  const job = await prisma.printJob.create({
    data: {
      source: "CAIXA",
      sector: "CAIXA",
      status: "queued",
      printerName: printer.bridgePrinterName,
      paperWidth: printer.paperWidth,
      copies: 1,
      content
    }
  })

  try {
    const result = await print({
      printerName: printer.bridgePrinterName,
      paperWidth: printer.paperWidth,
      encoding: printer.encoding || "CP860",
      content,
      cut: true,
      copies: 1
    })
    await prisma.printJob.update({
      where: { id: job.id },
      data: { status: "printed", printedAt: new Date(), bridgeResponseJson: JSON.stringify(result) }
    })
  } catch (error) {
    await prisma.printJob.update({
      where: { id: job.id },
      data: { status: "failed", errorMessage: error.message }
    })
  }

  await prisma.auditLog.create({
    data: {
      action: "CASH_CLOSE",
      entityType: "CASH_REGISTER",
      entityId: String(closed.id),
      userId: req.user.id,
      payloadJson: JSON.stringify({ expectedAmount: closed.expectedAmount })
    }
  })

  res.json(closed)
})

module.exports = router
