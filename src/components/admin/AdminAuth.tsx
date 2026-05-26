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
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #D4CDB8 0%, #C8BFA8 50%, #BDB49A 100%)' }}
    >
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div className="w-[700px] h-[700px] rounded-full border border-[#8A7560]/20"
          animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute w-[500px] h-[500px] rounded-full border border-[#8A7560]/15"
          animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute w-[300px] h-[300px] rounded-full border border-[#3D2E1E]/10"
          animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            className="w-20 h-20 rounded-full bg-white border-2 border-[#8A7560] flex items-center justify-center mx-auto mb-6 shadow-lg"
            animate={{ boxShadow: ['0 0 0 0 rgba(61,46,30,0)', '0 0 30px 8px rgba(61,46,30,0.15)', '0 0 0 0 rgba(61,46,30,0)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-[#1A1410] text-2xl" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 700 }}>
              PF
            </span>
          </motion.div>

          <h1 className="text-4xl text-[#1A1410] mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
            Admin Dashboard
          </h1>
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="h-px w-8 bg-[#8A7560]" />
            <span className="text-[#8A7560] text-xs" style={{ fontFamily: 'var(--font-cormorant)' }}>✦</span>
            <div className="h-px w-8 bg-[#8A7560]" />
          </div>
          <p className="text-[#3D2E1E] text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
            Pieter & Febriyanti — 15 Juni 2026
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-sm shadow-2xl p-8 relative" style={{ boxShadow: '0 25px 80px rgba(26,16,8,0.2)' }}>
          {/* Corner ornaments */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#8A7560]" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#8A7560]" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#8A7560]" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#8A7560]" />

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#1A1410] text-xs tracking-[0.3em] uppercase mb-3 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
                Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7560]" />
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false) }}
                  className={`w-full bg-[#F5F0E8] border-2 pl-11 pr-12 py-3.5 outline-none transition-all text-sm text-[#1A1410] font-medium placeholder:text-[#8A7560] ${
                    error ? 'border-red-500' : 'border-[#CCC6B1] focus:border-[#3D2E1E]'
                  }`}
                  style={{ fontFamily: 'var(--font-poppins)' }}
                  placeholder="Masukkan password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A7560] hover:text-[#3D2E1E] transition-colors"
                >
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {error && (
                <motion.p
                  className="text-red-600 text-xs mt-2 font-medium"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Password salah. Silakan coba lagi.
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#3D2E1E] text-[#F5F0E8] text-xs tracking-[0.3em] uppercase font-bold hover:bg-[#1A1410] transition-colors"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Masuk
            </button>
          </form>
        </div>

        <p className="text-center text-[#3D2E1E] text-xs mt-6 font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
          Eternal Vows — Wedding Management System
        </p>
      </motion.div>
    </div>
  )
}
