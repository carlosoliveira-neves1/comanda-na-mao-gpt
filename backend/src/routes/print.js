const express = require("express")
const { PrismaClient } = require("@prisma/client")
const { requireAuth, requirePermission } = require("../middleware/auth")
const { health, listPrinters, print, openDrawer } = require("../services/printing/bridgeClient")
const prisma = new PrismaClient()
const router = express.Router()

router.get("/queue", requireAuth, requirePermission("print.use"), async (_req, res) => {
  res.json(await prisma.printJob.findMany({ orderBy: { createdAt: "desc" } }))
})

router.get("/bridge-health", requireAuth, requirePermission("print.use"), async (_req, res) => {
  try { res.json(await health()) } catch (e) { res.status(500).json({ error: e.message }) }
})

router.get("/printers", requireAuth, requirePermission("print.use"), async (_req, res) => {
  try { res.json(await listPrinters()) } catch (e) { res.status(500).json({ error: e.message }) }
})

router.post("/queue/:id/send", requireAuth, requirePermission("print.use"), async (req, res) => {
  try {
    const job = await prisma.printJob.findUnique({ where: { id: Number(req.params.id) } })
    if (!job) return res.status(404).json({ error: "Job não encontrado" })
    const result = await print({
      printerName: job.printerName || "AUTO_USB",
      paperWidth: job.paperWidth || 58,
      encoding: "CP860",
      content: job.content,
      cut: true,
      copies: job.copies || 1
    })
    await prisma.printJob.update({
      where: { id: job.id },
      data: { status: "printed", printedAt: new Date(), bridgeResponseJson: JSON.stringify(result) }
    })
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post("/open-drawer", requireAuth, requirePermission("print.use"), async (req, res) => {
  try { res.json(await openDrawer(req.body || {})) } catch (e) { res.status(500).json({ error: e.message }) }
})

module.exports = router
