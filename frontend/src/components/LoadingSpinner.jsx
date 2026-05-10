import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-14">
      {/* Rings */}
      <div className="relative w-24 h-24">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/40" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border-2 border-transparent border-t-purple-400/60" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-6 rounded-full border border-transparent border-t-pink-400/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <Shield className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_#00f5ff]" />
          </motion.div>
        </div>
      </div>

      <div className="text-center">
        <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="font-display text-sm text-cyan-400 text-glow-cyan tracking-widest uppercase">
          Analyzing Threat...
        </motion.p>
        <p className="text-slate-600 text-xs mt-1 font-rajdhani">Running AI inference</p>
      </div>

      {/* Waveform */}
      <div className="flex items-center gap-1">
        {[0,1,2,3,4,5,6].map(i => (
          <motion.div key={i}
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
            className="w-1.5 h-8 rounded-full bg-gradient-to-t from-cyan-500 to-purple-500 origin-center"
          />
        ))}
      </div>
    </div>
  )
}
