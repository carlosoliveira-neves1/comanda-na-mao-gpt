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
    <AppShell title="Histórico de Pagamentos" subtitle="Conferência mais elegante e limpa.">
      {error ? <div className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      <SectionCard title="Pagamentos registrados">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((i)=>
            <div key={i.id} className="card-hover rounded-[24px] bg-slate-50 p-5 ring-1 ring-slate-100">
              <div className="font-bold text-slate-900">Pedido {i.orderId || "-"}</div>
              <div className="mt-3 space-y-1 text-sm text-slate-500">
                <div>Método: {i.method}</div>
                <div>Valor: R$ {Number(i.amount||0).toFixed(2)}</div>
                <div>Recebido: R$ {Number(i.amountPaid||0).toFixed(2)}</div>
                <div>Troco: R$ {Number(i.change||0).toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </SectionCard>
    </AppShell>
  )
}
