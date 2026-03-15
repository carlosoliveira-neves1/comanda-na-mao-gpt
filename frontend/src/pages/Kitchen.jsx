import { useEffect, useState } from "react"
import api from "../services/api"
import AppShell from "../components/AppShell"
import SectionCard from "../components/SectionCard"

export default function Kitchen() {
  const [orders, setOrders] = useState([])

  function load() {
    api.get("/orders").then((res) => setOrders(res.data)).catch(() => {})
  }

  useEffect(() => { load() }, [])

  async function updateStatus(id, status) {
    await api.patch(`/orders/${id}/status`, { status })
    load()
  }

  return (
    <AppShell title="Cozinha" subtitle="Layout mais sólido para operação.">
      <SectionCard title="Pedidos em produção" subtitle="Leitura e ação rápida">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((o)=>
            <div key={o.id} className="card-soft card-hover p-5">
              <div className="font-bold text-slate-900">Pedido #{o.id}</div>
              <div className="text-sm text-slate-500">Mesa {o.table?.number}</div>
              <div className="mt-1 text-sm text-slate-500">Status: {o.status}</div>
              <div className="mt-4 space-y-2">
                {o.items?.map((i)=><div key={i.id} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">{i.quantity}x {i.menuItem?.name}</div>)}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="rounded-xl bg-yellow-300 px-3 py-2 text-sm font-semibold text-slate-900" onClick={()=>updateStatus(o.id,"preparando")}>Preparando</button>
                <button className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white" onClick={()=>updateStatus(o.id,"pronto")}>Pronto</button>
              </div>
            </div>
          )}
        </div>
      </SectionCard>
    </AppShell>
  )
}
