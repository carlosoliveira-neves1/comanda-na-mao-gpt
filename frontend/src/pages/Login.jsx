import { useState } from "react"
import { ArrowRight, ChefHat, ShieldCheck, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import api from "../services/api"

export default function Login() {
  const [email, setEmail] = useState("admin@comandanamao.local")
  const [password, setPassword] = useState("123456")
  const [error, setError] = useState("")

  async function login() {
    try {
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      window.location.href = "/dashboard"
    } catch (e) {
      setError(e?.response?.data?.error || "Falha no login")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-6">
      <div className="grid w-full max-w-6xl gap-8 rounded-[36px] border border-slate-200 bg-white/90 p-6 shadow-[0_28px_90px_rgba(20,48,73,0.14)] backdrop-blur lg:grid-cols-[1.08fr,0.92fr] lg:p-8">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="panel-gradient rounded-[30px] p-8"
        >
          <div className="inline-flex rounded-full bg-[#123047] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
            Modelo 6 aplicado
          </div>
          <div className="mt-6 inline-flex h-16 w-16 items-center justify-center rounded-[24px] bg-white text-lg font-black text-[#123047] shadow-lg">
            CM
          </div>
          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Operacao de restaurante com visual mais vivo, comercial e atual.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Mercado Urbano combina grid forte, cores limpas e atmosfera de produto jovem sem perder clareza operacional.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [ChefHat, "Cozinha"],
              [Wallet, "Caixa"],
              [ShieldCheck, "Confianca"],
            ].map(([Icon, label]) => (
              <div key={label} className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm">
                <Icon size={24} className="text-[#1f5f7a]" />
                <div className="mt-3 text-sm font-semibold text-slate-800">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Pedidos", "22"],
              ["Ticket", "R$ 94"],
              ["Mesas", "11 ativas"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <div className="text-sm text-slate-500">{label}</div>
                <div className="mt-2 text-2xl font-extrabold text-slate-900">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          <div className="w-full rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_16px_48px_rgba(20,48,73,0.08)]">
            <div className="inline-flex rounded-full bg-[#eaf1f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#1f5f7a]">
              Acesso
            </div>
            <div className="mt-4 text-3xl font-extrabold text-slate-900">Entrar</div>
            <p className="mt-2 text-slate-500">Acesse o Comanda na Mao com a direcao Mercado Urbano.</p>

            <div className="mt-8 space-y-4">
              <input className="input-soft" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="input-soft" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="btn-primary flex w-full items-center justify-center gap-2" onClick={login}>
                Entrar no sistema
                <ArrowRight size={18} />
              </button>
              {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
