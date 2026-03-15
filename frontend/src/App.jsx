import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Salon from "./pages/Salon"
import Kitchen from "./pages/Kitchen"
import CashDesk from "./pages/CashDesk"
import PaymentsHistory from "./pages/PaymentsHistory"
import Users from "./pages/Users"
import Audit from "./pages/Audit"
import VisualShowcase from "./pages/VisualShowcase"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/salon" element={<Salon />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/cash-desk" element={<CashDesk />} />
        <Route path="/payments-history" element={<PaymentsHistory />} />
        <Route path="/users" element={<Users />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/visual-showcase" element={<VisualShowcase />} />
      </Routes>
    </BrowserRouter>
  )
}
