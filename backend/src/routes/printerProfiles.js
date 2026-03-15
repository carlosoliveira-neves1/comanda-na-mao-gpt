const express = require("express")
const { PrismaClient } = require("@prisma/client")
const { requireAuth, requirePermission } = require("../middleware/auth")
const prisma = new PrismaClient()
const router = express.Router()

router.get("/", requireAuth, requirePermission("print.use"), async (_req, res) => {
  res.json(await prisma.printerProfile.findMany({ orderBy: [{ sector: "asc" }, { name: "asc" }] }))
})

router.post("/", requireAuth, requirePermission("print.use"), async (req, res) => {
  const profile = await prisma.printerProfile.create({
    data: {
      name: req.body.name,
      sector: req.body.sector,
      bridgePrinterName: req.body.bridgePrinterName || "AUTO_USB",
      paperWidth: Number(req.body.paperWidth || 58),
      encoding: req.body.encoding || "CP860",
      isActive: true
    }
  })
  res.json(profile)
})

module.exports = router
