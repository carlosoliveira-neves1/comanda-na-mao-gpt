import { motion } from "framer-motion"

export default function SectionCard({ title, subtitle, actions, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="card-soft p-4 sm:p-5 md:p-6"
    >
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
          {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
        </div>
        <div className="flex gap-2 flex-wrap">{actions}</div>
      </div>
      {children}
    </motion.section>
  )
}
