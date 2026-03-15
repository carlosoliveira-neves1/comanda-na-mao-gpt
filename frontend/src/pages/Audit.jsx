import { useEffect, useState } from "react"
import api from "../services/api"
import AppShell from "../components/AppShell"
import SectionCard from "../components/SectionCard"

export default function Audit() {
  const [items, setItems] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    api.get("/audit").then((res) => setItems(res.data)).catch((e) => setError(e?.response?.data?.error || "Erro"))
  }, [])

  return (
    <AppShell title="Auditoria" subtitle="Historico operacional com leitura mais clara e menos ruido visual.">
      {error ? <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      <SectionCard title="Eventos recentes" subtitle="Ate 300 registros">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="card-hover rounded-[24px] border border-slate-200 bg-[#f8fbfd] p-5">
              <div className="font-bold text-slate-900">{item.action}</div>
              <div className="mt-2 space-y-1 text-sm text-slate-500">
                <div>Entidade: {item.entityType} #{item.entityId || "-"}</div>
                <div>Usuario: {item.user?.name || "-"}</div>
              </div>
              <pre className="scroll-soft mt-3 overflow-auto rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                {item.payloadJson || ""}
              </pre>
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  )
}
