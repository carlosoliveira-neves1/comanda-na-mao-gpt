import { Navigate, Outlet } from "react-router-dom"

function hasToken() {
  return Boolean(localStorage.getItem("token"))
}

export function ProtectedRoute() {
  return hasToken() ? <Outlet /> : <Navigate to="/" replace />
}

export function PublicOnlyRoute() {
  return hasToken() ? <Navigate to="/dashboard" replace /> : <Outlet />
}
