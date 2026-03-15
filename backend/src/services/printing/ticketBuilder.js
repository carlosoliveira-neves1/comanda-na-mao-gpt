function line(width = 32, char = "-") { return char.repeat(width) }
function center(text, width = 32) {
  const t = String(text || "")
  if (t.length >= width) return t
  return " ".repeat(Math.floor((width - t.length) / 2)) + t
}
function money(value) { return `R$ ${Number(value || 0).toFixed(2)}` }

function itemLine(name, qty, total, width = 32) {
  const left = `${qty}x ${name}`
  const right = money(total)
  const maxLeft = Math.max(1, width - right.length - 1)
  const leftText = left.slice(0, maxLeft)
  const space = Math.max(1, width - leftText.length - right.length)
  return leftText + " ".repeat(space) + right
}

function buildSectorTicket(order, sector = "COZINHA") {
  const width = 32
  const lines = []
  lines.push(center("COMANDA NA MAO", width))
  lines.push(center(sector, width))
  lines.push(line(width, "="))
  lines.push(`PEDIDO: ${order.id}`)
  lines.push(`MESA: ${order.table?.number || order.tableId}`)
  if (order.customerName) lines.push(`CLIENTE: ${order.customerName}`)
  lines.push(line(width))
  for (const item of order.items || []) {
    const total = Number(item.price || 0) * Number(item.quantity || 1)
    lines.push(itemLine(item.menuItem?.name || "Item", item.quantity || 1, total, width))
    if (item.notes) lines.push(`OBS: ${item.notes}`)
  }
  lines.push(line(width))
  lines.push(`TOTAL: ${money(order.total)}`)
  lines.push(line(width, "="))
  lines.push("")
  lines.push("")
  lines.push("")
  return lines.join("\n")
}

function buildCustomerReceipt(order, payment = {}) {
  const width = 32
  const lines = []
  lines.push(center("COMANDA NA MAO", width))
  lines.push(center("COMPROVANTE", width))
  lines.push(line(width, "="))
  lines.push(`PEDIDO: ${order.id}`)
  lines.push(`MESA: ${order.table?.number || order.tableId}`)
  if (order.customerName) lines.push(`CLIENTE: ${order.customerName}`)
  lines.push(line(width))
  for (const item of order.items || []) {
    const total = Number(item.price || 0) * Number(item.quantity || 1)
    lines.push(itemLine(item.menuItem?.name || "Item", item.quantity || 1, total, width))
  }
  lines.push(line(width))
  lines.push(`TOTAL: ${money(order.total)}`)
  if (payment.method) lines.push(`PAGAMENTO: ${payment.method}`)
  if (payment.amountPaid != null) lines.push(`RECEBIDO: ${money(payment.amountPaid)}`)
  if (payment.change != null) lines.push(`TROCO: ${money(payment.change)}`)
  lines.push(line(width, "="))
  lines.push(center("OBRIGADO!", width))
  lines.push("")
  lines.push("")
  lines.push("")
  return lines.join("\n")
}

function buildCashReport(register) {
  const width = 32
  const lines = []
  lines.push(center("COMANDA NA MAO", width))
  lines.push(center("FECHAMENTO DE CAIXA", width))
  lines.push(line(width, "="))
  lines.push(`CAIXA: ${register.id}`)
  lines.push(`ABERTURA: ${money(register.openingAmount)}`)
  lines.push(`VENDAS: ${money(register.salesTotal)}`)
  lines.push(`SANGRIA: ${money(register.withdrawalTotal)}`)
  lines.push(`SUPRIMENTO: ${money(register.supplyTotal)}`)
  lines.push(`FINAL: ${money(register.expectedAmount)}`)
  lines.push(line(width))
  lines.push(`PIX: ${money(register.pixTotal)}`)
  lines.push(`CARTAO: ${money(register.cardTotal)}`)
  lines.push(`DINHEIRO: ${money(register.cashTotal)}`)
  lines.push(line(width, "="))
  lines.push("")
  lines.push("")
  lines.push("")
  return lines.join("\n")
}

module.exports = { buildSectorTicket, buildCustomerReceipt, buildCashReport }
