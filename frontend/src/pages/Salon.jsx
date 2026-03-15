import { useEffect, useState } from "react"
import { PlusCircle, ShoppingBasket } from "lucide-react"
import api from "../services/api"
import AppShell from "../components/AppShell"
import SectionCard from "../components/SectionCard"

export default function Salon() {
  const [tables, setTables] = useState([])
  const [menu, setMenu] = useState([])
  const [tableId, setTableId] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])

  function load() {
    api.get("/tables").then((res) => setTables(res.data)).catch(() => {})
    api.get("/menu").then((res) => setMenu(res.data)).catch(() => {})
    api.get("/orders").then((res) => setOrders(res.data)).catch(() => {})
  }

  useEffect(() => { load() }, [])

  function add(item) {
    setCart((prev) => {
      const found = prev.find((product) => product.id === item.id)
      if (found) {
        return prev.map((product) => (
          product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product
        ))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  async function sendOrder() {
    await api.post("/orders", { tableId: Number(tableId), customerName, items: cart, source: "LOCAL" })
    setCart([])
    setCustomerName("")
    load()
  }

  async function updateStatus(id, status) {
    await api.patch(`/orders/${id}/status`, { status })
    load()
  }

  return (
    <AppShell
      title="Salao"
      subtitle="Pedidos, mesas e acompanhamento de atendimento no visual Mercado Urbano."
      actions={
        <button className="btn-primary flex items-center gap-2" onClick={sendOrder}>
          <PlusCircle size={18} />
          Enviar pedido
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[390px,1fr]">
        <SectionCard title="Novo pedido" subtitle="Monte a comanda com leitura rapida e menu direto">
          <div className="space-y-3">
            <select className="input-soft" value={tableId} onChange={(e) => setTableId(e.target.value)}>
              <option value="">Selecione a mesa</option>
              {tables.map((table) => (
                <option key={table.id} value={table.id}>Mesa {table.number}</option>
              ))}
            </select>

            <input
              className="input-soft"
              placeholder="Cliente"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <div className="grid max-h-[420px] gap-3 overflow-auto scroll-soft pr-1">
              {menu.map((item) => (
                <button
                  key={item.id}
                  className="card-hover rounded-[22px] border border-slate-200 bg-[#f8fbfd] px-4 py-3 text-left"
                  onClick={() => add(item)}
                >
                  <div className="font-bold text-slate-900">{item.name}</div>
                  <div className="mt-1 text-sm text-slate-500">R$ {Number(item.price).toFixed(2)} - {item.sector}</div>
                </button>
              ))}
            </div>

            <div className="panel-gradient rounded-[24px] p-4">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShoppingBasket size={18} />
                Carrinho
              </div>
              <div className="mt-3 space-y-2">
                {cart.length ? cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-3 py-2 text-sm text-slate-700">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-semibold">R$ {(Number(item.price) * Number(item.quantity)).toFixed(2)}</span>
                  </div>
                )) : <div className="text-sm text-slate-500">Nenhum item adicionado.</div>}
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-6">
          <SectionCard title="Mesas" subtitle="Visao leve e comercial da ocupacao atual">
            <div className="grid gap-4 md:grid-cols-3">
              {tables.map((table) => (
                <div key={table.id} className="card-hover rounded-[24px] border border-slate-200 bg-[#f8fbfd] p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-slate-900">Mesa {table.number}</div>
                    <div className={`badge-soft ${
                      table.status === "livre"
                        ? "bg-sky-100 text-sky-700"
                        : table.status === "ocupada"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                    >
                      {table.status}
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-slate-500">Capacidade: {table.capacity}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Pedidos" subtitle="Cards mais firmes para acompanhar a fila do salao">
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="card-hover grid gap-4 rounded-[24px] border border-slate-200 bg-[#f8fbfd] p-5 md:grid-cols-[1fr,auto] md:items-center">
                  <div>
                    <div className="font-bold text-slate-900">Pedido #{order.id}</div>
                    <div className="mt-1 text-sm text-slate-500">Mesa {order.table?.number} - Status: {order.status}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-xl bg-amber-200 px-3 py-2 text-sm font-semibold text-amber-900" onClick={() => updateStatus(order.id, "preparando")}>Preparando</button>
                    <button className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white" onClick={() => updateStatus(order.id, "pronto")}>Pronto</button>
                    <button className="rounded-xl bg-sky-500 px-3 py-2 text-sm font-semibold text-white" onClick={() => updateStatus(order.id, "entregue")}>Entregue</button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  )
}
