const express = require("express")
const { PrismaClient } = require("@prisma/client")
const { requireAuth, requirePermission } = require("../middleware/auth")
const { print, openDrawer } = require("../services/printing/bridgeClient")
const { buildCustomerReceipt } = require("../services/printing/ticketBuilder")
const prisma = new PrismaClient()
const router = express.Router()

async function getCustomerPrinter() {
  const profile = await prisma.printerProfile.findFirst({
    where: { sector: "CLIENTE", isActive: true },
    orderBy: { id: "asc" }
  })
  return profile || { bridgePrinterName: "AUTO_USB", paperWidth: 58, encoding: "CP860" }
}

router.get("/", requireAuth, requirePermission("payments.view"), async (_req, res) => {
  res.json(await prisma.payment.findMany({ orderBy: { createdAt: "desc" }, include: { order: true } }))
})

router.post("/close-order/:id", requireAuth, requirePermission("payments.close"), async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: Number(req.params.id) },
    include: { table: true, items: { include: { menuItem: true } }, payments: true }
  })
  if (!order) return res.status(404).json({ error: "Pedido não encontrado" })

  const amountPaid = Number(req.body.amountPaid || order.total)
  const method = String(req.body.method || "DINHEIRO").toUpperCase()
  const copies = Number(req.body.copies || 1)
  const openCashDrawer = Boolean(req.body.openCashDrawer)
  const change = Math.max(0, amountPaid - Number(order.total || 0))

  const payment = await prisma.payment.create({
    data: {
      orderId: order.id,
      method,
      amount: Number(order.total || 0),
      amountPaid,
      change
    }
  })

  await prisma.order.update({
    where: { id: order.id },
    data: { status: "pago" }
  })

  const printer = await getCustomerPrinter()
  const content = buildCustomerReceipt(order, { method, amountPaid, change })
  const job = await prisma.printJob.create({
    data: {
      orderId: order.id,
      source: "CAIXA",
      sector: "CLIENTE",
      status: "queued",
      printerName: printer.bridgePrinterName,
      paperWidth: printer.paperWidth,
      copies,
      content
    }
  })

  let drawer = null
  try {
    const result = await print({
      printerName: printer.bridgePrinterName,
      paperWidth: printer.paperWidth,
      encoding: printer.encoding || "CP860",
      content,
      cut: true,
      copies
    })

    if (openCashDrawer && method === "DINHEIRO") {
      drawer = await openDrawer({ printerName: printer.bridgePrinterName })
    }

    await prisma.printJob.update({
      where: { id: job.id },
      data: { status: "printed", printedAt: new Date(), bridgeResponseJson: JSON.stringify({ result, drawer }) }
    })
  } catch (error) {
    await prisma.printJob.update({
      where: { id: job.id },
      data: { status: "failed", errorMessage: error.message }
    })
  }

  await prisma.auditLog.create({
    data: {
      action: "PAYMENT_CLOSE_ORDER",
      entityType: "ORDER",
      entityId: String(order.id),
      userId: req.user.id,
      payloadJson: JSON.stringify({ method, amountPaid, change })
    }
  })

  res.json({ success: true, payment, drawer })
})

module.exports = router
