import { motion } from "framer-motion"

export default function StatCard({ title, value, icon, color = "from-yellow-300 to-orange-300" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="card-soft card-hover p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className={`mb-4 h-3 w-24 rounded-full bg-gradient-to-r ${color}`} />
          <div className="text-sm text-slate-500">{title}</div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">{value}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm">{icon}</div>
      </div>
    </motion.div>
  )
}
