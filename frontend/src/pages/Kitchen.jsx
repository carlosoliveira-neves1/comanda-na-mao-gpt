import { useEffect, useState } from "react"
import { Flame, TimerReset } from "lucide-react"
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
    <AppShell title="Cozinha" subtitle="Fila de producao com leitura direta e blocos mais firmes.">
      <SectionCard title="Pedidos em producao" subtitle="Leitura e acao rapida no estilo Mercado Urbano">
        <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
          {orders.map((order) => (
            <div key={order.id} className="card-hover rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(20,48,73,0.08)]">
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-900">Pedido #{order.id}</div>
                <div className="rounded-full bg-[#d8eaf2] px-3 py-1 text-xs font-bold text-[#19526a]">
                  {order.status}
                </div>
              </div>
              <div className="mt-2 text-sm text-slate-500">Mesa {order.table?.number}</div>

              <div className="mt-4 space-y-2">
                {order.items?.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 bg-[#f8fbfd] px-3 py-2 text-sm text-slate-700">
                    {item.quantity}x {item.menuItem?.name}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <TimerReset size={14} />
                Atualize o status conforme o preparo.
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="flex-1 rounded-xl bg-amber-200 px-3 py-2 text-sm font-semibold text-amber-900 sm:flex-none" onClick={() => updateStatus(order.id, "preparando")}>
                  Preparando
                </button>
                <button className="flex-1 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white sm:flex-none" onClick={() => updateStatus(order.id, "pronto")}>
                  Pronto
                </button>
              </div>
            </div>
          ))}
        </div>

        {!orders.length ? (
          <div className="mt-4 rounded-[24px] border border-slate-200 bg-[#f8fbfd] p-6 text-sm text-slate-500">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <Flame size={16} />
              Nenhum pedido na fila agora.
            </div>
          </div>
        ) : null}
      </SectionCard>
    </AppShell>
  )
}
