import { useEffect, useState } from "react"
import api from "../services/api"
import AppShell from "../components/AppShell"
import SectionCard from "../components/SectionCard"

export default function PaymentsHistory() {
  const [items, setItems] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    api.get("/payments").then((res) => setItems(res.data)).catch((e) => setError(e?.response?.data?.error || "Erro"))
  }, [])

  return (
    <AppShell title="Historico de Pagamentos" subtitle="Conferencia financeira no mesmo visual leve e comercial.">
      {error ? <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      <SectionCard title="Pagamentos registrados" subtitle="Leitura rapida por pedido e forma de recebimento">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="card-hover rounded-[24px] border border-slate-200 bg-[#f8fbfd] p-5">
              <div className="font-bold text-slate-900">Pedido {item.orderId || "-"}</div>
              <div className="mt-3 space-y-1 text-sm text-slate-500">
                <div>Metodo: {item.method}</div>
                <div>Valor: R$ {Number(item.amount || 0).toFixed(2)}</div>
                <div>Recebido: R$ {Number(item.amountPaid || 0).toFixed(2)}</div>
                <div>Troco: R$ {Number(item.change || 0).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  )
}
