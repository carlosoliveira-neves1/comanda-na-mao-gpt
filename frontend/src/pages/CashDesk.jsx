import { useEffect, useState } from "react"
import api from "../services/api"
import AppShell from "../components/AppShell"
import SectionCard from "../components/SectionCard"

export default function CashDesk() {
  const [registers, setRegisters] = useState([])
  const [orders, setOrders] = useState([])
  const [error, setError] = useState("")
  const [openForm, setOpenForm] = useState({ openingAmount: "" })
  const [movementForm, setMovementForm] = useState({ cashRegisterId: "", type: "SANGRIA", amount: "", note: "", openCashDrawer: true })
  const [closeForm, setCloseForm] = useState({ orderId: "", method: "DINHEIRO", amountPaid: "", copies: 1, openCashDrawer: true })

  const load = () => {
    api.get("/cash/registers").then((res) => setRegisters(res.data)).catch((e) => setError(e?.response?.data?.error || "Erro"))
    api.get("/orders").then((res) => setOrders(res.data.filter((o)=>o.status !== "pago"))).catch(() => {})
  }

  useEffect(() => { load() }, [])

  async function openRegister() {
    try { await api.post("/cash/open", { openingAmount: Number(openForm.openingAmount || 0) }); setError(""); load() } catch (e) { setError(e?.response?.data?.error || "Erro") }
  }

  async function addMovement() {
    try {
      await api.post("/cash/movement", {
        cashRegisterId: Number(movementForm.cashRegisterId),
        type: movementForm.type,
        amount: Number(movementForm.amount || 0),
        note: movementForm.note,
        openCashDrawer: movementForm.openCashDrawer
      })
      setError(""); load()
    } catch (e) { setError(e?.response?.data?.error || "Erro") }
  }

  async function closeRegister(id) {
    try { await api.post(`/cash/close/${id}`, {}); setError(""); load() } catch (e) { setError(e?.response?.data?.error || "Erro") }
  }

  async function closeOrder() {
    try {
      await api.post(`/payments/close-order/${closeForm.orderId}`, {
        method: closeForm.method,
        amountPaid: Number(closeForm.amountPaid || 0),
        copies: Number(closeForm.copies || 1),
        openCashDrawer: closeForm.openCashDrawer
      })
      setError("")
      load()
    } catch (e) { setError(e?.response?.data?.error || "Erro") }
  }

  return (
    <AppShell title="Caixa" subtitle="Visual mais SaaS, organizado e elegante para operação financeira.">
      {error ? <div className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      <div className="grid gap-6 lg:grid-cols-[320px,360px,360px,1fr]">
        <SectionCard title="Abrir caixa">
          <div className="space-y-3">
            <input className="input-soft" placeholder="Fundo inicial" value={openForm.openingAmount} onChange={(e)=>setOpenForm({...openForm,openingAmount:e.target.value})} />
            <button className="btn-primary w-full" onClick={openRegister}>Abrir</button>
          </div>
        </SectionCard>

        <SectionCard title="Movimentação">
          <div className="space-y-3">
            <input className="input-soft" placeholder="Caixa ID" value={movementForm.cashRegisterId} onChange={(e)=>setMovementForm({...movementForm,cashRegisterId:e.target.value})} />
            <select className="input-soft" value={movementForm.type} onChange={(e)=>setMovementForm({...movementForm,type:e.target.value})}>
              <option value="SANGRIA">SANGRIA</option>
              <option value="SUPRIMENTO">SUPRIMENTO</option>
            </select>
            <input className="input-soft" placeholder="Valor" value={movementForm.amount} onChange={(e)=>setMovementForm({...movementForm,amount:e.target.value})} />
            <input className="input-soft" placeholder="Observação" value={movementForm.note} onChange={(e)=>setMovementForm({...movementForm,note:e.target.value})} />
            <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={movementForm.openCashDrawer} onChange={(e)=>setMovementForm({...movementForm,openCashDrawer:e.target.checked})} />Abrir gaveta</label>
            <button className="btn-secondary w-full" onClick={addMovement}>Salvar</button>
          </div>
        </SectionCard>

        <SectionCard title="Fechar pedido">
          <div className="space-y-3">
            <select className="input-soft" value={closeForm.orderId} onChange={(e)=>setCloseForm({...closeForm,orderId:e.target.value})}>
              <option value="">Selecione o pedido</option>
              {orders.map((o)=><option key={o.id} value={o.id}>Pedido #{o.id} • Mesa {o.table?.number} • R$ {Number(o.total).toFixed(2)}</option>)}
            </select>
            <select className="input-soft" value={closeForm.method} onChange={(e)=>setCloseForm({...closeForm,method:e.target.value})}>
              <option value="DINHEIRO">DINHEIRO</option>
              <option value="PIX">PIX</option>
              <option value="CARTAO">CARTAO</option>
            </select>
            <input className="input-soft" placeholder="Valor recebido" value={closeForm.amountPaid} onChange={(e)=>setCloseForm({...closeForm,amountPaid:e.target.value})} />
            <input className="input-soft" placeholder="Vias" value={closeForm.copies} onChange={(e)=>setCloseForm({...closeForm,copies:e.target.value})} />
            <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={closeForm.openCashDrawer} onChange={(e)=>setCloseForm({...closeForm,openCashDrawer:e.target.checked})} />Abrir gaveta</label>
            <button className="btn-primary w-full" onClick={closeOrder}>Fechar pedido</button>
          </div>
        </SectionCard>

        <div className="space-y-4">
          {registers.map((r)=>
            <div key={r.id} className="card-soft card-hover p-5">
              <div className="font-bold text-slate-900">Caixa #{r.id}</div>
              <div className="text-sm text-slate-500">Usuário: {r.userName}</div>
              <div className="mt-1 text-sm text-slate-500">Status: {r.status}</div>
              <div className="mt-3 grid gap-2 text-sm text-slate-700">
                <div>Abertura: R$ {Number(r.openingAmount||0).toFixed(2)}</div>
                <div>Vendas: R$ {Number(r.salesTotal||0).toFixed(2)}</div>
                <div>Esperado: R$ {Number(r.expectedAmount||0).toFixed(2)}</div>
              </div>
              {r.status==="OPEN"?<button className="mt-4 rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white" onClick={()=>closeRegister(r.id)}>Fechar caixa</button>:null}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
