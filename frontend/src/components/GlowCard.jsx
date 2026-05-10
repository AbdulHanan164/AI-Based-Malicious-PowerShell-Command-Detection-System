import { motion } from 'framer-motion'

const COLOR = {
  cyan:   'border-cyan-500/25 glass-cyan glow-cyan',
  red:    'border-red-500/25 glass glow-red',
  green:  'border-green-500/25 glass glow-green',
  orange: 'border-orange-500/25 glass glow-orange',
  purple: 'border-purple-500/25 glass-purple glow-purple',
}

export default function GlowCard({ children, color = 'cyan', className = '', ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border ${COLOR[color] ?? COLOR.cyan} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
