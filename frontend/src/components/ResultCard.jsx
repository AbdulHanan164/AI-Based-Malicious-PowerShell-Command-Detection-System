import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, ShieldX, AlertTriangle } from 'lucide-react'
import ConfidenceBar from './ConfidenceBar'
import RiskBadge from './RiskBadge'
import IndicatorChips from './IndicatorChips'

export default function ResultCard({ result }) {
  if (!result) return null
  const isMal = result.prediction === 'Malicious'

  return (
    <AnimatePresence>
      <motion.div
        key="result"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 130 }}
        className={`rounded-2xl border p-6 space-y-6 ${
          isMal
            ? 'glass border-red-500/25 glow-red'
            : 'glass border-green-500/25 glow-green'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-4">
            <motion.div
              animate={isMal ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.9, repeat: isMal ? Infinity : 0 }}
              className={`p-3 rounded-xl border ${isMal ? 'bg-red-500/10 border-red-500/25' : 'bg-green-500/10 border-green-500/25'}`}
            >
              {isMal
                ? <ShieldX className="w-7 h-7 text-red-400 drop-shadow-[0_0_8px_#ff3860]" />
                : <ShieldCheck className="w-7 h-7 text-green-400 drop-shadow-[0_0_8px_#00ff88]" />
              }
            </motion.div>
            <div>
              <h3 className={`font-display text-xl font-black ${isMal ? 'text-red-400 text-glow-red' : 'text-green-400 text-glow-green'}`}>
                {isMal ? 'Threat Detected' : 'Command is Safe'}
              </h3>
              <p className="text-slate-500 text-sm font-rajdhani">AI Classification Result</p>
            </div>
          </div>
          <RiskBadge level={result.risk_level} />
        </div>

        {/* Confidence */}
        <ConfidenceBar confidence={result.confidence} prediction={result.prediction} />

        <div className="border-t border-white/5" />

        {/* Indicators */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-widest">
              Suspicious Indicators
            </h4>
          </div>
          <IndicatorChips indicators={result.indicators} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
