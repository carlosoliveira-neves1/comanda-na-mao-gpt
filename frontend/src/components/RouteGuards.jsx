import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import api from "../services/api"

function clearSession() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

function readToken() {
  return localStorage.getItem("token")
}

function SessionChecking() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-5 text-sm font-medium text-slate-600 shadow-[0_16px_48px_rgba(20,48,73,0.08)]">
        Validando sessao...
      </div>
    </div>
  )
}

function useSessionStatus() {
  const [status, setStatus] = useState(() => (readToken() ? "checking" : "guest"))

  useEffect(() => {
    const token = readToken()
    if (!token) {
      setStatus("guest")
      return
    }

    let active = true

    api.get("/auth/me")
      .then((res) => {
        if (!active) return
        localStorage.setItem("user", JSON.stringify(res.data))
        setStatus("authenticated")
      })
      .catch(() => {
        if (!active) return
        clearSession()
        setStatus("guest")
      })

    return () => {
      active = false
    }
  }, [])

  return status
}

export function ProtectedRoute() {
  const status = useSessionStatus()

  if (status === "checking") return <SessionChecking />
  return status === "authenticated" ? <Outlet /> : <Navigate to="/" replace />
}

export function PublicOnlyRoute() {
  const status = useSessionStatus()

  if (status === "checking") return <SessionChecking />
  return status === "authenticated" ? <Navigate to="/dashboard" replace /> : <Outlet />
}
