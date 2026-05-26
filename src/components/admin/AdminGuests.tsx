'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, CheckCircle, XCircle, HelpCircle, RefreshCw } from 'lucide-react'

interface RSVPItem {
  id: string; name: string; phone?: string
  attendance: 'hadir' | 'tidak_hadir' | 'mungkin'
  guestCount: number; message?: string; invitationSlug: string; createdAt: string
}

const statusConfig = {
  hadir: { label: 'Hadir', icon: CheckCircle, bg: '#dcfce7', text: '#166534', border: '#86efac' },
  tidak_hadir: { label: 'Tidak Hadir', icon: XCircle, bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  mungkin: { label: 'Mungkin', icon: HelpCircle, bg: '#fef9c3', text: '#854d0e', border: '#fde047' },
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
      setGuests((await res.json()).data || [])
    } catch { /* silent */ }
    setLoading(false)
  }

  useEffect(() => { fetchGuests() }, [])

  const filtered = guests.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'all' || g.attendance === filter)
  )

  const exportCSV = () => {
    const rows = guests.map(g =>
      `${g.name},${g.phone || '-'},${g.attendance},${g.guestCount},${new Date(g.createdAt).toLocaleDateString('id-ID')}`
    )
    const blob = new Blob(['Nama,No. HP,Status,Jumlah Tamu,Tanggal\n' + rows.join('\n')], { type: 'text/csv' })
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'rsvp-pieter-febriyanti.csv' })
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#1A1410] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
            Data Tamu
          </h1>
          <p className="text-[#6B5040] text-xs font-medium">{guests.length} total RSVP masuk</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchGuests} className="text-[#8A7560] hover:text-[#3D2E1E] transition-colors p-2">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#3D2E1E] text-[#1A1410] text-xs font-bold tracking-wider uppercase hover:bg-[#3D2E1E] hover:text-white transition-all"
            style={{ fontFamily: 'var(--font-poppins)' }}>
            <Download size={12} />Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white border border-[#CCC6B1] px-3 py-2 flex-1 min-w-48">
          <Search size={13} className="text-[#8A7560]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama tamu..."
            className="bg-transparent text-[#1A1410] text-xs outline-none flex-1 placeholder:text-[#8A7560] font-medium" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { key: 'all', label: 'Semua' },
            { key: 'hadir', label: 'Hadir' },
            { key: 'tidak_hadir', label: 'Tidak Hadir' },
            { key: 'mungkin', label: 'Mungkin' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-3 py-2 text-xs font-bold transition-all border-2 ${
                filter === f.key
                  ? 'bg-[#3D2E1E] border-[#3D2E1E] text-white'
                  : 'border-[#CCC6B1] text-[#3D2E1E] hover:border-[#8A7560]'
              }`} style={{ fontFamily: 'var(--font-poppins)' }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm border border-[#CCC6B1]/40 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(26,16,8,0.08)' }}>
        {loading ? (
          <div className="text-center py-16">
            <RefreshCw size={24} className="text-[#8A7560] mx-auto mb-3 animate-spin" />
            <p className="text-[#8A7560] text-xs font-medium">Memuat data...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#8A7560] text-sm font-medium">
              {guests.length === 0 ? 'Belum ada RSVP masuk' : 'Tidak ada hasil pencarian'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#EAE4D5]" style={{ background: '#F5F0E8' }}>
                  {['Nama', 'No. HP', 'Status', 'Jml Tamu', 'Pesan', 'Tanggal'].map(h => (
                    <th key={h} className="text-left text-[#6B5040] text-[10px] tracking-wider uppercase px-4 py-3 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((guest, i) => {
                  const s = statusConfig[guest.attendance]
                  const Icon = s.icon
                  return (
                    <motion.tr key={guest.id}
                      className="border-b border-[#EAE4D5] last:border-0 hover:bg-[#F5F0E8] transition-colors"
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#D4CDB8] border border-[#8A7560] flex items-center justify-center flex-shrink-0">
                            <span className="text-[#1A1410] text-xs font-bold">{guest.name[0]}</span>
                          </div>
                          <span className="text-[#1A1410] text-xs font-bold">{guest.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#6B5040] text-xs font-medium">{guest.phone || '-'}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-sm font-bold border"
                          style={{ background: s.bg, color: s.text, borderColor: s.border }}>
                          <Icon size={10} />{s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#1A1410] text-xs font-bold">{guest.guestCount}</td>
                      <td className="px-4 py-3 text-[#6B5040] text-xs font-medium max-w-[180px] truncate">{guest.message || '-'}</td>
                      <td className="px-4 py-3 text-[#6B5040] text-xs font-medium">
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
