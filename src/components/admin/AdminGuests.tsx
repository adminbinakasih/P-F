'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, CheckCircle, XCircle, HelpCircle, RefreshCw } from 'lucide-react'

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

const statusConfig = {
  hadir: { label: 'Hadir', icon: CheckCircle, color: '#4CAF50' },
  tidak_hadir: { label: 'Tidak Hadir', icon: XCircle, color: '#EF5350' },
  mungkin: { label: 'Mungkin', icon: HelpCircle, color: '#C9A84C' },
}

export default function AdminGuests() {
  const [guests, setGuests] = useState<RSVPItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const fetchGuests = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/rsvp')
      const data = await res.json()
      setGuests(data.data || [])
    } catch { /* silent */ }
    setLoading(false)
  }

  useEffect(() => { fetchGuests() }, [])

  const filtered = guests.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || g.attendance === filter
    return matchSearch && matchFilter
  })

  const exportCSV = () => {
    const header = 'Nama,No. HP,Status,Jumlah Tamu,Tanggal\n'
    const rows = guests.map((g) =>
      `${g.name},${g.phone || '-'},${g.attendance},${g.guestCount},${new Date(g.createdAt).toLocaleDateString('id-ID')}`
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rsvp-pieter-febriyanti.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
            Data Tamu
          </h1>
          <p className="text-white/40 text-xs">{guests.length} total RSVP masuk</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchGuests} className="text-white/40 hover:text-[#C9A84C] transition-colors p-2" title="Refresh">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={exportCSV} className="btn-outline-luxury text-xs py-2 px-4 inline-flex items-center gap-2">
            <Download size={12} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 flex-1 min-w-48">
          <Search size={13} className="text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama tamu..."
            className="bg-transparent text-white/60 text-xs outline-none flex-1 placeholder:text-white/20"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'hadir', 'tidak_hadir', 'mungkin'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs transition-all ${
                filter === f
                  ? 'bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C]'
                  : 'border border-white/10 text-white/40 hover:text-white/60'
              }`}>
              {f === 'all' ? 'Semua' : f === 'hadir' ? 'Hadir' : f === 'tidak_hadir' ? 'Tidak Hadir' : 'Mungkin'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden">
        {loading ? (
          <div className="text-center py-16">
            <RefreshCw size={24} className="text-[#C9A84C]/30 mx-auto mb-3 animate-spin" />
            <p className="text-white/30 text-xs">Memuat data...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/30 text-sm">
              {guests.length === 0 ? 'Belum ada RSVP masuk' : 'Tidak ada hasil pencarian'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Nama', 'No. HP', 'Status', 'Jml Tamu', 'Pesan', 'Tanggal'].map((h) => (
                    <th key={h} className="text-left text-white/30 text-[10px] tracking-wider uppercase px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((guest, i) => {
                  const status = statusConfig[guest.attendance]
                  const StatusIcon = status.icon
                  return (
                    <motion.tr key={guest.id}
                      className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#C9A84C] text-xs">{guest.name[0]}</span>
                          </div>
                          <span className="text-white/70 text-xs font-medium">{guest.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/40 text-xs">{guest.phone || '-'}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 border"
                          style={{ color: status.color + '90', borderColor: status.color + '30', background: status.color + '10' }}>
                          <StatusIcon size={10} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/50 text-xs">{guest.guestCount}</td>
                      <td className="px-4 py-3 text-white/30 text-xs max-w-[200px] truncate">{guest.message || '-'}</td>
                      <td className="px-4 py-3 text-white/30 text-xs">
                        {new Date(guest.createdAt).toLocaleDateString('id-ID')}
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
