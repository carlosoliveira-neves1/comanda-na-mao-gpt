const ROLE_PERMISSIONS = {
  ADMIN: [
    "dashboard.view",
    "users.manage",
    "menu.manage",
    "tables.manage",
    "orders.view",
    "orders.create",
    "orders.manage",
    "payments.view",
    "payments.close",
    "cash.open",
    "cash.move",
    "cash.close",
    "cash.report",
    "print.use",
    "audit.view"
  ],
  GERENTE: [
    "dashboard.view",
    "menu.manage",
    "tables.manage",
    "orders.view",
    "orders.create",
    "orders.manage",
    "payments.view",
    "payments.close",
    "cash.open",
    "cash.move",
    "cash.close",
    "cash.report",
    "print.use",
    "audit.view"
  ],
  GARCOM: [
    "dashboard.view",
    "orders.view",
    "orders.create",
    "orders.manage"
  ],
  COZINHA: [
    "dashboard.view",
    "orders.view",
    "orders.manage",
    "print.use"
  ],
  CAIXA: [
    "dashboard.view",
    "payments.view",
    "payments.close",
    "cash.open",
    "cash.move",
    "cash.close",
    "cash.report",
    "print.use"
  ]
}

function getPermissionsByRole(role) {
  return ROLE_PERMISSIONS[String(role || "").toUpperCase()] || []
}

module.exports = { ROLE_PERMISSIONS, getPermissionsByRole }
