import { useEffect, useState } from "react"
import api from "../services/api"
import AppShell from "../components/AppShell"
import SectionCard from "../components/SectionCard"

export default function Users() {
  const [items, setItems] = useState([])
  const [error, setError] = useState("")
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "CAIXA" })

  function load() {
    api.get("/users").then((res) => setItems(res.data)).catch((e) => setError(e?.response?.data?.error || "Erro"))
  }

  useEffect(() => { load() }, [])

  async function save() {
    try {
      await api.post("/users", form)
      setForm({ name: "", email: "", password: "", role: "CAIXA" })
      setError("")
      load()
    } catch (e) {
      setError(e?.response?.data?.error || "Erro ao salvar")
    }
  }

  return (
    <AppShell title="Usuarios" subtitle="Gestao de equipe no mesmo visual Mercado Urbano.">
      {error ? <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      <div className="grid gap-6 xl:grid-cols-[360px,1fr]">
        <SectionCard title="Novo usuario" subtitle="Cadastro rapido com campos diretos">
          <div className="space-y-3">
            <input className="input-soft" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input-soft" placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="input-soft" placeholder="Senha" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <select className="input-soft" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="ADMIN">ADMIN</option>
              <option value="GERENTE">GERENTE</option>
              <option value="GARCOM">GARCOM</option>
              <option value="COZINHA">COZINHA</option>
              <option value="CAIXA">CAIXA</option>
            </select>
            <button className="btn-primary w-full" onClick={save}>Salvar usuario</button>
          </div>
        </SectionCard>

        <SectionCard title="Equipe" subtitle="Cards de equipe mais leves e consistentes com o restante do sistema">
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item.id} className="card-hover rounded-[24px] border border-slate-200 bg-[#f8fbfd] p-5">
                <div className="font-bold text-slate-900">{item.name}</div>
                <div className="text-sm text-slate-500">{item.email}</div>
                <div className="mt-3 inline-flex rounded-full bg-[#d8eaf2] px-3 py-1 text-xs font-bold text-[#19526a]">{item.role}</div>
                <div className="mt-2 text-sm text-slate-500">Ativo: {item.isActive ? "Sim" : "Nao"}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  )
}
