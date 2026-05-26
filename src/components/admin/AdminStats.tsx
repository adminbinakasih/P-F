'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Eye, CheckCircle, TrendingUp, Mail, BarChart3, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface RSVPItem {
  id: string
  name: string
  phone?: string
  attendance: 'hadir' | 'tidak_hadir' | 'mungkin'
  guestCount: number
  message?: string
  invitationSlug: string
  createdAt: string
}

interface WishItem {
  id: string
  name: string
  message: string
  invitationSlug: string
  createdAt: string
}

const statusBadge = {
  hadir: 'bg-green-500/10 text-green-400/70 border-green-500/20',
  tidak_hadir: 'bg-red-500/10 text-red-400/70 border-red-500/20',
  mungkin: 'bg-[#CCC6B1]/10 text-[#CCC6B1]/70 border-[#CCC6B1]/20',
}
const statusLabel = { hadir: 'Hadir', tidak_hadir: 'Tidak Hadir', mungkin: 'Mungkin' }

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return 'baru saja'
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
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
      const [rsvpRes, wishRes] = await Promise.all([
        fetch('/api/rsvp'),
        fetch('/api/wishes'),
      ])
      const rsvpData = await rsvpRes.json()
      const wishData = await wishRes.json()
      setRsvps(rsvpData.data || [])
      setWishes(wishData.data || [])
    } catch { /* silent */ }
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  const hadir = rsvps.filter((r) => r.attendance === 'hadir')
  const tidakHadir = rsvps.filter((r) => r.attendance === 'tidak_hadir')
  const mungkin = rsvps.filter((r) => r.attendance === 'mungkin')
  const totalTamu = hadir.reduce((sum, r) => sum + (r.guestCount || 1), 0)
  const hadirPct = rsvps.length ? Math.round((hadir.length / rsvps.length) * 100) : 0
  const tidakHadirPct = rsvps.length ? Math.round((tidakHadir.length / rsvps.length) * 100) : 0
  const mungkinPct = rsvps.length ? Math.round((mungkin.length / rsvps.length) * 100) : 0

  const stats = [
    { label: 'Total RSVP', value: rsvps.length.toString(), change: `${hadir.length} konfirmasi hadir`, icon: Mail, color: '#CCC6B1' },
    { label: 'Total Tamu', value: totalTamu.toString(), change: 'dari RSVP hadir', icon: Users, color: '#B76E79' },
    { label: 'Konfirmasi Hadir', value: hadir.length.toString(), change: `Tingkat ${hadirPct}%`, icon: CheckCircle, color: '#4CAF50' },
    { label: 'Ucapan Masuk', value: wishes.length.toString(), change: 'dari buku tamu', icon: TrendingUp, color: '#64B5F6' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
            Dashboard
          </h1>
          <p className="text-white/40 text-xs">Undangan Pernikahan Pieter & Febriyanti — 15 Juni 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchData} className="text-white/40 hover:text-[#CCC6B1] transition-colors" title="Refresh">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <Link href="/invite/pieter-febriyanti" target="_blank"
            className="btn-luxury text-xs py-2 px-4 inline-flex items-center gap-2">
            <Eye size={12} />
            Lihat Undangan
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div key={i} className="glass p-5 relative overflow-hidden group hover-lift"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-10 -translate-y-4 translate-x-4"
                style={{ background: stat.color }} />
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center"
                  style={{ background: stat.color + '15', border: `1px solid ${stat.color}30` }}>
                  <Icon size={14} style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-2xl text-white font-semibold mb-1" style={{ fontFamily: 'var(--font-cormorant)' }}>
                {loading ? '—' : stat.value}
              </p>
              <p className="text-white/40 text-xs mb-1">{stat.label}</p>
              <p className="text-xs" style={{ color: stat.color + '80' }}>{stat.change}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* RSVP breakdown */}
        <motion.div className="glass p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-white/70 text-sm mb-4 flex items-center gap-2">
            <BarChart3 size={14} className="text-[#CCC6B1]/60" />
            Rekap RSVP
          </h3>
          {rsvps.length === 0 ? (
            <p className="text-white/20 text-xs text-center py-8">Belum ada RSVP</p>
          ) : (
            <div className="space-y-3">
              {[
                { label: 'Hadir', value: hadirPct, count: hadir.length, color: '#4CAF50' },
                { label: 'Tidak Hadir', value: tidakHadirPct, count: tidakHadir.length, color: '#EF5350' },
                { label: 'Mungkin', value: mungkinPct, count: mungkin.length, color: '#CCC6B1' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/50">{item.label}</span>
                    <span style={{ color: item.color + '90' }}>{item.count} tamu</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: item.color }}
                      initial={{ width: 0 }} animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent RSVPs */}
        <motion.div className="glass p-5 lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-white/70 text-sm mb-4 flex items-center gap-2">
            <Users size={14} className="text-[#CCC6B1]/60" />
            RSVP Terbaru
          </h3>
          {rsvps.length === 0 ? (
            <p className="text-white/20 text-xs text-center py-8">Belum ada RSVP masuk</p>
          ) : (
            <div className="space-y-2">
              {rsvps.slice(0, 5).map((rsvp, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#CCC6B1]/10 border border-[#CCC6B1]/20 flex items-center justify-center">
                      <span className="text-[#CCC6B1] text-xs">{rsvp.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-white/70 text-xs font-medium">{rsvp.name}</p>
                      <p className="text-white/30 text-[10px]">{timeAgo(rsvp.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-2 py-0.5 border ${statusBadge[rsvp.attendance]}`}>
                      {statusLabel[rsvp.attendance]}
                    </span>
                    {rsvp.guestCount > 0 && (
                      <span className="text-white/30 text-[10px]">{rsvp.guestCount} org</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Undangan info */}
      <motion.div className="glass p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white/70 text-sm flex items-center gap-2">
            <Mail size={14} className="text-[#CCC6B1]/60" />
            Info Undangan
          </h3>
          <Link href="/invite/pieter-febriyanti" target="_blank"
            className="text-[#CCC6B1]/60 hover:text-[#CCC6B1] text-xs transition-colors">
            Buka ↗
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Pengantin Pria', value: 'Pieter Nero Ginting Suka' },
            { label: 'Pengantin Wanita', value: 'Febriyanti Br. Surbakti' },
            { label: 'Pemberkatan', value: 'Senin, 15 Juni 2026 — 15.00 WIB' },
            { label: 'Pesta Adat', value: 'Selasa, 16 Juni 2026 — 08.00 WIB' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-white/60 text-xs">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
