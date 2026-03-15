const express = require("express")
const { PrismaClient } = require("@prisma/client")
const { requireAuth, requirePermission } = require("../middleware/auth")
const prisma = new PrismaClient()
const router = express.Router()

router.get("/", requireAuth, requirePermission("audit.view"), async (_req, res) => {
  res.json(await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
    take: 300
  }))
})

module.exports = router
