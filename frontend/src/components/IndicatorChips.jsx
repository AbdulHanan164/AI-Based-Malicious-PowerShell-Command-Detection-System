import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export default function IndicatorChips({ indicators }) {
  if (!indicators || indicators.length === 0) {
    return (
      <p className="text-slate-500 text-sm italic">No suspicious keywords detected.</p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {indicators.map((kw, i) => (
        <motion.span
          key={kw}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-medium"
        >
          <AlertTriangle className="w-3 h-3" />
          {kw}
        </motion.span>
      ))}
    </div>
  )
}
