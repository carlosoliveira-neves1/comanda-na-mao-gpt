async function getJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
async function postJson(url, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
async function health() { return getJson(`${process.env.PRINTER_BRIDGE_URL}/health`) }
async function listPrinters() { return getJson(`${process.env.PRINTER_BRIDGE_URL}/printers`) }
async function print(job) { return postJson(`${process.env.PRINTER_BRIDGE_URL}/print`, job) }
async function openDrawer(payload = {}) { return postJson(`${process.env.PRINTER_BRIDGE_URL}/open-drawer`, payload) }
module.exports = { health, listPrinters, print, openDrawer }
