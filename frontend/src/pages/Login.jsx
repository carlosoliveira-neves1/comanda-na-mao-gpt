import { useState } from "react"
import { Sparkles, ShieldCheck, ReceiptText } from "lucide-react"
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
      <div className="grid w-full max-w-6xl gap-8 rounded-[34px] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur lg:grid-cols-[1.1fr,0.9fr] lg:p-8">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="panel-gradient rounded-[30px] p-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-[24px] bg-white text-3xl shadow-lg">🍔</div>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Cara de produto premium, sem perder leveza.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Frontend mais refinado, mais apresentável e com mais sensação de sistema profissional de verdade.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [Sparkles, "Mais premium"],
              [ReceiptText, "Mais elegante"],
              [ShieldCheck, "Mais confiável"],
            ].map(([Icon, label]) => (
              <div key={label} className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <Icon size={26} className="text-slate-800" />
                <div className="mt-3 text-sm font-semibold text-slate-700">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="flex items-center">
          <div className="w-full rounded-[30px] bg-white p-8 shadow-card ring-1 ring-slate-100">
            <div className="text-3xl font-extrabold text-slate-900">Entrar</div>
            <p className="mt-2 text-slate-500">Acesse o Comanda na Mão V6.3</p>

            <div className="mt-8 space-y-4">
              <input className="input-soft" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="input-soft" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="btn-primary w-full" onClick={login}>Entrar no sistema</button>
              {error ? <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
