import { motion } from 'framer-motion'

export default function StatsCard({ icon: Icon, label, value, color = 'cyan', delay = 0 }) {
  const colorMap = {
    cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    green: { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  }
  const c = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`p-5 rounded-xl border ${c.bg} ${c.border}`}
    >
      <div className={`inline-flex p-2 rounded-lg ${c.bg} mb-3`}>
        <Icon className={`w-5 h-5 ${c.text}`} />
      </div>
      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-2xl font-bold ${c.text}`}>{value}</p>
    </motion.div>
  )
}
