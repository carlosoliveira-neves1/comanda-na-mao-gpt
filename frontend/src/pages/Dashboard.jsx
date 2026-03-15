import { useEffect, useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Printer,
  Store,
  TrendingUp,
  Wallet,
} from "lucide-react"
import api from "../services/api"
import StatCard from "../components/StatCard"
import AppShell from "../components/AppShell"
import SectionCard from "../components/SectionCard"

export default function Dashboard() {
  const [data, setData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    printQueueCount: 0,
    paidOrders: 0,
    openCashRegisters: 0,
    tables: [],
  })
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "null"))
    api.get("/dashboard").then((res) => setData(res.data)).catch(() => {})
  }, [])

  return (
    <AppShell
      title="Dashboard"
      subtitle={user ? `${user.name} - ${user.role}` : "Painel principal do sistema"}
      actions={
        <>
          <a href="/salon" className="btn-secondary text-center">Salao</a>
          <a href="/cash-desk" className="btn-primary text-center">Caixa</a>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Pedidos" value={data.totalOrders} icon={<ClipboardList size={20} />} color="from-[#ea6b4d] to-[#ffd166]" />
        <StatCard title="Faturamento" value={`R$ ${Number(data.totalRevenue || 0).toFixed(2)}`} icon={<Wallet size={20} />} color="from-[#1f5f7a] to-[#55b6e7]" />
        <StatCard title="Fila impressao" value={data.printQueueCount} icon={<Printer size={20} />} color="from-[#7dcfb6] to-[#28b284]" />
        <StatCard title="Pagos" value={data.paidOrders} icon={<CheckCircle2 size={20} />} color="from-[#55b6e7] to-[#8ecae6]" />
        <StatCard title="Caixas abertos" value={data.openCashRegisters} icon={<Store size={20} />} color="from-[#123047] to-[#1f5f7a]" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.12fr,0.88fr]">
        <SectionCard title="Visao do salao" subtitle="Grade rapida das mesas e ocupacao">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.tables?.map((table) => (
              <div key={table.id} className="card-hover rounded-[24px] border border-slate-200 bg-[#f8fbfd] p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900">Mesa {table.number}</div>
                  <div className={`badge-soft ${table.status === "livre" ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {table.status}
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-500">Capacidade: {table.capacity}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-6">
          <SectionCard title="Radar do turno" subtitle="Pontos rapidos para decidir a proxima acao">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="panel-gradient rounded-[24px] p-5">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#1f5f7a]">
                  <TrendingUp size={16} />
                  Performance
                </div>
                <div className="mt-3 text-2xl font-extrabold text-slate-900">Mais energia comercial e leitura clara.</div>
                <p className="mt-2 text-sm text-slate-600">O layout agora usa contraste suave, blocos firmes e uma linguagem mais urbana.</p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-[#f8fbfd] p-5">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  <Clock3 size={16} />
                  Operacao
                </div>
                <div className="mt-3 text-2xl font-extrabold text-slate-900">Menos cara de template, mais cara de produto.</div>
                <p className="mt-2 text-sm text-slate-600">A tela foi puxada para um visual jovem, comercial e mais vendavel.</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Atalhos" subtitle="Fluxos principais do turno">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                ["Salao", "Criar pedidos e acompanhar mesas", "/salon"],
                ["Cozinha", "Atualizar preparo e fila", "/kitchen"],
                ["Caixa", "Fechar pedidos e conferir valores", "/cash-desk"],
              ].map(([title, text, href]) => (
                <a key={title} href={href} className="card-hover rounded-[24px] border border-slate-200 bg-[#f8fbfd] p-5">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-[#d8eaf2] px-3 py-2 text-sm font-bold text-[#19526a]">{title}</div>
                    <ArrowRight size={16} className="text-slate-500" />
                  </div>
                  <div className="mt-4 text-lg font-bold text-slate-900">{title}</div>
                  <div className="mt-2 text-sm text-slate-500">{text}</div>
                </a>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  )
}
