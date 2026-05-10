const RISK_CONFIG = {
  Safe: { bg: 'bg-green-500/10', border: 'border-green-500/40', text: 'text-green-400', dot: 'bg-green-400' },
  Low: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/40', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  Medium: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/40', text: 'text-yellow-400', dot: 'bg-yellow-400' },
  High: { bg: 'bg-orange-500/10', border: 'border-orange-500/40', text: 'text-orange-400', dot: 'bg-orange-400' },
  Critical: { bg: 'bg-red-500/10', border: 'border-red-500/40', text: 'text-red-400', dot: 'bg-red-400' },
}

export default function RiskBadge({ level }) {
  const cfg = RISK_CONFIG[level] ?? RISK_CONFIG.Low

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${cfg.dot}`} />
      {level}
    </span>
  )
}
