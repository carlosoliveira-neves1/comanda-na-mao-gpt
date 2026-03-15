import { motion } from "framer-motion"
import {
  ArrowRight,
  ChefHat,
  ClipboardList,
  CreditCard,
  Flame,
  Martini,
  PackageCheck,
  Receipt,
  Sparkles,
  Store,
  TimerReset,
  UtensilsCrossed,
  Wallet,
} from "lucide-react"

const concepts = [
  {
    id: "bistro",
    eyebrow: "Modelo 1",
    name: "Bistro Premium",
    description: "Leitura mais editorial, atmosfera sofisticada e sensação de marca própria.",
    shell: "rounded-[36px] border border-[#d8c7b0] bg-[#f6efe4] text-[#2f241d] shadow-[0_28px_90px_rgba(82,45,24,0.14)]",
    accent: "bg-[#5f1f2f] text-[#f6efe4]",
    soft: "bg-[#eadcc9] text-[#5f1f2f]",
    muted: "text-[#6f6258]",
    panel: "border border-[#d8c7b0] bg-[#fbf6ee]",
    grad: "from-[#5f1f2f] via-[#9f5c3c] to-[#d2a664]",
    fontTitle: "font-serif",
    stats: [
      ["Pedidos ativos", "28"],
      ["Ticket médio", "R$ 86"],
      ["Tempo médio", "14 min"],
    ],
  },
  {
    id: "ops",
    eyebrow: "Modelo 2",
    name: "Operação Moderna",
    description: "Contraste melhor, foco em status e velocidade de operação para salão, cozinha e caixa.",
    shell: "rounded-[36px] border border-[#27333f] bg-[#101820] text-white shadow-[0_28px_90px_rgba(3,10,18,0.48)]",
    accent: "bg-[#ff8447] text-[#101820]",
    soft: "bg-[#173042] text-[#89d1ff]",
    muted: "text-slate-300",
    panel: "border border-[#27333f] bg-[#13212d]",
    grad: "from-[#ff8447] via-[#f9c74f] to-[#6ee7b7]",
    fontTitle: "font-sans",
    stats: [
      ["Fila cozinha", "11"],
      ["Pagamentos hoje", "R$ 4.820"],
      ["Mesa girando", "07"],
    ],
  },
  {
    id: "tropical",
    eyebrow: "Modelo 3",
    name: "Tropical Contemporâneo",
    description: "Visual mais autoral e comercial, com cores leves e energia brasileira sem virar caricatura.",
    shell: "rounded-[36px] border border-[#b7d8cf] bg-[#f4fbf7] text-[#15343a] shadow-[0_28px_90px_rgba(20,92,83,0.16)]",
    accent: "bg-[#ff7a59] text-white",
    soft: "bg-[#daf4ec] text-[#0f6b68]",
    muted: "text-[#4f6f72]",
    panel: "border border-[#b7d8cf] bg-white/80",
    grad: "from-[#ff7a59] via-[#ffd166] to-[#2ec4b6]",
    fontTitle: "font-sans",
    stats: [
      ["Comandas abertas", "19"],
      ["Receita parcial", "R$ 3.240"],
      ["Entrega balcão", "06"],
    ],
  },
  {
    id: "brasserie",
    eyebrow: "Modelo 4",
    name: "Neo-Brasserie",
    description: "Um restaurante europeu reinterpretado como software: mais classe, menos cara de template.",
    shell: "rounded-[36px] border border-[#c9b79d] bg-[#f7f1e8] text-[#231a12] shadow-[0_28px_90px_rgba(79,53,32,0.16)]",
    accent: "bg-[#a06a3a] text-[#fff7ef]",
    soft: "bg-[#ece1d1] text-[#7e4f24]",
    muted: "text-[#6c5d4e]",
    panel: "border border-[#d8c8b1] bg-[#fcf8f1]",
    grad: "from-[#2a2421] via-[#6d4d39] to-[#b78a58]",
    fontTitle: "font-serif",
    stats: [
      ["Reserva em giro", "13"],
      ["Ticket premium", "R$ 132"],
      ["Comandas VIP", "04"],
    ],
  },
  {
    id: "terminal",
    eyebrow: "Modelo 5",
    name: "Terminal de Operação",
    description: "Painel duro, rápido e assertivo, pensado para leitura instantânea em cozinha e caixa.",
    shell: "rounded-[36px] border border-[#1d2e20] bg-[#08110a] text-[#d9ffe0] shadow-[0_28px_90px_rgba(2,18,6,0.55)]",
    accent: "bg-[#d7ff3f] text-[#08110a]",
    soft: "bg-[#15331a] text-[#d7ff3f]",
    muted: "text-[#8fc79a]",
    panel: "border border-[#1d2e20] bg-[#0d1910]",
    grad: "from-[#0b1208] via-[#18391b] to-[#51691e]",
    fontTitle: "font-sans",
    stats: [
      ["Tickets na fila", "17"],
      ["Falhas críticas", "00"],
      ["Tempo de expedição", "09 min"],
    ],
  },
  {
    id: "mercado",
    eyebrow: "Modelo 6",
    name: "Mercado Urbano",
    description: "Direção jovem, comercial e contemporânea, com grid forte e comunicação mais viva.",
    shell: "rounded-[36px] border border-[#b7c9d4] bg-[#f3f7fa] text-[#102430] shadow-[0_28px_90px_rgba(20,48,73,0.16)]",
    accent: "bg-[#e85d3f] text-white",
    soft: "bg-[#d8eaf2] text-[#19526a]",
    muted: "text-[#547080]",
    panel: "border border-[#cfe0e8] bg-white/85",
    grad: "from-[#123047] via-[#1f5f7a] to-[#ea6b4d]",
    fontTitle: "font-sans",
    stats: [
      ["Pedidos balcão", "22"],
      ["Conversão combo", "38%"],
      ["Clientes ativos", "51"],
    ],
  },
  {
    id: "lounge",
    eyebrow: "Modelo 7",
    name: "Hotel Lounge",
    description: "Calmo, premium e discreto, com mais espaço negativo e menos ruído visual.",
    shell: "rounded-[36px] border border-[#d3cbb7] bg-[#f5f1e8] text-[#1f2430] shadow-[0_28px_90px_rgba(49,48,39,0.15)]",
    accent: "bg-[#39414f] text-[#f5f1e8]",
    soft: "bg-[#e5dcc7] text-[#6a5c32]",
    muted: "text-[#6e726d]",
    panel: "border border-[#ddd4bf] bg-[#fbfaf5]",
    grad: "from-[#242a33] via-[#58606b] to-[#b39b68]",
    fontTitle: "font-serif",
    stats: [
      ["Atendimento lounge", "08"],
      ["Ticket médio", "R$ 148"],
      ["Tempo de mesa", "52 min"],
    ],
  },
  {
    id: "fast-casual",
    eyebrow: "Modelo 8",
    name: "Fast Casual Bold",
    description: "Energia comercial, ação rápida e presença forte para operação intensa e marca memorável.",
    shell: "rounded-[36px] border border-[#f0b68f] bg-[#fff6ec] text-[#2d1910] shadow-[0_28px_90px_rgba(131,60,12,0.18)]",
    accent: "bg-[#d9481c] text-white",
    soft: "bg-[#ffe0b8] text-[#9c320d]",
    muted: "text-[#7b5a4e]",
    panel: "border border-[#f2cfb4] bg-[#fffaf4]",
    grad: "from-[#651b0d] via-[#d9481c] to-[#f1b521]",
    fontTitle: "font-sans",
    stats: [
      ["Pedidos expressos", "31"],
      ["Tempo médio", "06 min"],
      ["Upsell", "+17%"],
    ],
  },
  {
    id: "minimal-tech",
    eyebrow: "Modelo 9",
    name: "Minimal Tech Kitchen",
    description: "Extremamente enxuto, limpo e utilitário, sem distrações e com foco em estado operacional.",
    shell: "rounded-[36px] border border-[#ced6df] bg-[#f5f7fa] text-[#0f1722] shadow-[0_28px_90px_rgba(15,23,34,0.12)]",
    accent: "bg-[#2563eb] text-white",
    soft: "bg-[#dbeafe] text-[#1d4ed8]",
    muted: "text-[#64748b]",
    panel: "border border-[#d9e2ec] bg-white",
    grad: "from-[#0f1722] via-[#1d4ed8] to-[#22c55e]",
    fontTitle: "font-sans",
    stats: [
      ["Ordens ativas", "15"],
      ["SLA interno", "94%"],
      ["Alertas", "02"],
    ],
  },
]

function ConceptCard({ concept, index }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={`overflow-hidden ${concept.shell}`}
    >
      <div className="grid gap-0 lg:grid-cols-[260px,1fr]">
        <aside className="relative overflow-hidden border-b border-black/5 p-6 lg:border-b-0 lg:border-r">
          <div className={`absolute inset-0 bg-gradient-to-br opacity-90 ${concept.grad}`} />
          <div className="relative z-10">
            <div className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
              {concept.eyebrow}
            </div>
            <h2 className={`mt-6 text-3xl font-black leading-tight text-white ${concept.fontTitle}`}>
              {concept.name}
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/84">{concept.description}</p>

            <div className="mt-8 space-y-3">
              {[
                ["Login", "Tela de entrada com identidade forte"],
                ["Dashboard", "Métricas com hierarquia real"],
                ["Operação", "Status e ações rápidos"],
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
                  <div className={`mt-2 text-3xl font-black ${concept.fontTitle}`}>Visão principal</div>
                </div>
                <button className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${concept.accent}`}>
                  Ver fluxo
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
                      ["Balcão", "2 itens", "pronto"],
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
                    Caixa e impressão
                  </div>
                  <div className="mt-4 grid gap-3">
                    {[
                      [Receipt, "Pagamentos", "14 concluídos"],
                      [CreditCard, "PIX e cartão", "sem divergência"],
                      [PackageCheck, "Fila impressa", "2 pendências"],
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
                    <div className={`text-xs font-semibold uppercase tracking-[0.24em] ${concept.muted}`}>Navegação</div>
                    <div className="mt-2 text-xl font-black">Sidebar</div>
                  </div>
                  <Sparkles size={18} />
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    [Store, "Dashboard"],
                    [UtensilsCrossed, "Salão"],
                    [ChefHat, "Cozinha"],
                    [Martini, "Bar"],
                    [Wallet, "Caixa"],
                  ].map(([Icon, label], itemIndex) => (
                    <div
                      key={label}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
                        itemIndex === 0 ? concept.accent : "border border-black/5 bg-white/60"
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
                  Cozinha / Produção
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    ["Pedido #194", "14 min", "hambúrguer, fritas, 2 bebidas"],
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
  )
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
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                Estudo visual
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                Três direções para evoluir o frontend
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Os mockups abaixo foram montados dentro do projeto para comparar linguagem visual, hierarquia e
                percepção de produto antes de reestilizar as telas reais.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Bistro Premium", "Marca e sofisticação"],
                ["Operação Moderna", "Velocidade e contraste"],
                ["Tropical Contemporâneo", "Identidade e leveza"],
                ["Neo-Brasserie", "Clássico reinterpretado"],
                ["Terminal de Operação", "Leitura instantânea"],
                ["Mercado Urbano", "Grade comercial viva"],
                ["Hotel Lounge", "Premium discreto"],
                ["Fast Casual Bold", "Energia e giro"],
                ["Minimal Tech Kitchen", "Painel enxuto"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[24px] border border-slate-200 bg-white/80 p-4">
                  <div className="text-sm font-semibold text-slate-900">{title}</div>
                  <div className="mt-1 text-sm text-slate-500">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.header>

        <div className="space-y-8">
          {concepts.map((concept, index) => (
            <ConceptCard key={concept.id} concept={concept} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
