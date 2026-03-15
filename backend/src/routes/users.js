const express = require("express")
const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const { requireAuth, requirePermission } = require("../middleware/auth")
const prisma = new PrismaClient()
const router = express.Router()

router.get("/", requireAuth, requirePermission("users.manage"), async (_req, res) => {
  res.json(await prisma.user.findMany({ orderBy: { name: "asc" } }))
})

router.post("/", requireAuth, requirePermission("users.manage"), async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10)
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      isActive: true,
      passwordHash: hash
    }
  })

  await prisma.auditLog.create({
    data: {
      action: "USER_CREATE",
      entityType: "USER",
      entityId: String(user.id),
      userId: req.user.id,
      payloadJson: JSON.stringify({ email: user.email, role: user.role })
    }
  })

  res.json(user)
})

router.patch("/:id", requireAuth, requirePermission("users.manage"), async (req, res) => {
  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: {
      name: req.body.name,
      role: req.body.role,
      isActive: req.body.isActive
    }
  })

  await prisma.auditLog.create({
    data: {
      action: "USER_UPDATE",
      entityType: "USER",
      entityId: String(user.id),
      userId: req.user.id,
      payloadJson: JSON.stringify({ role: user.role, isActive: user.isActive })
    }
  })

  res.json(user)
})

module.exports = router
