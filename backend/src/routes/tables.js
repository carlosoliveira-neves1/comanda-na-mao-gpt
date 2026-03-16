const express = require("express")
const QRCode = require("qrcode")
const { PrismaClient } = require("@prisma/client")
const { requireAuth, requirePermission } = require("../middleware/auth")
const prisma = new PrismaClient()
const router = express.Router()

function resolvePublicAppUrl(req) {
  const configured = process.env.PUBLIC_APP_URL || process.env.FRONTEND_URL
  if (configured) return configured.replace(/\/$/, "")

  const forwardedProto = req.headers["x-forwarded-proto"]
  const forwardedHost = req.headers["x-forwarded-host"] || req.headers.host

  if (forwardedHost) {
    const protocol = forwardedProto || (req.protocol || "https")
    return `${protocol}://${forwardedHost}`.replace(/\/$/, "")
  }

  return "http://localhost:5173"
}

router.get("/", requireAuth, requirePermission("orders.view"), async (_req, res) => {
  res.json(await prisma.table.findMany({ orderBy: { number: "asc" } }))
})

router.post("/", requireAuth, requirePermission("tables.manage"), async (req, res) => {
  const table = await prisma.table.create({
    data: {
      number: Number(req.body.number),
      capacity: Number(req.body.capacity || 4),
      status: req.body.status || "livre"
    }
  })
  const url = `${resolvePublicAppUrl(req)}/mesa/${table.id}`
  const qrCode = await QRCode.toDataURL(url)
  await prisma.auditLog.create({
    data: {
      action: "TABLE_CREATE",
      entityType: "TABLE",
      entityId: String(table.id),
      userId: req.user.id,
      payloadJson: JSON.stringify({ number: table.number })
    }
  })
  res.json({ table, qrCode, url })
})

module.exports = router
