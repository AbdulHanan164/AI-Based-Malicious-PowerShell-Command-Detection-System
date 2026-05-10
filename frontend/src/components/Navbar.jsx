import { Link, useLocation } from 'react-router-dom'
import { Shield, Activity, BookOpen, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const LINKS = [
  { to: '/',             label: 'Home' },
  { to: '/introduction', label: 'About Project' },
  { to: '/dashboard',    label: 'Dashboard' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5"
         style={{ background: 'rgba(2,8,23,0.85)', backdropFilter: 'blur(20px)' }}>
      {/* top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md" />
            <Shield className="relative w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_#00f5ff]" />
          </motion.div>
          <div className="leading-none">
            <span className="font-display text-lg font-bold text-cyan-400 text-glow-cyan tracking-widest">
              THREAT
            </span>
            <span className="font-display text-lg font-bold text-white tracking-widest">SCAN</span>
            <span className="font-display text-xs font-bold text-purple-400 tracking-widest ml-1">AI</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium font-rajdhani tracking-wide transition-all duration-200 ${
                  active
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg glass-cyan glow-cyan"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            )
          })}

          <Link
            to="/dashboard"
            className="ml-3 flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-sm tracking-wide transition-all btn-cyber"
          >
            <Activity className="w-4 h-4" />
            Analyze Now
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-[#020817]/95"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium ${
                    pathname === link.to
                      ? 'glass-cyan text-cyan-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
