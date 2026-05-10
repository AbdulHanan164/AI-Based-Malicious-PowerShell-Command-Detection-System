import { motion } from 'framer-motion'

export default function ConfidenceBar({ confidence, prediction }) {
  const isMal = prediction === 'Malicious'
  const gradient = isMal
    ? 'from-orange-500 via-red-500 to-red-600'
    : 'from-cyan-400 via-green-400 to-green-500'
  const textColor = isMal ? 'text-red-400 text-glow-red' : 'text-green-400 text-glow-green'

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Confidence Score</span>
        <span className={`font-display text-3xl font-black ${textColor}`}>{confidence}%</span>
      </div>

      {/* Track */}
      <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient} relative overflow-hidden`}
        >
          {/* shimmer on bar */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1.2, ease: 'easeInOut' }}
            className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12"
          />
        </motion.div>
      </div>

      {/* Tick marks */}
      <div className="flex justify-between text-slate-700 text-xs font-mono">
        <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
      </div>
    </div>
  )
}
