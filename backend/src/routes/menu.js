const express = require("express")
const { PrismaClient } = require("@prisma/client")
const { requireAuth, requirePermission } = require("../middleware/auth")
const prisma = new PrismaClient()
const router = express.Router()

router.get("/", requireAuth, requirePermission("orders.view"), async (_req, res) => {
  res.json(await prisma.menuItem.findMany({ where: { active: true }, orderBy: { name: "asc" } }))
})

router.post("/", requireAuth, requirePermission("menu.manage"), async (req, res) => {
  const item = await prisma.menuItem.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price || 0),
      sector: req.body.sector || "COZINHA",
      active: true
    }
  })
  await prisma.auditLog.create({
    data: {
      action: "MENU_CREATE",
      entityType: "MENU_ITEM",
      entityId: String(item.id),
      userId: req.user.id,
      payloadJson: JSON.stringify({ name: item.name, sector: item.sector })
    }
  })
  res.json(item)
})

module.exports = router
