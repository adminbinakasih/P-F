'use client'

import { motion } from 'framer-motion'
import { Users, Eye, CheckCircle, TrendingUp, Mail, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Total Undangan', value: '24', change: '+3 minggu ini', icon: Mail, color: '#C9A84C' },
  { label: 'Total Tamu', value: '1.248', change: '+87 minggu ini', icon: Users, color: '#B76E79' },
  { label: 'RSVP Hadir', value: '892', change: 'Tingkat 71,5%', icon: CheckCircle, color: '#4CAF50' },
  { label: 'Total Kunjungan', value: '8.432', change: '+234 hari ini', icon: Eye, color: '#64B5F6' },
]

const recentRSVPs = [
  { name: 'Budi Santoso', status: 'hadir', guests: 2, time: '2 jam lalu' },
  { name: 'Dewi Rahayu', status: 'hadir', guests: 1, time: '4 jam lalu' },
  { name: 'Ahmad Fauzi', status: 'tidak_hadir', guests: 0, time: '6 jam lalu' },
  { name: 'Siti Nurhaliza', status: 'mungkin', guests: 2, time: '8 jam lalu' },
  { name: 'Rizky Pratama', status: 'hadir', guests: 3, time: '1 hari lalu' },
]

const recentInvitations = [
  { slug: 'pieter-febriyanti', groom: 'Pieter', bride: 'Febriyanti', date: '22 Nov 2025', views: 1240, rsvp: 89 },
  { slug: 'sarah-dimas', groom: 'Dimas', bride: 'Sarah', date: '5 Okt 2025', views: 876, rsvp: 54 },
  { slug: 'putri-andi', groom: 'Andi', bride: 'Putri', date: '12 Nov 2025', views: 432, rsvp: 28 },
]

const statusBadge = {
  hadir: 'bg-green-500/10 text-green-400/70 border-green-500/20',
  tidak_hadir: 'bg-red-500/10 text-red-400/70 border-red-500/20',
  mungkin: 'bg-[#C9A84C]/10 text-[#C9A84C]/70 border-[#C9A84C]/20',
}
const statusLabel = { hadir: 'Hadir', tidak_hadir: 'Tidak Hadir', mungkin: 'Mungkin' }

export default function AdminStats() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
            Dashboard
          </h1>
          <p className="text-white/40 text-xs">Selamat datang kembali, Admin</p>
        </div>
        <Link href="/invite/pieter-febriyanti" target="_blank"
          className="btn-luxury text-xs py-2 px-4 inline-flex items-center gap-2">
          <Eye size={12} />
          Lihat Undangan
        </Link>
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
                <TrendingUp size={12} className="text-white/20" />
              </div>
              <p className="text-2xl text-white font-semibold mb-1" style={{ fontFamily: 'var(--font-cormorant)' }}>
                {stat.value}
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
            <BarChart3 size={14} className="text-[#C9A84C]/60" />
            Rekap RSVP
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Hadir', value: 71.5, count: 892, color: '#4CAF50' },
              { label: 'Tidak Hadir', value: 18.2, count: 227, color: '#EF5350' },
              { label: 'Mungkin', value: 10.3, count: 129, color: '#C9A84C' },
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
        </motion.div>

        {/* Recent RSVPs */}
        <motion.div className="glass p-5 lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-white/70 text-sm mb-4 flex items-center gap-2">
            <Users size={14} className="text-[#C9A84C]/60" />
            RSVP Terbaru
          </h3>
          <div className="space-y-2">
            {recentRSVPs.map((rsvp, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                    <span className="text-[#C9A84C] text-xs">{rsvp.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs font-medium">{rsvp.name}</p>
                    <p className="text-white/30 text-[10px]">{rsvp.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] px-2 py-0.5 border ${statusBadge[rsvp.status as keyof typeof statusBadge]}`}>
                    {statusLabel[rsvp.status as keyof typeof statusLabel]}
                  </span>
                  {rsvp.guests > 0 && (
                    <span className="text-white/30 text-[10px]">{rsvp.guests} org</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Invitations table */}
      <motion.div className="glass p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white/70 text-sm flex items-center gap-2">
            <Mail size={14} className="text-[#C9A84C]/60" />
            Undangan Aktif
          </h3>
          <button className="text-[#C9A84C]/60 hover:text-[#C9A84C] text-xs transition-colors">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Pasangan', 'Tanggal', 'Kunjungan', 'RSVP', 'Link'].map((h) => (
                  <th key={h} className="text-left text-white/30 text-[10px] tracking-wider uppercase pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentInvitations.map((inv, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="py-3 pr-4">
                    <p className="text-white/70 text-xs font-medium">{inv.groom} & {inv.bride}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="text-white/40 text-xs">{inv.date}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="text-white/60 text-xs">{inv.views.toLocaleString('id-ID')}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="text-[#C9A84C]/70 text-xs">{inv.rsvp}</p>
                  </td>
                  <td className="py-3">
                    <Link href={`/invite/${inv.slug}`} target="_blank"
                      className="text-[#C9A84C]/50 hover:text-[#C9A84C] text-xs transition-colors">
                      Buka ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
