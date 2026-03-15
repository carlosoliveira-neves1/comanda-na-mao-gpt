import { motion } from "framer-motion"
import {
  ArrowRight,
  ChefHat,
  ClipboardList,
  CreditCard,
  Flame,
  PackageCheck,
  Receipt,
  Sparkles,
  Store,
  TimerReset,
  UtensilsCrossed,
  Wallet,
} from "lucide-react"

const concept = {
  eyebrow: "Modelo 6",
  name: "Mercado Urbano",
  description: "Direcao jovem, comercial e contemporanea, com grid forte, leitura objetiva e identidade mais viva.",
  shell: "rounded-[36px] border border-[#b7c9d4] bg-[#f3f7fa] text-[#102430] shadow-[0_28px_90px_rgba(20,48,73,0.16)]",
  accent: "bg-[#e85d3f] text-white",
  soft: "bg-[#d8eaf2] text-[#19526a]",
  muted: "text-[#547080]",
  panel: "border border-[#cfe0e8] bg-white/85",
  grad: "from-[#123047] via-[#1f5f7a] to-[#ea6b4d]",
  stats: [
    ["Pedidos balcao", "22"],
    ["Conversao combo", "38%"],
    ["Clientes ativos", "51"],
  ],
}

export default function VisualShowcase() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff4d6_0%,transparent_24%),radial-gradient(circle_at_right,#cff3ff_0%,transparent_20%),linear-gradient(180deg,#fffdf9_0%,#f8fafc_100%)] px-4 py-8 text-slate-900 md:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 overflow-hidden rounded-[36px] border border-white/70 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-8"
        >
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-[#123047] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
              Direcao escolhida
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Mercado Urbano
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Os outros estudos foram removidos. Esta pagina agora representa a unica referencia visual ativa para o frontend.
            </p>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`overflow-hidden ${concept.shell}`}
        >
          <div className="grid gap-0 lg:grid-cols-[260px,1fr]">
            <aside className="relative overflow-hidden border-b border-black/5 p-6 lg:border-b-0 lg:border-r">
              <div className={`absolute inset-0 bg-gradient-to-br opacity-95 ${concept.grad}`} />
              <div className="relative z-10">
                <div className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
                  {concept.eyebrow}
                </div>
                <h2 className="mt-6 text-3xl font-black leading-tight text-white">{concept.name}</h2>
                <p className="mt-4 text-sm leading-6 text-white/84">{concept.description}</p>

                <div className="mt-8 space-y-3">
                  {[
                    ["Login", "Acesso com presenca comercial"],
                    ["Dashboard", "Grade firme e hierarquia clara"],
                    ["Operacao", "Status e acoes mais objetivas"],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-2xl border border-white/20 bg-white/12 p-4 backdrop-blur">
                      <div className="text-sm font-semibold text-white">{title}</div>
                      <div className="mt-1 text-sm text-white/78">{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="p-6">
              <div className="grid gap-4 xl:grid-cols-[1.2fr,0.8fr]">
                <div className={`rounded-[28px] p-6 ${concept.panel}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-[0.24em] ${concept.muted}`}>Dashboard</div>
                      <div className="mt-2 text-3xl font-black">Visao principal</div>
                    </div>
                    <button className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${concept.accent}`}>
                      Aplicado
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {concept.stats.map(([label, value]) => (
                      <div key={label} className="rounded-[24px] border border-black/5 bg-white/60 p-4">
                        <div className={`text-sm ${concept.muted}`}>{label}</div>
                        <div className="mt-3 text-3xl font-black">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
                    <div className="rounded-[28px] border border-black/5 bg-white/60 p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <ClipboardList size={16} />
                        Pedidos em andamento
                      </div>
                      <div className="mt-4 space-y-3">
                        {[
                          ["Mesa 08", "4 itens", "preparando"],
                          ["Balcao", "2 itens", "pronto"],
                          ["Mesa 03", "6 itens", "aguardando"],
                        ].map(([table, items, status]) => (
                          <div key={table} className="flex items-center justify-between rounded-2xl border border-black/5 bg-white/75 px-4 py-3">
                            <div>
                              <div className="font-semibold">{table}</div>
                              <div className={`text-sm ${concept.muted}`}>{items}</div>
                            </div>
                            <div className={`rounded-full px-3 py-1 text-xs font-bold ${concept.soft}`}>{status}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-black/5 bg-white/60 p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Wallet size={16} />
                        Caixa e impressao
                      </div>
                      <div className="mt-4 grid gap-3">
                        {[
                          [Receipt, "Pagamentos", "14 concluidos"],
                          [CreditCard, "PIX e cartao", "sem divergencia"],
                          [PackageCheck, "Fila impressa", "2 pendencias"],
                        ].map(([Icon, title, text]) => (
                          <div key={title} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/75 p-3">
                            <div className={`rounded-2xl p-3 ${concept.soft}`}>
                              <Icon size={18} />
                            </div>
                            <div>
                              <div className="font-semibold">{title}</div>
                              <div className={`text-sm ${concept.muted}`}>{text}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className={`rounded-[28px] p-5 ${concept.panel}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`text-xs font-semibold uppercase tracking-[0.24em] ${concept.muted}`}>Navegacao</div>
                        <div className="mt-2 text-xl font-black">Sidebar</div>
                      </div>
                      <Sparkles size={18} />
                    </div>
                    <div className="mt-4 space-y-2">
                      {[
                        [Store, "Dashboard"],
                        [UtensilsCrossed, "Salao"],
                        [ChefHat, "Cozinha"],
                        [Wallet, "Caixa"],
                      ].map(([Icon, label], index) => (
                        <div
                          key={label}
                          className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
                            index === 0 ? concept.accent : "border border-black/5 bg-white/60"
                          }`}
                        >
                          <Icon size={18} />
                          <span className="font-medium">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`rounded-[28px] p-5 ${concept.panel}`}>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Flame size={16} />
                      Cozinha / Producao
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        ["Pedido #194", "14 min", "hamburguer, fritas, 2 bebidas"],
                        ["Pedido #195", "7 min", "bowl, suco, sobremesa"],
                      ].map(([title, time, text]) => (
                        <div key={title} className="rounded-2xl border border-black/5 bg-white/70 p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">{title}</div>
                            <div className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${concept.soft}`}>
                              <TimerReset size={12} />
                              {time}
                            </div>
                          </div>
                          <div className={`mt-2 text-sm ${concept.muted}`}>{text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
