'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'
import AdminDashboard from './AdminDashboard'

const ADMIN_PASSWORD = 'pieter2026'

export default function AdminAuth() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [authed, setAuthed] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (authed) return <AdminDashboard />

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[#CCC6B1]/10 border border-[#CCC6B1]/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-[#CCC6B1] text-2xl" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>PF</span>
          </div>
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
            Admin Dashboard
          </h1>
          <p className="text-white/30 text-xs" style={{ fontFamily: 'var(--font-poppins)' }}>
            Pieter & Febriyanti — 15 Juni 2026
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="glass p-8 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#CCC6B1]/30" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#CCC6B1]/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#CCC6B1]/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#CCC6B1]/30" />

          <div className="mb-6">
            <label className="block text-[#CCC6B1]/60 text-xs tracking-[0.3em] uppercase mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
              Password
            </label>
            <div className="relative">
              <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false) }}
                className="w-full bg-white/5 border border-white/10 focus:border-[#CCC6B1]/50 text-white/80 pl-9 pr-10 py-3 outline-none transition-colors text-sm placeholder:text-white/20"
                style={{ fontFamily: 'var(--font-poppins)' }}
                placeholder="Masukkan password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
              >
                {show ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
            {error && (
              <p className="text-red-400/70 text-xs mt-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                Password salah. Coba lagi.
              </p>
            )}
          </div>

          <button type="submit" className="btn-luxury w-full">
            Masuk
          </button>
        </form>
      </motion.div>
    </div>
  )
}
