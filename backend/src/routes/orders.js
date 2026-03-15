const express = require("express")
const { PrismaClient } = require("@prisma/client")
const { requireAuth, requirePermission } = require("../middleware/auth")
const { print } = require("../services/printing/bridgeClient")
const { buildSectorTicket } = require("../services/printing/ticketBuilder")
const prisma = new PrismaClient()
const router = express.Router()

async function getPrinterForSector(sector) {
  const profile = await prisma.printerProfile.findFirst({
    where: { sector, isActive: true },
    orderBy: { id: "asc" }
  })
  return profile || { bridgePrinterName: "AUTO_USB", paperWidth: 58, encoding: "CP860" }
}

async function sendPrintJob(order, items, sector) {
  if (!items.length) return
  const printer = await getPrinterForSector(sector)
  const content = buildSectorTicket({ ...order, items }, sector)
  const job = await prisma.printJob.create({
    data: {
      orderId: order.id,
      source: order.source,
      sector,
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
}

router.get("/", requireAuth, requirePermission("orders.view"), async (_req, res) => {
  res.json(await prisma.order.findMany({
    include: {
      table: true,
      items: { include: { menuItem: true } },
      payments: true
    },
    orderBy: { createdAt: "desc" }
  }))
})

router.post("/", requireAuth, requirePermission("orders.create"), async (req, res) => {
  const { tableId, items = [], source = "LOCAL", customerName = null } = req.body
  const total = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0)

  const order = await prisma.order.create({
    data: {
      tableId: Number(tableId),
      total,
      status: "novo",
      source,
      customerName,
      items: {
        create: items.map((item) => ({
          menuItemId: Number(item.id),
          quantity: Number(item.quantity || 1),
          price: Number(item.price || 0),
          notes: item.notes || ""
        }))
      }
    },
    include: {
      table: true,
      items: { include: { menuItem: true } }
    }
  })

  const grouped = { COZINHA: [], BAR: [] }
  for (const item of order.items) {
    const sector = String(item.menuItem?.sector || "COZINHA").toUpperCase()
    if (sector === "BAR") grouped.BAR.push(item)
    else grouped.COZINHA.push(item)
  }

  await sendPrintJob(order, grouped.COZINHA, "COZINHA")
  await sendPrintJob(order, grouped.BAR, "BAR")

  await prisma.auditLog.create({
    data: {
      action: "ORDER_CREATE",
      entityType: "ORDER",
      entityId: String(order.id),
      userId: req.user.id,
      payloadJson: JSON.stringify({ total: order.total, source: order.source })
    }
  })

  res.json(order)
})

router.patch("/:id/status", requireAuth, requirePermission("orders.manage"), async (req, res) => {
  const order = await prisma.order.update({
    where: { id: Number(req.params.id) },
    data: { status: req.body.status },
    include: { table: true, items: { include: { menuItem: true } } }
  })
  await prisma.auditLog.create({
    data: {
      action: "ORDER_STATUS",
      entityType: "ORDER",
      entityId: String(order.id),
      userId: req.user.id,
      payloadJson: JSON.stringify({ status: order.status })
    }
  })
  res.json(order)
})

module.exports = router
