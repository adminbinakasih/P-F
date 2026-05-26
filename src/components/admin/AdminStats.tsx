'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, CheckCircle, TrendingUp, Mail, BarChart3, RefreshCw, Eye } from 'lucide-react'
import Link from 'next/link'

interface RSVPItem {
  id: string; name: string; phone?: string
  attendance: 'hadir' | 'tidak_hadir' | 'mungkin'
  guestCount: number; message?: string; invitationSlug: string; createdAt: string
}
interface WishItem {
  id: string; name: string; message: string; invitationSlug: string; createdAt: string
}

const statusBadge = {
  hadir: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  tidak_hadir: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  mungkin: { bg: '#fef9c3', text: '#854d0e', border: '#fde047' },
}
const statusLabel = { hadir: 'Hadir', tidak_hadir: 'Tidak Hadir', mungkin: 'Mungkin' }

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return 'baru saja'
  if (diff < 3600) return `${Math.floor(diff / 60)} mnt lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
  return `${Math.floor(diff / 86400)} hari lalu`
}

export default function AdminStats() {
  const [rsvps, setRsvps] = useState<RSVPItem[]>([])
  const [wishes, setWishes] = useState<WishItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [r, w] = await Promise.all([fetch('/api/rsvp'), fetch('/api/wishes')])
      setRsvps((await r.json()).data || [])
      setWishes((await w.json()).data || [])
    } catch { /* silent */ }
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  const hadir = rsvps.filter(r => r.attendance === 'hadir')
  const tidakHadir = rsvps.filter(r => r.attendance === 'tidak_hadir')
  const mungkin = rsvps.filter(r => r.attendance === 'mungkin')
  const totalTamu = hadir.reduce((s, r) => s + (r.guestCount || 1), 0)
  const pct = (n: number) => rsvps.length ? Math.round((n / rsvps.length) * 100) : 0

  const stats = [
    { label: 'Total RSVP', value: rsvps.length, sub: `${hadir.length} konfirmasi hadir`, icon: Mail, accent: '#8A7560' },
    { label: 'Total Tamu', value: totalTamu, sub: 'dari RSVP hadir', icon: Users, accent: '#B76E79' },
    { label: 'Konfirmasi Hadir', value: hadir.length, sub: `Tingkat ${pct(hadir.length)}%`, icon: CheckCircle, accent: '#4CAF50' },
    { label: 'Ucapan Masuk', value: wishes.length, sub: 'dari buku tamu', icon: TrendingUp, accent: '#64B5F6' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#1A1410] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
            Dashboard
          </h1>
          <p className="text-[#6B5040] text-xs font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
            Undangan Pernikahan Pieter & Febriyanti — 15 Juni 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchData} className="text-[#8A7560] hover:text-[#3D2E1E] transition-colors p-2" title="Refresh">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <Link href="/invite/pieter-febriyanti" target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3D2E1E] text-[#F5F0E8] text-xs font-bold tracking-wider uppercase hover:bg-[#1A1410] transition-colors"
            style={{ fontFamily: 'var(--font-poppins)' }}>
            <Eye size={12} />Lihat Undangan
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={i}
              className="bg-white rounded-sm p-5 relative overflow-hidden border border-[#CCC6B1]/40"
              style={{ boxShadow: '0 2px 12px rgba(26,16,8,0.08)' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-8 translate-x-8 opacity-10"
                style={{ background: s.accent }} />
              <div className="w-9 h-9 rounded-sm flex items-center justify-center mb-4"
                style={{ background: s.accent + '18', border: `1.5px solid ${s.accent}40` }}>
                <Icon size={15} style={{ color: s.accent }} />
              </div>
              <p className="text-3xl text-[#1A1410] font-bold mb-1" style={{ fontFamily: 'var(--font-cormorant)' }}>
                {loading ? '—' : s.value}
              </p>
              <p className="text-[#3D2E1E] text-xs font-semibold mb-0.5" style={{ fontFamily: 'var(--font-poppins)' }}>{s.label}</p>
              <p className="text-[#8A7560] text-[10px] font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>{s.sub}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* RSVP breakdown */}
        <motion.div className="bg-white rounded-sm p-5 border border-[#CCC6B1]/40"
          style={{ boxShadow: '0 2px 12px rgba(26,16,8,0.08)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-[#1A1410] text-sm font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-poppins)' }}>
            <BarChart3 size={14} className="text-[#8A7560]" />
            Rekap RSVP
          </h3>
          {rsvps.length === 0 ? (
            <p className="text-[#8A7560] text-xs text-center py-8 font-medium">Belum ada RSVP</p>
          ) : (
            <div className="space-y-4">
              {[
                { label: 'Hadir', value: pct(hadir.length), count: hadir.length, color: '#4CAF50' },
                { label: 'Tidak Hadir', value: pct(tidakHadir.length), count: tidakHadir.length, color: '#EF5350' },
                { label: 'Mungkin', value: pct(mungkin.length), count: mungkin.length, color: '#F59E0B' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#1A1410] font-semibold">{item.label}</span>
                    <span className="text-[#6B5040] font-bold">{item.count} tamu ({item.value}%)</span>
                  </div>
                  <div className="h-2 bg-[#EAE4D5] rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: item.color }}
                      initial={{ width: 0 }} animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.6 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent RSVPs */}
        <motion.div className="bg-white rounded-sm p-5 lg:col-span-2 border border-[#CCC6B1]/40"
          style={{ boxShadow: '0 2px 12px rgba(26,16,8,0.08)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-[#1A1410] text-sm font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-poppins)' }}>
            <Users size={14} className="text-[#8A7560]" />
            RSVP Terbaru
          </h3>
          {rsvps.length === 0 ? (
            <p className="text-[#8A7560] text-xs text-center py-8 font-medium">Belum ada RSVP masuk</p>
          ) : (
            <div className="space-y-1">
              {rsvps.slice(0, 6).map((rsvp, i) => {
                const badge = statusBadge[rsvp.attendance]
                return (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#EAE4D5] last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4CDB8] border border-[#8A7560] flex items-center justify-center">
                        <span className="text-[#1A1410] text-xs font-bold">{rsvp.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-[#1A1410] text-xs font-bold">{rsvp.name}</p>
                        <p className="text-[#8A7560] text-[10px] font-medium">{timeAgo(rsvp.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-sm font-bold border"
                        style={{ background: badge.bg, color: badge.text, borderColor: badge.border }}>
                        {statusLabel[rsvp.attendance]}
                      </span>
                      <span className="text-[#6B5040] text-[10px] font-semibold">{rsvp.guestCount} org</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Info undangan */}
      <motion.div className="bg-white rounded-sm p-5 border border-[#CCC6B1]/40"
        style={{ boxShadow: '0 2px 12px rgba(26,16,8,0.08)' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1A1410] text-sm font-bold flex items-center gap-2" style={{ fontFamily: 'var(--font-poppins)' }}>
            <Mail size={14} className="text-[#8A7560]" />
            Info Undangan
          </h3>
          <Link href="/invite/pieter-febriyanti" target="_blank"
            className="text-[#8A7560] hover:text-[#3D2E1E] text-xs font-bold transition-colors underline underline-offset-2">
            Buka Undangan ↗
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Pengantin Pria', value: 'Pieter Nero Ginting Suka' },
            { label: 'Pengantin Wanita', value: 'Febriyanti Br. Surbakti' },
            { label: 'Pemberkatan', value: 'Senin, 15 Juni 2026 — 15.00 WIB' },
            { label: 'Pesta Adat', value: 'Selasa, 16 Juni 2026 — 08.00 WIB' },
          ].map((item) => (
            <div key={item.label} className="p-3 bg-[#F5F0E8] rounded-sm border border-[#CCC6B1]/30">
              <p className="text-[#8A7560] text-[10px] uppercase tracking-wider mb-1 font-bold">{item.label}</p>
              <p className="text-[#1A1410] text-xs font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
