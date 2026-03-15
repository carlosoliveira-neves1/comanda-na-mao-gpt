import { useEffect, useState } from "react"
import { ShoppingBasket } from "lucide-react"
import { useParams } from "react-router-dom"
import api from "../services/api"

export default function Menu() {
  const { table } = useParams()
  const [items, setItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    api.get("/menu").then((res) => setItems(res.data)).catch(() => {})
  }, [])

  function addItem(item) {
    setSelectedItems((prev) => {
      const found = prev.find((entry) => entry.id === item.id)
      if (found) {
        return prev.map((entry) => (
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        ))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  async function order() {
    await api.post("/orders", {
      tableId: Number(table),
      customerName: `Mesa ${table}`,
      items: selectedItems,
      source: "QR",
    })
    setSelectedItems([])
    alert("Pedido enviado")
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbfd_0%,#eef5f8_100%)] p-3 sm:p-4 md:p-6">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-white/90 p-4 shadow-[0_28px_90px_rgba(20,48,73,0.14)] backdrop-blur sm:p-6 lg:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-[#eaf1f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#1f5f7a]">
              Pedido digital
            </div>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">Cardapio da mesa {table}</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">Selecione os itens e envie o pedido direto do celular.</p>
          </div>

          <button className="btn-primary flex items-center justify-center gap-2" onClick={order} disabled={!selectedItems.length}>
            <ShoppingBasket size={18} />
            Enviar pedido
          </button>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr,320px]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <button
                key={item.id}
                className="card-hover rounded-[24px] border border-slate-200 bg-[#f8fbfd] p-5 text-left"
                onClick={() => addItem(item)}
              >
                <div className="text-lg font-bold text-slate-900">{item.name}</div>
                <div className="mt-2 text-sm text-slate-500">{item.sector}</div>
                <div className="mt-4 text-xl font-extrabold text-[#123047]">R$ {Number(item.price).toFixed(2)}</div>
              </button>
            ))}
          </div>

          <div className="card-soft h-fit p-4 sm:p-5">
            <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <ShoppingBasket size={18} />
              Pedido
            </div>
            <div className="mt-4 space-y-2">
              {selectedItems.length ? selectedItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-[#f8fbfd] px-3 py-3 text-sm text-slate-700">
                  <div className="font-semibold text-slate-900">{item.quantity}x {item.name}</div>
                  <div className="mt-1">R$ {(Number(item.price) * Number(item.quantity)).toFixed(2)}</div>
                </div>
              )) : <div className="text-sm text-slate-500">Nenhum item adicionado ainda.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
