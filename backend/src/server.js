require("dotenv").config()
const express = require("express")
const cors = require("cors")

const { optionalAuth } = require("./middleware/auth")
const authRoutes = require("./routes/auth")
const usersRoutes = require("./routes/users")
const dashboardRoutes = require("./routes/dashboard")
const menuRoutes = require("./routes/menu")
const tablesRoutes = require("./routes/tables")
const ordersRoutes = require("./routes/orders")
const paymentsRoutes = require("./routes/payments")
const cashRoutes = require("./routes/cash")
const auditRoutes = require("./routes/audit")
const printerProfilesRoutes = require("./routes/printerProfiles")
const printRoutes = require("./routes/print")

const app = express()
app.use(cors())
app.use(express.json())
app.use(optionalAuth)

app.get("/", (_req, res) => res.json({ status: "Comanda na Mão V6" }))

app.use("/auth", authRoutes)
app.use("/users", usersRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/menu", menuRoutes)
app.use("/tables", tablesRoutes)
app.use("/orders", ordersRoutes)
app.use("/payments", paymentsRoutes)
app.use("/cash", cashRoutes)
app.use("/audit", auditRoutes)
app.use("/printer-profiles", printerProfilesRoutes)
app.use("/print", printRoutes)

if (require.main === module) {
  app.listen(process.env.PORT || 3001, () => console.log("API rodando"))
}

module.exports = app
