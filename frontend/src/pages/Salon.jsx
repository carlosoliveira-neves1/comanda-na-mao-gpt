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
      const found = prev.find((p) => p.id === item.id)
      if (found) return prev.map((p) => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)
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
      title="Salão"
      subtitle="Pedidos e mesas com uma experiência mais elegante."
      actions={<button className="btn-primary flex items-center gap-2" onClick={sendOrder}><PlusCircle size={18} /> Enviar pedido</button>}
    >
      <div className="grid gap-6 lg:grid-cols-[380px,1fr]">
        <SectionCard title="Novo pedido" subtitle="Monte a comanda rapidamente">
          <div className="space-y-3">
            <select className="input-soft" value={tableId} onChange={(e)=>setTableId(e.target.value)}>
              <option value="">Selecione a mesa</option>
              {tables.map((t)=><option key={t.id} value={t.id}>Mesa {t.number}</option>)}
            </select>
            <input className="input-soft" placeholder="Cliente" value={customerName} onChange={(e)=>setCustomerName(e.target.value)} />
            <div className="grid gap-3 max-h-[420px] overflow-auto scroll-soft pr-1">
              {menu.map((item)=>
                <button key={item.id} className="card-hover rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-left" onClick={()=>add(item)}>
                  <div className="font-bold text-slate-900">{item.name}</div>
                  <div className="mt-1 text-sm text-slate-500">R$ {Number(item.price).toFixed(2)} • {item.sector}</div>
                </button>
              )}
            </div>
            <div className="panel-gradient rounded-[24px] p-4">
              <div className="flex items-center gap-2 font-bold text-slate-900"><ShoppingBasket size={18} /> Carrinho</div>
              <div className="mt-2 space-y-2">
                {cart.length ? cart.map((i)=><div key={i.id} className="text-sm text-slate-700">{i.quantity}x {i.name}</div>) : <div className="text-sm text-slate-500">Nenhum item adicionado.</div>}
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-6">
          <SectionCard title="Mesas" subtitle="Cards mais elegantes e claros">
            <div className="grid gap-4 md:grid-cols-3">
              {tables.map((t)=>
                <div key={t.id} className="card-hover rounded-[24px] border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-slate-900">Mesa {t.number}</div>
                    <div className={`badge-soft ${t.status === "livre" ? "bg-sky-100 text-sky-700" : t.status === "ocupada" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{t.status}</div>
                  </div>
                  <div className="mt-3 text-sm text-slate-500">Capacidade: {t.capacity}</div>
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Pedidos" subtitle="Tabela-card mais bonita e clara">
            <div className="space-y-3">
              {orders.map((o)=>
                <div key={o.id} className="card-hover grid gap-4 rounded-[24px] bg-slate-50 p-5 md:grid-cols-[1fr,auto] md:items-center">
                  <div>
                    <div className="font-bold text-slate-900">Pedido #{o.id}</div>
                    <div className="mt-1 text-sm text-slate-500">Mesa {o.table?.number} • Status: {o.status}</div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button className="rounded-xl bg-yellow-300 px-3 py-2 text-sm font-semibold text-slate-900" onClick={()=>updateStatus(o.id,"preparando")}>Preparando</button>
                    <button className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white" onClick={()=>updateStatus(o.id,"pronto")}>Pronto</button>
                    <button className="rounded-xl bg-sky-500 px-3 py-2 text-sm font-semibold text-white" onClick={()=>updateStatus(o.id,"entregue")}>Entregue</button>
                  </div>
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  )
}
