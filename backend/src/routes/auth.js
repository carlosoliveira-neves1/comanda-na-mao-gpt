const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const { getPermissionsByRole } = require("../services/auth/permissions")
const prisma = new PrismaClient()
const router = express.Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.isActive) return res.status(401).json({ error: "Usuário não encontrado" })
  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return res.status(401).json({ error: "Senha inválida" })

  const permissions = getPermissionsByRole(user.role)
  const token = jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions
  }, process.env.JWT_SECRET, { expiresIn: "12h" })

  await prisma.auditLog.create({
    data: {
      action: "AUTH_LOGIN",
      entityType: "USER",
      entityId: String(user.id),
      userId: user.id,
      payloadJson: JSON.stringify({ email: user.email })
    }
  })

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, permissions } })
})

router.get("/me", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Não autenticado" })
  res.json(req.user)
})

module.exports = router
