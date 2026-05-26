'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, Filter, CheckCircle, XCircle, HelpCircle } from 'lucide-react'

const guests = [
  { id: 1, name: 'Budi Santoso', phone: '081234567890', status: 'hadir', guests: 2, invitation: 'Amara & Rafi', time: '2025-09-15' },
  { id: 2, name: 'Dewi Rahayu', phone: '082345678901', status: 'hadir', guests: 1, invitation: 'Amara & Rafi', time: '2025-09-16' },
  { id: 3, name: 'Ahmad Fauzi', phone: '083456789012', status: 'tidak_hadir', guests: 0, invitation: 'Amara & Rafi', time: '2025-09-17' },
  { id: 4, name: 'Siti Nurhaliza', phone: '084567890123', status: 'mungkin', guests: 2, invitation: 'Amara & Rafi', time: '2025-09-17' },
  { id: 5, name: 'Rizky Pratama', phone: '085678901234', status: 'hadir', guests: 3, invitation: 'Amara & Rafi', time: '2025-09-18' },
  { id: 6, name: 'Indah Permata', phone: '086789012345', status: 'hadir', guests: 2, invitation: 'Sarah & Dimas', time: '2025-09-19' },
  { id: 7, name: 'Hendra Wijaya', phone: '087890123456', status: 'tidak_hadir', guests: 0, invitation: 'Sarah & Dimas', time: '2025-09-20' },
]

const statusConfig = {
  hadir: { label: 'Hadir', icon: CheckCircle, color: '#4CAF50' },
  tidak_hadir: { label: 'Tidak Hadir', icon: XCircle, color: '#EF5350' },
  mungkin: { label: 'Mungkin', icon: HelpCircle, color: '#C9A84C' },
}

export default function AdminGuests() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('all')

  const filtered = guests.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || g.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
            Guest Management
          </h1>
          <p className="text-white/40 text-xs">{guests.length} total guests</p>
        </div>
        <button className="btn-outline-luxury text-xs py-2 px-4 inline-flex items-center gap-2">
          <Download size={12} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/5 border border-white/8 px-3 py-2 flex-1 min-w-48">
          <Search size={13} className="text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guests..."
            className="bg-transparent text-white/60 text-xs outline-none flex-1 placeholder:text-white/20"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'hadir', 'tidak_hadir', 'mungkin'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs transition-all ${
                filter === f
                  ? 'bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C]'
                  : 'border border-white/10 text-white/40 hover:text-white/60'
              }`}
            >
              {f === 'all' ? 'All' : f === 'hadir' ? 'Hadir' : f === 'tidak_hadir' ? 'Tidak Hadir' : 'Mungkin'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Guest', 'Phone', 'Invitation', 'Status', 'Guests', 'Date'].map((h) => (
                  <th key={h} className="text-left text-white/30 text-[10px] tracking-wider uppercase px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((guest, i) => {
                const status = statusConfig[guest.status as keyof typeof statusConfig]
                const StatusIcon = status.icon
                return (
                  <motion.tr
                    key={guest.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#C9A84C] text-xs">{guest.name[0]}</span>
                        </div>
                        <span className="text-white/70 text-xs font-medium">{guest.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs">{guest.phone}</td>
                    <td className="px-4 py-3 text-white/50 text-xs">{guest.invitation}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 border"
                        style={{ color: status.color + '90', borderColor: status.color + '30', background: status.color + '10' }}
                      >
                        <StatusIcon size={10} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/50 text-xs">{guest.guests}</td>
                    <td className="px-4 py-3 text-white/30 text-xs">{guest.time}</td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
