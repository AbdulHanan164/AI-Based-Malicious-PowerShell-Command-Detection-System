import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shield, Zap, Eye, Lock, Activity, Brain,
  ChevronRight, Terminal, ArrowRight, Star,
  Database, Cpu, GitBranch
} from 'lucide-react'

const FEATURES = [
  { icon: Brain,    title: 'AI-Powered Detection',   desc: 'Random Forest model trained on thousands of real-world malicious and benign PowerShell samples for high accuracy.', color: 'cyan' },
  { icon: Zap,      title: 'Real-Time Analysis',      desc: 'Instant TF-IDF feature extraction and classification — results returned in under 50 milliseconds.', color: 'purple' },
  { icon: Eye,      title: 'Threat Indicators',       desc: 'Highlights specific suspicious keywords and attack patterns found in the submitted command.', color: 'pink' },
  { icon: Lock,     title: 'Confidence Scoring',      desc: 'Probability-based confidence percentages for every prediction with animated visualisation.', color: 'green' },
  { icon: Activity, title: 'Risk Level Grading',      desc: 'Five-tier risk classification: Safe, Low, Medium, High, Critical — colour-coded with pulse indicators.', color: 'cyan' },
  { icon: Terminal, title: 'Full Script Support',     desc: 'Analyse single one-liners or entire multi-line PowerShell scripts — no length restrictions for scripts under 50KB.', color: 'purple' },
]

const COLOR = {
  cyan:   { text: 'text-cyan-400',   bg: 'bg-cyan-500/8',   border: 'border-cyan-500/20',   glow: 'hover:glow-cyan'   },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/8', border: 'border-purple-500/20', glow: 'hover:glow-purple' },
  pink:   { text: 'text-pink-400',   bg: 'bg-pink-500/8',   border: 'border-pink-500/20',   glow: 'hover:glow-pink'   },
  green:  { text: 'text-green-400',  bg: 'bg-green-500/8',  border: 'border-green-500/20',  glow: 'hover:glow-green'  },
}

function FeatureCard({ icon: Icon, title, desc, color, index }) {
  const c = COLOR[color]
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`p-7 rounded-2xl glass border ${c.border} transition-all duration-300 cursor-default`}
    >
      <div className={`inline-flex p-3 rounded-xl ${c.bg} border ${c.border} mb-5`}>
        <Icon className={`w-6 h-6 ${c.text}`} />
      </div>
      <h3 className={`font-display text-base font-bold text-white mb-3`}>{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function FloatingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [-20, 20, -20], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: 'easeInOut' }}
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    />
  )
}

/* Animated terminal lines */
const TERMINAL_LINES = [
  { t: 0,   text: '> Analyzing command...', color: 'text-cyan-400' },
  { t: 0.5, text: '> Loading TF-IDF vectorizer...', color: 'text-purple-400' },
  { t: 1.0, text: '> Running Random Forest...', color: 'text-purple-400' },
  { t: 1.5, text: '> Prediction: MALICIOUS', color: 'text-red-400' },
  { t: 2.0, text: '> Confidence: 98.47%', color: 'text-orange-400' },
  { t: 2.5, text: '> Risk Level: CRITICAL', color: 'text-red-400' },
  { t: 3.0, text: '> Indicators: iex, webclient, enc', color: 'text-yellow-400' },
]

function AnimatedTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="relative max-w-lg mx-auto"
    >
      {/* Glow behind terminal */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-purple-500/10 to-transparent blur-2xl rounded-3xl" />

      <div className="relative glass-cyan rounded-2xl overflow-hidden border border-cyan-500/25">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-black/30 border-b border-white/5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-slate-500 font-mono">threatscan_ai — prediction engine</span>
        </div>

        {/* Lines */}
        <div className="p-5 space-y-2 font-mono text-sm min-h-[200px]">
          {TERMINAL_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + line.t, duration: 0.3 }}
              className={line.color}
            >
              {line.text}
            </motion.div>
          ))}
          {/* Blinking cursor */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-cyan-400 align-middle"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020817] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-16 overflow-hidden grid-bg scanline">
        <FloatingOrb className="w-[500px] h-[500px] bg-purple-600/15 -top-40 -left-40" delay={0} />
        <FloatingOrb className="w-[400px] h-[400px] bg-cyan-500/12 bottom-0 right-0" delay={2} />
        <FloatingOrb className="w-[300px] h-[300px] bg-pink-600/10 top-1/2 left-1/3" delay={4} />

        {/* Rotating decorative rings */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[700px] h-[700px] rounded-full border border-purple-500/8 pointer-events-none" style={{ borderStyle: 'dashed' }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[450px] h-[450px] rounded-full border border-cyan-500/8 pointer-events-none" style={{ borderStyle: 'dashed' }} />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-cyan text-cyan-400 text-sm font-bold tracking-widest uppercase mb-8"
        >
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-cyan-400" />
          AI-Powered Threat Intelligence Platform
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="font-display text-5xl sm:text-7xl font-black leading-tight mb-6 max-w-5xl"
        >
          <span className="text-white">Detect Malicious</span>
          <br />
          <span className="gradient-text-cyber text-glow-cyan">PowerShell</span>
          <br />
          <span className="text-white">Commands with </span>
          <span className="gradient-text-cyber">AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-slate-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed font-rajdhani"
        >
          Advanced threat detection powered by Random Forest machine learning.
          Analyse any PowerShell command and get instant risk scores, confidence metrics,
          and suspicious keyword extraction — in milliseconds.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <Link to="/dashboard"
            className="group flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-lg tracking-wide btn-cyber transition-all">
            <Shield className="w-5 h-5" />
            Start Analyzing
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/introduction"
            className="group flex items-center justify-center gap-2 px-9 py-4 rounded-xl border border-purple-500/30 text-purple-400 font-semibold hover:bg-purple-500/10 transition-all font-rajdhani text-lg tracking-wide">
            About Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Terminal preview */}
        <AnimatedTerminal />

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-slate-600 text-xs">
          <span className="font-rajdhani tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/5" style={{ background: 'rgba(0,245,255,0.02)' }}>
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Detection Accuracy', value: '98.5%',  color: 'text-cyan-400' },
            { label: 'Threat Indicators',  value: '25+',    color: 'text-purple-400' },
            { label: 'Avg Response Time',  value: '<50ms',  color: 'text-green-400' },
            { label: 'Risk Tiers',         value: '5',      color: 'text-pink-400' },
          ].map(({ label, value, color }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}>
              <p className={`font-display text-4xl font-black ${color}`}>{value}</p>
              <p className="text-slate-500 text-sm mt-2 font-rajdhani tracking-wide">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase
            bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 mb-5">
            <Star className="w-3 h-3" /> Capabilities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4">
            Enterprise-Grade Detection
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-rajdhani text-lg">
            Built for security analysts, SOC teams, and researchers who need reliable, instant PowerShell threat assessment.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => <FeatureCard key={f.title} {...f} index={i} />)}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 grid-bg-purple scanline">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl font-black text-white mb-4">How It Works</h2>
            <p className="text-slate-400 font-rajdhani text-lg">Four steps from command to verdict</p>
          </motion.div>

          <div className="grid sm:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40" />

            {[
              { step: '01', label: 'Input',     desc: 'Paste PowerShell command',      color: 'cyan'   },
              { step: '02', label: 'Vectorize', desc: 'TF-IDF feature extraction',     color: 'purple' },
              { step: '03', label: 'Classify',  desc: 'Random Forest prediction',      color: 'pink'   },
              { step: '04', label: 'Report',    desc: 'Score, risk level & indicators', color: 'green'  },
            ].map(({ step, label, desc, color }, i) => {
              const c = COLOR[color]
              return (
                <motion.div key={step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`relative z-10 w-16 h-16 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center mb-4`}>
                    <span className={`font-display text-lg font-black ${c.text}`}>{step}</span>
                    <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      className={`absolute inset-0 rounded-2xl ${c.bg}`} />
                  </div>
                  <p className="font-display text-sm font-bold text-white mb-1">{label}</p>
                  <p className="text-slate-500 text-xs font-rajdhani">{desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 rounded-3xl overflow-hidden text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,245,255,0.06), rgba(168,85,247,0.08), rgba(236,72,153,0.05))',
            border: '1px solid rgba(0,245,255,0.15)',
          }}
        >
          <div className="absolute inset-0 animate-shimmer opacity-20 pointer-events-none" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-56 h-56 rounded-full border border-dashed border-cyan-500/10 pointer-events-none" />

          <div className="relative z-10">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="inline-block mb-5">
              <Shield className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_20px_#00f5ff]" />
            </motion.div>
            <h3 className="font-display text-3xl font-black text-white mb-4">
              Ready to Secure Your Environment?
            </h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto font-rajdhani text-lg">
              Start detecting malicious PowerShell activity instantly with our AI-powered dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-lg tracking-wide btn-cyber">
                Open Dashboard <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/introduction"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-purple-500/30 text-purple-400 font-semibold hover:bg-purple-500/10 transition-all font-rajdhani text-lg">
                View Project Details
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-sm">
        <p>
          <span className="font-display text-slate-500">THREATSCAN</span>
          <span className="text-purple-500/60 font-display">AI</span>
          {' '}— AI-Based Malicious PowerShell Command Detection System
        </p>
      </footer>
    </div>
  )
}
