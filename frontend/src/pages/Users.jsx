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
    <AppShell title="Usuários" subtitle="Gestão de equipe com mais cara de produto.">
      {error ? <div className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
        <SectionCard title="Novo usuário">
          <div className="space-y-3">
            <input className="input-soft" placeholder="Nome" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
            <input className="input-soft" placeholder="E-mail" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
            <input className="input-soft" placeholder="Senha" type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
            <select className="input-soft" value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})}>
              <option value="ADMIN">ADMIN</option>
              <option value="GERENTE">GERENTE</option>
              <option value="GARCOM">GARÇOM</option>
              <option value="COZINHA">COZINHA</option>
              <option value="CAIXA">CAIXA</option>
            </select>
            <button className="btn-primary w-full" onClick={save}>Salvar usuário</button>
          </div>
        </SectionCard>

        <SectionCard title="Equipe">
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((i)=>
              <div key={i.id} className="card-soft card-hover p-5">
                <div className="font-bold text-slate-900">{i.name}</div>
                <div className="text-sm text-slate-500">{i.email}</div>
                <div className="mt-3 inline-flex rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">{i.role}</div>
                <div className="mt-2 text-sm text-slate-500">Ativo: {i.isActive ? "Sim" : "Não"}</div>
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  )
}
