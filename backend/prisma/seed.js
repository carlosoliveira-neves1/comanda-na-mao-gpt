require("dotenv").config()
const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function ensureUser(name, email, role, password) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return existing
  return prisma.user.create({
    data: {
      name,
      email,
      role,
      passwordHash: await bcrypt.hash(password, 10),
      isActive: true
    }
  })
}

async function main() {
  await ensureUser(process.env.DEFAULT_ADMIN_NAME || "Administrador", process.env.DEFAULT_ADMIN_EMAIL || "admin@comandanamao.local", "ADMIN", process.env.DEFAULT_ADMIN_PASSWORD || "123456")
  await ensureUser("Caixa", "caixa@comandanamao.local", "CAIXA", "123456")
  await ensureUser("Garçom", "garcom@comandanamao.local", "GARCOM", "123456")
  await ensureUser("Cozinha", "cozinha@comandanamao.local", "COZINHA", "123456")

  const tableCount = await prisma.table.count()
  if (!tableCount) {
    await prisma.table.createMany({
      data: [
        { number: 1, capacity: 4, status: "livre" },
        { number: 2, capacity: 4, status: "livre" },
        { number: 3, capacity: 2, status: "livre" }
      ]
    })
  }

  const menuCount = await prisma.menuItem.count()
  if (!menuCount) {
    await prisma.menuItem.createMany({
      data: [
        { name: "Hambúrguer", description: "Artesanal", price: 32.9, sector: "COZINHA", active: true },
        { name: "Batata Frita", description: "Crocante", price: 18.9, sector: "COZINHA", active: true },
        { name: "Refrigerante", description: "Lata", price: 8.0, sector: "BAR", active: true },
        { name: "Suco Natural", description: "Laranja", price: 12.0, sector: "BAR", active: true }
      ]
    })
  }

  const profiles = await prisma.printerProfile.count()
  if (!profiles) {
    await prisma.printerProfile.createMany({
      data: [
        { name: "Cozinha USB", sector: "COZINHA", bridgePrinterName: "AUTO_USB", paperWidth: 58, encoding: "CP860", isActive: true },
        { name: "Bar USB", sector: "BAR", bridgePrinterName: "AUTO_USB", paperWidth: 58, encoding: "CP860", isActive: true },
        { name: "Cliente USB", sector: "CLIENTE", bridgePrinterName: "AUTO_USB", paperWidth: 58, encoding: "CP860", isActive: true },
        { name: "Caixa USB", sector: "CAIXA", bridgePrinterName: "AUTO_USB", paperWidth: 58, encoding: "CP860", isActive: true }
      ]
    })
  }

  console.log("Seed finalizado")
}

main().finally(() => prisma.$disconnect())
