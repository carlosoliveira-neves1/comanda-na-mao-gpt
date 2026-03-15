const http = require("http")
const escpos = require("@node-escpos/core")
const USBAdapter = require("@node-escpos/usb-adapter")

function json(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" })
  res.end(JSON.stringify(data))
}

function safeListDevices() {
  try {
    if (typeof USBAdapter.list === "function") return USBAdapter.list()
    return []
  } catch {
    return []
  }
}

function guessKnupDevice(devices) {
  return (Array.isArray(devices) ? devices : []).find((d) => {
    const s = JSON.stringify(d).toLowerCase()
    return s.includes("knup") || s.includes("im607") || s.includes("thermal") || s.includes("printer")
  }) || null
}

function openPrinter(payload) {
  const devices = safeListDevices()
  const preferred = guessKnupDevice(devices)
  let device
  if (preferred && preferred.vendorId && preferred.productId) device = new USBAdapter(preferred.vendorId, preferred.productId)
  else device = new USBAdapter()
  const printer = new escpos.Printer(device, { encoding: payload.encoding || "CP860" })
  return { device, printer, devices, preferred }
}

async function doPrint(payload) {
  const { device, printer, devices, preferred } = openPrinter(payload)
  const content = String(payload.content || "")
  const cut = payload.cut !== false
  const copies = Math.max(1, Number(payload.copies || 1))
  return new Promise((resolve, reject) => {
    device.open((error) => {
      if (error) return reject(error)
      try {
        for (let i = 0; i < copies; i++) {
          printer.align("lt")
          for (const line of content.split("\n")) printer.text(line)
          if (cut) printer.cut()
        }
        printer.close()
        resolve({ ok: true, printed: true, copies, printerName: payload.printerName || "AUTO_USB", preferredDevice: preferred, usbDevicesFound: devices.length })
      } catch (err) { reject(err) }
    })
  })
}

async function doOpenDrawer(payload) {
  const { device, printer, devices, preferred } = openPrinter(payload)
  return new Promise((resolve, reject) => {
    device.open((error) => {
      if (error) return reject(error)
      try {
        if (typeof printer.cashdraw === "function") printer.cashdraw(2)
        else if (typeof printer.drawer === "function") printer.drawer()
        else printer.raw(Buffer.from([0x1B, 0x70, 0x00, 0x19, 0xFA]))
        printer.close()
        resolve({ ok: true, drawerOpened: true, preferredDevice: preferred, usbDevicesFound: devices.length })
      } catch (err) { reject(err) }
    })
  })
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    const devices = safeListDevices()
    return json(res, 200, { ok: true, printerModel: "Knup KP-IM607", usbDevicesFound: devices.length, guessedKnupDevice: guessKnupDevice(devices) })
  }
  if (req.method === "GET" && req.url === "/printers") {
    const devices = safeListDevices()
    return json(res, 200, { ok: true, devices, guessedKnupDevice: guessKnupDevice(devices) })
  }
  if (req.method === "POST" && req.url === "/print") {
    let body = ""
    req.on("data", chunk => body += chunk)
    req.on("end", async () => {
      try { return json(res, 200, await doPrint(JSON.parse(body || "{}"))) }
      catch (error) { return json(res, 500, { ok: false, error: error.message }) }
    })
    return
  }
  if (req.method === "POST" && req.url === "/open-drawer") {
    let body = ""
    req.on("data", chunk => body += chunk)
    req.on("end", async () => {
      try { return json(res, 200, await doOpenDrawer(JSON.parse(body || "{}"))) }
      catch (error) { return json(res, 500, { ok: false, error: error.message }) }
    })
    return
  }
  json(res, 404, { error: "Not found" })
})

server.listen(3210, () => console.log("Printer bridge real rodando em http://localhost:3210"))
