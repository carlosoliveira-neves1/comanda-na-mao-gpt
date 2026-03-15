import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  LayoutDashboard, UtensilsCrossed, ChefHat, Wallet, CreditCard, Users, ClipboardList,
  LogOut, PanelLeftClose, PanelLeftOpen
} from "lucide-react"

const items = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Salão", "/salon", UtensilsCrossed],
  ["Cozinha", "/kitchen", ChefHat],
  ["Caixa", "/cash-desk", Wallet],
  ["Pagamentos", "/payments-history", CreditCard],
  ["Usuários", "/users", Users],
  ["Auditoria", "/audit", ClipboardList],
]

export default function AppShell({ title, subtitle, actions, children }) {
  const [collapsed, setCollapsed] = useState(false)
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/dashboard"

  const widthClass = useMemo(() => collapsed ? "lg:grid-cols-[108px,1fr]" : "lg:grid-cols-[285px,1fr]", [collapsed])

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <section className="glass-shell overflow-hidden rounded-[34px] shadow-soft">
          <div className={`grid gap-8 ${widthClass}`}>
            <aside className="bg-[linear-gradient(180deg,#fff1b8_0%,#ffd6e7_45%,#dff4ff_100%)] p-4 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className={`flex items-center gap-4 ${collapsed ? "justify-center w-full" : ""}`}>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px] bg-white text-2xl shadow-lg">🍽️</div>
                  {!collapsed ? (
                    <div>
                      <div className="text-xl font-extrabold text-slate-900">Comanda na Mão</div>
                      <div className="text-sm text-slate-600">V6.3 Visual</div>
                    </div>
                  ) : null}
                </div>

                <button
                  className="hidden rounded-2xl bg-white/80 p-3 shadow-sm lg:block"
                  onClick={() => setCollapsed((v) => !v)}
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
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
                        active ? "bg-white text-slate-900" : "bg-white/70 text-slate-700 hover:bg-white"
                      } ${collapsed ? "justify-center" : ""}`}
                      title={label}
                    >
                      <Icon size={18} />
                      {!collapsed ? <span>{label}</span> : null}
                    </a>
                  )
                })}
              </div>

              <div className="mt-8 rounded-[24px] bg-white/75 p-4 shadow-sm">
                <div className={`text-sm font-semibold text-slate-700 ${collapsed ? "text-center" : ""}`}>Sessão</div>
                {!collapsed ? (
                  <>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      <div className="font-bold text-slate-900">{user?.name || "Usuário"}</div>
                      <div>{user?.role || "Sem perfil"}</div>
                    </div>
                    <button
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
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
                    className="mt-3 flex w-full items-center justify-center rounded-2xl bg-slate-900 px-3 py-3 text-white"
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

            <main className="p-5 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26 }}
                className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{title}</h1>
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
