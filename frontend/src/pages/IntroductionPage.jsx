import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield, Brain, Database, Cpu, Code2, GitBranch,
  ChevronRight, Star, Layers, ArrowRight, Terminal,
  BarChart3, Filter, TreePine, BookOpen, GraduationCap,
  User, Hash, School, Zap, Lock, Eye, Activity
} from 'lucide-react'

/* ── helpers ── */
function useCounter(target, duration = 2000, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    const step = target / (duration / 16)
    let cur = 0
    const id = setInterval(() => {
      cur = Math.min(cur + step, target)
      setVal(Math.floor(cur))
      if (cur >= target) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [start, target, duration])
  return val
}

function CounterCard({ value, suffix = '', label, color, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useCounter(value, 1800, inView)
  const colors = {
    cyan:   { text: 'text-cyan-400',   glow: 'text-glow-cyan',   border: 'border-cyan-500/20',   bg: 'bg-cyan-500/5' },
    purple: { text: 'text-purple-400', glow: 'text-glow-purple', border: 'border-purple-500/20', bg: 'bg-purple-500/5' },
    pink:   { text: 'text-pink-400',   glow: 'text-glow-pink',   border: 'border-pink-500/20',   bg: 'bg-pink-500/5' },
    green:  { text: 'text-green-400',  glow: 'text-glow-green',  border: 'border-green-500/20',  bg: 'bg-green-500/5' },
  }
  const c = colors[color]
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      className={`p-6 rounded-2xl border ${c.border} ${c.bg} text-center`}
    >
      <p className={`font-display text-4xl font-black ${c.text} ${c.glow}`}>
        {count}{suffix}
      </p>
      <p className="text-slate-400 text-sm mt-2 font-rajdhani tracking-wide">{label}</p>
    </motion.div>
  )
}

/* Floating particle */
function Particle({ x, y, size, color, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ y: [-15, 15, -15], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

/* Section heading */
function SectionHeading({ tag, title, subtitle, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase
        bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-5">
        <Star className="w-3 h-3" />
        {tag}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}

/* ── Pipeline step ── */
const PIPELINE = [
  {
    num: '01', icon: Terminal, color: 'cyan',
    title: 'User Input',
    desc: 'Analyst pastes a raw PowerShell command or multi-line script into the detection dashboard.',
    tech: ['React Textarea', 'Input Validation', 'Character Limit Check'],
  },
  {
    num: '02', icon: Filter, color: 'purple',
    title: 'Text Preprocessing',
    desc: 'The command is lowercased, whitespace-normalised, and cleaned before feature extraction.',
    tech: ['Python re', 'Lowercase Norm', 'Whitespace Strip'],
  },
  {
    num: '03', icon: BarChart3, color: 'pink',
    title: 'TF-IDF Vectorisation',
    desc: 'Text is transformed into a numerical feature vector using a pre-fitted TF-IDF vectorizer.',
    tech: ['scikit-learn', 'TfidfVectorizer', 'Sparse Matrix'],
  },
  {
    num: '04', icon: TreePine, color: 'green',
    title: 'Random Forest Classification',
    desc: 'The feature vector is fed into the trained Random Forest model which votes across 100+ decision trees.',
    tech: ['RandomForestClassifier', '100 Estimators', 'Majority Vote'],
  },
  {
    num: '05', icon: Cpu, color: 'cyan',
    title: 'Probability Scoring',
    desc: 'predict_proba() returns class probabilities. The maximum probability becomes the confidence score.',
    tech: ['predict_proba()', 'Class Probabilities', 'Confidence %'],
  },
  {
    num: '06', icon: Shield, color: 'purple',
    title: 'Risk Grading & Response',
    desc: 'Prediction, confidence, risk level (Safe→Critical), and detected suspicious keywords are returned as JSON.',
    tech: ['FastAPI JSON', 'Risk Tiers', 'Keyword Extraction'],
  },
]

/* ── Tech stack ── */
const STACK = [
  { category: 'Machine Learning', color: 'purple', items: [
    { name: 'scikit-learn', role: 'Random Forest & TF-IDF', icon: Brain },
    { name: 'Joblib',       role: 'Model serialisation (.pkl)', icon: Database },
    { name: 'NumPy',        role: 'Numerical operations', icon: Cpu },
  ]},
  { category: 'Backend API', color: 'cyan', items: [
    { name: 'FastAPI',   role: 'REST API framework', icon: Zap },
    { name: 'Uvicorn',  role: 'ASGI server', icon: Activity },
    { name: 'Pydantic', role: 'Request validation', icon: Lock },
  ]},
  { category: 'Frontend', color: 'pink', items: [
    { name: 'React 18',       role: 'UI component library', icon: Code2 },
    { name: 'Vite',           role: 'Build tool & dev server', icon: Zap },
    { name: 'TailwindCSS',    role: 'Utility-first styling', icon: Layers },
    { name: 'Framer Motion',  role: 'Animations & transitions', icon: Star },
    { name: 'Axios',          role: 'HTTP client', icon: GitBranch },
    { name: 'React Router',   role: 'Client-side routing', icon: ArrowRight },
  ]},
]

const COLOR = {
  cyan:   { text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/25',   dot: 'bg-cyan-400'   },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/25', dot: 'bg-purple-400' },
  pink:   { text: 'text-pink-400',   bg: 'bg-pink-500/10',   border: 'border-pink-500/25',   dot: 'bg-pink-400'   },
  green:  { text: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/25',  dot: 'bg-green-400'  },
}

export default function IntroductionPage() {
  return (
    <div className="min-h-screen bg-[#020817] overflow-x-hidden">

      {/* ══════════════════════════════════════════════════
          HERO — Project Identity
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden grid-bg-purple scanline">

        {/* Background orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-pink-600/5 blur-[150px] pointer-events-none" />

        {/* Floating particles */}
        {[
          { x:10, y:20, size:6, color:'#00f5ff66', delay:0 },
          { x:85, y:15, size:4, color:'#a855f766', delay:1 },
          { x:70, y:70, size:8, color:'#ec489966', delay:2 },
          { x:20, y:75, size:5, color:'#00ff8866', delay:1.5 },
          { x:50, y:10, size:3, color:'#ffd70066', delay:0.5 },
          { x:90, y:50, size:6, color:'#00f5ff44', delay:3 },
        ].map((p, i) => <Particle key={i} {...p} />)}

        {/* Rotating ring decoration */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[700px] h-[700px] rounded-full border border-purple-500/10 pointer-events-none"
          style={{ borderStyle: 'dashed' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[500px] h-[500px] rounded-full border border-cyan-500/10 pointer-events-none"
          style={{ borderStyle: 'dashed' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-purple text-purple-400 text-sm font-bold tracking-widest uppercase mb-8"
          >
            <BookOpen className="w-4 h-4" />
            Project Introduction
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
          >
            <span className="gradient-text-cyber">AI-Based</span>
            <br />
            <span className="text-white">Malicious PowerShell</span>
            <br />
            <span className="gradient-text-cyber">Detection System</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-rajdhani"
          >
            A machine-learning powered cybersecurity system that classifies PowerShell commands
            as malicious or benign using a trained Random Forest model with TF-IDF feature extraction —
            served through a FastAPI backend and a React-powered SOC dashboard.
          </motion.p>

          {/* Author card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
            className="inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-6 rounded-2xl glass-purple glow-purple border border-purple-500/30 mb-12"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-0.5">
                <div className="w-full h-full rounded-full bg-[#0d0b2b] flex items-center justify-center">
                  <span className="font-display text-2xl font-black gradient-text-cyber">MAH</span>
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#020817]"
              />
            </div>

            <div className="text-left space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Developed By</p>
              <p className="font-display text-xl font-bold text-white text-glow-cyan">Muhammad Abdul Hanan</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                  <Hash className="w-3 h-3" />22F-3104
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                  <School className="w-3 h-3" />BSAI-8A
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-pink-400 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full">
                  <GraduationCap className="w-3 h-3" />BS Artificial Intelligence
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/dashboard"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold tracking-wide transition-all btn-cyber font-rajdhani text-lg">
              <Shield className="w-5 h-5" />
              Open Dashboard
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#pipeline"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-slate-400 font-semibold hover:text-white hover:border-white/20 transition-all font-rajdhani text-lg">
              View Pipeline
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════ */}
      <section className="border-y border-white/5 py-14" style={{ background: 'rgba(168,85,247,0.03)' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-5">
          <CounterCard value={98}  suffix="%" label="Detection Accuracy"     color="cyan"   delay={0} />
          <CounterCard value={25}  suffix="+"  label="Threat Indicators"      color="purple" delay={0.1} />
          <CounterCard value={100} suffix="+"  label="Decision Trees"         color="pink"   delay={0.2} />
          <CounterCard value={5}   suffix=""   label="Risk Severity Levels"   color="green"  delay={0.3} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROJECT OVERVIEW
      ══════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading
          tag="Project Overview"
          title="What is ThreatScan AI?"
          subtitle="A full-stack intelligent threat detection platform combining machine learning and modern web technologies to identify malicious PowerShell activity in real time."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl glass border border-red-500/20"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
              <Shield className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-3">The Problem</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              PowerShell is a powerful scripting language built into Windows. Attackers abuse it
              to download malware, execute encoded payloads, escalate privileges, and exfiltrate data —
              often bypassing traditional signature-based antivirus systems.
              Manual analysis is slow and error-prone at scale.
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl glass border border-green-500/20"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5">
              <Brain className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-3">Our Solution</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              We trained a Random Forest classifier on labelled PowerShell commands using TF-IDF
              feature vectors. The model learns linguistic patterns that distinguish malicious scripts
              from benign ones, achieving over 98% accuracy — deployed as an accessible web API
              with an intuitive analyst dashboard.
            </p>
          </motion.div>

          {/* Objectives */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-2xl glass border border-purple-500/20"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5">
              <Star className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-4">Key Objectives</h3>
            <ul className="space-y-2">
              {[
                'Real-time PowerShell threat classification',
                'Confidence score & probability output',
                'Suspicious keyword indicator extraction',
                'Five-tier risk grading system',
                'Production-ready REST API',
                'Analyst-friendly SOC dashboard',
              ].map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ML approach */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-2xl glass border border-cyan-500/20"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-4">ML Approach</h3>
            <div className="space-y-3">
              {[
                { label: 'Algorithm',     value: 'Random Forest Classifier' },
                { label: 'Features',      value: 'TF-IDF Token Weights' },
                { label: 'Classes',       value: 'Malicious (1) / Benign (0)' },
                { label: 'Output',        value: 'Class + Probability Score' },
                { label: 'Serialisation', value: 'Joblib .pkl files' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm border-b border-white/5 pb-2">
                  <span className="text-slate-500">{label}</span>
                  <span className="text-cyan-400 font-medium font-mono text-xs">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PIPELINE
      ══════════════════════════════════════════════════ */}
      <section id="pipeline" className="py-24 grid-bg scanline">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            tag="System Pipeline"
            title="End-to-End Detection Flow"
            subtitle="Six stages from raw PowerShell input to actionable threat intelligence, executed in milliseconds."
          />

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/60 via-purple-500/40 to-transparent hidden sm:block" />

            <div className="space-y-6">
              {PIPELINE.map((step, i) => {
                const c = COLOR[step.color]
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="relative flex gap-6 group"
                  >
                    {/* Step dot */}
                    <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${c.text}`} />
                      {/* pulse */}
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className={`absolute inset-0 rounded-xl ${c.bg}`}
                      />
                    </div>

                    {/* Content */}
                    <div className={`flex-1 p-6 rounded-2xl glass border ${c.border} group-hover:${c.bg} transition-all`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`font-display text-xs font-bold ${c.text} tracking-widest`}>STEP {step.num}</span>
                        <div className="flex-1 h-px bg-white/5" />
                      </div>
                      <h3 className="font-display text-base font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">{step.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.tech.map((t) => (
                          <span key={t} className={`text-xs px-2 py-1 rounded-lg ${c.bg} ${c.text} font-mono border ${c.border}`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TECH STACK
      ══════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading
          tag="Technology Stack"
          title="Tools & Technologies"
          subtitle="A carefully chosen full-stack toolkit for building a production-grade AI cybersecurity application."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {STACK.map((cat, ci) => {
            const c = COLOR[cat.color]
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.5 }}
                className={`p-6 rounded-2xl glass border ${c.border}`}
              >
                <h3 className={`font-display text-sm font-bold ${c.text} uppercase tracking-widest mb-5 flex items-center gap-2`}>
                  <span className={`w-2 h-2 rounded-full ${c.dot} animate-pulse`} />
                  {cat.category}
                </h3>
                <div className="space-y-3">
                  {cat.items.map((item, ii) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.1 + ii * 0.06 }}
                        className={`flex items-center gap-3 p-3 rounded-xl ${c.bg} border ${c.border} hover:border-opacity-60 transition-all`}
                      >
                        <div className={`w-8 h-8 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-4 h-4 ${c.text}`} />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{item.name}</p>
                          <p className="text-slate-500 text-xs">{item.role}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ABOUT THE AUTHOR
      ══════════════════════════════════════════════════ */}
      <section className="py-24 grid-bg-purple scanline">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading tag="Developer" title="About the Developer" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative p-8 sm:p-12 rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(0,245,255,0.05), rgba(236,72,153,0.06))',
              border: '1px solid rgba(168,85,247,0.2)',
            }}
          >
            {/* Background shimmer */}
            <div className="absolute inset-0 animate-shimmer opacity-30 pointer-events-none rounded-3xl" />

            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-10">
              {/* Large avatar */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32">
                  {/* Rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/40"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-3 rounded-full border border-dashed border-cyan-500/30"
                  />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-[#0d0b2b] flex items-center justify-center">
                      <span className="font-display text-3xl font-black gradient-text-cyber">MAH</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Full Name</p>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white text-glow-cyan">
                    Muhammad Abdul Hanan
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  {[
                    { icon: Hash,         label: 'Roll Number', value: '22F-3104',           color: 'purple' },
                    { icon: School,       label: 'Section',     value: 'BSAI-8A',             color: 'cyan'   },
                    { icon: GraduationCap,label: 'Program',     value: 'BS Artificial Intelligence', color: 'pink' },
                  ].map(({ icon: Icon, label, value, color }) => {
                    const c = COLOR[color]
                    return (
                      <div key={label} className={`flex items-center gap-2 px-4 py-2 rounded-xl ${c.bg} border ${c.border}`}>
                        <Icon className={`w-4 h-4 ${c.text}`} />
                        <div>
                          <p className="text-slate-500 text-xs">{label}</p>
                          <p className={`${c.text} font-bold text-sm font-mono`}>{value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                  This project was developed as part of the <span className="text-purple-400 font-semibold">Information Security</span> course,
                  exploring the intersection of artificial intelligence and cybersecurity. The system demonstrates
                  how ML models can augment traditional security tools for faster, smarter threat detection.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SUSPICIOUS KEYWORDS
      ══════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading
          tag="Detection Logic"
          title="Suspicious Keyword Indicators"
          subtitle="The system flags these PowerShell keywords as high-risk indicators, commonly found in malicious scripts."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {[
            'iex', 'invoke-expression', 'downloadfile', 'downloadstring',
            'webclient', 'webrequest', 'virtualalloc', 'start-process',
            'encodedcommand', '-enc', 'bypass', 'hidden', 'noprofile',
            'frombase64string', 'memorystream', 'reflection.assembly',
            'amsiutils', 'set-mppreference', 'invoke-mimikatz',
            'bitsadmin', 'certutil', 'regsvr32', 'rundll32',
            'mshta', 'wscript', 'cscript', 'createthread',
          ].map((kw, i) => (
            <motion.span
              key={kw}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ delay: i * 0.03 }}
              className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 font-mono text-sm font-medium cursor-default"
            >
              {kw}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative p-12 rounded-3xl overflow-hidden text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,245,255,0.06), rgba(168,85,247,0.08))',
            border: '1px solid rgba(0,245,255,0.15)',
          }}
        >
          <div className="absolute inset-0 animate-shimmer opacity-20 pointer-events-none" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full border border-dashed border-cyan-500/10 pointer-events-none"
          />

          <div className="relative z-10">
            <Shield className="w-14 h-14 text-cyan-400 mx-auto mb-5 drop-shadow-[0_0_16px_#00f5ff]" />
            <h3 className="font-display text-3xl font-black text-white mb-4">
              Ready to Detect Threats?
            </h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Open the Detection Dashboard and submit any PowerShell command for instant AI-powered analysis.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg tracking-wide btn-cyber"
            >
              <Activity className="w-5 h-5" />
              Launch Dashboard
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-sm">
        <p>
          <span className="font-display text-slate-500">THREATSCAN</span>
          <span className="text-purple-500/60 font-display">AI</span>
          {' '}— Muhammad Abdul Hanan · 22F-3104 · BSAI-8A
        </p>
      </footer>
    </div>
  )
}
