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
    <AppShell title="Auditoria" subtitle="Histórico mais elegante para análise.">
      {error ? <div className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      <SectionCard title="Eventos recentes" subtitle="Até 300 registros">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((i)=>
            <div key={i.id} className="card-soft card-hover p-5">
              <div className="font-bold text-slate-900">{i.action}</div>
              <div className="mt-2 space-y-1 text-sm text-slate-500">
                <div>Entidade: {i.entityType} #{i.entityId || "-"}</div>
                <div>Usuário: {i.user?.name || "-"}</div>
              </div>
              <pre className="scroll-soft mt-3 overflow-auto rounded-2xl bg-slate-50 p-3 text-xs text-slate-700">{i.payloadJson || ""}</pre>
            </div>
          )}
        </div>
      </SectionCard>
    </AppShell>
  )
}
