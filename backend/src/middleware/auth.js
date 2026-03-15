const jwt = require("jsonwebtoken")

function optionalAuth(req, _res, next) {
  const auth = req.headers.authorization || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null
  if (!token) return next()
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
  } catch {}
  next()
}

function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Não autenticado" })
  next()
}

function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Não autenticado" })
    const permissions = req.user.permissions || []
    if (!permissions.includes(permission)) {
      return res.status(403).json({ error: "Sem permissão", permission })
    }
    next()
  }
}

module.exports = { optionalAuth, requireAuth, requirePermission }
