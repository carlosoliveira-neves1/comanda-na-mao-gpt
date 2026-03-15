import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  ChefHat,
  Users,
  UtensilsCrossed,
  Wallet,
} from "lucide-react"

const items = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Salao", "/salon", UtensilsCrossed],
  ["Cozinha", "/kitchen", ChefHat],
  ["Caixa", "/cash-desk", Wallet],
  ["Pagamentos", "/payments-history", CreditCard],
  ["Usuarios", "/users", Users],
  ["Auditoria", "/audit", ClipboardList],
]

export default function AppShell({ title, subtitle, actions, children }) {
  const [collapsed, setCollapsed] = useState(false)
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/dashboard"
  const widthClass = useMemo(() => (
    collapsed ? "lg:grid-cols-[110px,1fr]" : "lg:grid-cols-[300px,1fr]"
  ), [collapsed])

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <section className="glass-shell overflow-hidden rounded-[36px]">
          <div className={`grid gap-0 ${widthClass}`}>
            <aside className="border-b border-slate-200 bg-[linear-gradient(180deg,#123047_0%,#1f5f7a_64%,#ea6b4d_100%)] p-4 text-white md:p-6 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between gap-3">
                <div className={`flex items-center gap-4 ${collapsed ? "justify-center w-full" : ""}`}>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px] bg-white text-lg font-black text-[#123047] shadow-lg">
                    CM
                  </div>
                  {!collapsed ? (
                    <div>
                      <div className="text-xl font-extrabold">Comanda na Mao</div>
                      <div className="text-sm text-white/80">Mercado Urbano</div>
                    </div>
                  ) : null}
                </div>

                <button
                  className="hidden rounded-2xl bg-white/15 p-3 text-white shadow-sm backdrop-blur lg:block"
                  onClick={() => setCollapsed((value) => !value)}
                >
                  {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
                </button>
              </div>

              <div className="mt-8 space-y-3">
                {items.map(([label, href, Icon]) => {
                  const active = currentPath === href
                  return (
                    <a
                      key={label}
                      href={href}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? "bg-white text-[#123047] shadow-lg"
                          : "bg-white/14 text-white/92 hover:bg-white/22"
                      } ${collapsed ? "justify-center" : ""}`}
                      title={label}
                    >
                      <Icon size={18} />
                      {!collapsed ? <span>{label}</span> : null}
                    </a>
                  )
                })}
              </div>

              <div className="mt-8 rounded-[24px] border border-white/20 bg-white/12 p-4 backdrop-blur">
                <div className={`text-sm font-semibold text-white/84 ${collapsed ? "text-center" : ""}`}>Sessao</div>
                {!collapsed ? (
                  <>
                    <div className="mt-3 rounded-2xl bg-white/12 p-3 text-sm text-white/85">
                      <div className="font-bold text-white">{user?.name || "Usuario"}</div>
                      <div className="mt-1">{user?.role || "Sem perfil"}</div>
                    </div>
                    <button
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#123047]"
                      onClick={() => {
                        localStorage.removeItem("token")
                        localStorage.removeItem("user")
                        window.location.href = "/"
                      }}
                    >
                      <LogOut size={16} />
                      Sair
                    </button>
                  </>
                ) : (
                  <button
                    className="mt-3 flex w-full items-center justify-center rounded-2xl bg-white px-3 py-3 text-[#123047]"
                    onClick={() => {
                      localStorage.removeItem("token")
                      localStorage.removeItem("user")
                      window.location.href = "/"
                    }}
                    title="Sair"
                  >
                    <LogOut size={16} />
                  </button>
                )}
              </div>
            </aside>

            <main className="bg-[linear-gradient(180deg,#f8fbfd_0%,#f2f7fa_100%)] p-5 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26 }}
                className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="inline-flex rounded-full bg-[#e7f0f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#1f5f7a]">
                    Operacao
                  </div>
                  <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">{title}</h1>
                  {subtitle ? <p className="mt-2 max-w-2xl text-base text-slate-600">{subtitle}</p> : null}
                </div>
                <div className="flex gap-3 flex-wrap">{actions}</div>
              </motion.div>

              <div className="mt-8">{children}</div>
            </main>
          </div>
        </section>
      </div>
    </div>
  )
}
