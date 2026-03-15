import { useEffect, useState } from "react"
import { ClipboardList, Wallet, Printer, CheckCircle2, Store, TrendingUp, Clock3 } from "lucide-react"
import api from "../services/api"
import StatCard from "../components/StatCard"
import AppShell from "../components/AppShell"
import SectionCard from "../components/SectionCard"

export default function Dashboard() {
  const [data, setData] = useState({ totalOrders: 0, totalRevenue: 0, printQueueCount: 0, paidOrders: 0, openCashRegisters: 0, tables: [] })
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "null"))
    api.get("/dashboard").then((res) => setData(res.data)).catch(() => {})
  }, [])

  return (
    <AppShell
      title="Dashboard"
      subtitle={user ? `${user.name} • ${user.role}` : "Painel principal do sistema"}
      actions={
        <>
          <a href="/salon" className="btn-secondary">Salão</a>
          <a href="/cash-desk" className="btn-primary">Caixa</a>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-5">
        <StatCard title="Pedidos" value={data.totalOrders} icon={<ClipboardList size={20} />} color="from-yellow-300 to-orange-300" />
        <StatCard title="Faturamento" value={`R$ ${Number(data.totalRevenue || 0).toFixed(2)}`} icon={<Wallet size={20} />} color="from-pink-300 to-rose-300" />
        <StatCard title="Fila impressão" value={data.printQueueCount} icon={<Printer size={20} />} color="from-lime-300 to-emerald-300" />
        <StatCard title="Pagos" value={data.paidOrders} icon={<CheckCircle2 size={20} />} color="from-sky-300 to-cyan-300" />
        <StatCard title="Caixas abertos" value={data.openCashRegisters} icon={<Store size={20} />} color="from-fuchsia-300 to-violet-300" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <SectionCard title="Visão do salão" subtitle="Leitura rápida das mesas">
          <div className="grid gap-4 md:grid-cols-3">
            {data.tables?.map((t) => (
              <div key={t.id} className="card-hover rounded-[24px] border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900">Mesa {t.number}</div>
                  <div className={`badge-soft ${t.status === "livre" ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-700"}`}>{t.status}</div>
                </div>
                <div className="mt-3 text-sm text-slate-500">Capacidade: {t.capacity}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-6">
          <SectionCard title="Indicadores visuais">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="panel-gradient rounded-[24px] p-5">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500"><TrendingUp size={16} /> Performance</div>
                <div className="mt-3 text-2xl font-extrabold text-slate-900">Visual mais forte para apresentação</div>
                <p className="mt-2 text-sm text-slate-600">Agora o sistema tem mais presença e mais cara de produto comercial.</p>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-5 ring-1 ring-slate-100">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500"><Clock3 size={16} /> Operação</div>
                <div className="mt-3 text-2xl font-extrabold text-slate-900">Mais conforto no uso diário</div>
                <p className="mt-2 text-sm text-slate-600">Cards, espaços e hierarquia visual mais bem resolvidos.</p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  )
}
