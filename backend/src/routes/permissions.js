const express = require("express")
const { ROLE_PERMISSIONS } = require("../services/auth/permissions")
const { requireAuth, requirePermission } = require("../middleware/auth")
const router = express.Router()

router.get("/", requireAuth, requirePermission("permissions.manage"), async (_req, res) => {
  res.json(ROLE_PERMISSIONS)
})

module.exports = router
