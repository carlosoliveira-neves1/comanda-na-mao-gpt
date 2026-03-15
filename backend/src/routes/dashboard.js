const express = require("express")
const { PrismaClient } = require("@prisma/client")
const { requireAuth, requirePermission } = require("../middleware/auth")
const prisma = new PrismaClient()
const router = express.Router()

router.get("/", requireAuth, requirePermission("dashboard.view"), async (_req, res) => {
  const totalOrders = await prisma.order.count()
  const totalRevenueAgg = await prisma.payment.aggregate({ _sum: { amount: true } })
  const printQueueCount = await prisma.printJob.count({ where: { status: { in: ["queued", "failed"] } } })
  const paidOrders = await prisma.order.count({ where: { status: "pago" } })
  const openCashRegisters = await prisma.cashRegister.count({ where: { status: "OPEN" } })
  const tables = await prisma.table.findMany({ orderBy: { number: "asc" } })
  res.json({
    totalOrders,
    totalRevenue: totalRevenueAgg._sum.amount || 0,
    printQueueCount,
    paidOrders,
    openCashRegisters,
    tables
  })
})

module.exports = router
