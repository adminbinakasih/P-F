'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Plus, Copy, Check, X, Send, Users, Link as LinkIcon } from 'lucide-react'

// Daftar tamu yang sudah dibuat linknya (disimpan di localStorage)
function getStoredGuests(): GuestLink[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem('admin_guest_links') || '[]')
  } catch { return [] }
}

function saveGuests(guests: GuestLink[]) {
  localStorage.setItem('admin_guest_links', JSON.stringify(guests))
}

interface GuestLink {
  id: string
  name: string
  slug: string
  createdAt: string
}

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://p-f-bice.vercel.app'

export default function AdminInvitations() {
  const [guests, setGuests] = useState<GuestLink[]>(() => getStoredGuests())
  const [showModal, setShowModal] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [bulkMode, setBulkMode] = useState(false)
  const [bulkNames, setBulkNames] = useState('')

  const addGuest = () => {
    if (!guestName.trim()) return
    const slug = nameToSlug(guestName)
    const newGuest: GuestLink = {
      id: Date.now().toString(),
      name: guestName.trim(),
      slug,
      createdAt: new Date().toISOString(),
    }
    const updated = [newGuest, ...guests]
    setGuests(updated)
    saveGuests(updated)
    setGuestName('')
  }

  const addBulk = () => {
    const names = bulkNames.split('\n').map(n => n.trim()).filter(Boolean)
    const newGuests: GuestLink[] = names.map(name => ({
      id: Date.now().toString() + Math.random(),
      name,
      slug: nameToSlug(name),
      createdAt: new Date().toISOString(),
    }))
    const updated = [...newGuests, ...guests]
    setGuests(updated)
    saveGuests(updated)
    setBulkNames('')
    setBulkMode(false)
    setShowModal(false)
  }

  const removeGuest = (id: string) => {
    const updated = guests.filter(g => g.id !== id)
    setGuests(updated)
    saveGuests(updated)
  }

  const copyLink = async (slug: string, id: string) => {
    const url = `${BASE_URL}/invite/${slug}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch { /* fallback */ }
  }

  const copyWAMessage = async (guest: GuestLink) => {
    const url = `${BASE_URL}/invite/${guest.slug}`
    const msg = `Kepada Yth. ${guest.name},\n\nDengan penuh sukacita kami mengundang Anda untuk hadir dalam pernikahan\n\n✨ Pieter & Febriyanti ✨\n\n📅 Senin, 15 Juni 2026\n📍 GBKP Rg. Simpang Tuntungan, Medan\n\nBuka undangan digital Anda di:\n${url}\n\n#PieterFebry2026`
    try {
      await navigator.clipboard.writeText(msg)
      setCopiedId('wa-' + guest.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch { /* fallback */ }
  }

  const exportCSV = () => {
    const rows = guests.map(g => `${g.name},${BASE_URL}/invite/${g.slug}`)
    const blob = new Blob(['Nama,Link Undangan\n' + rows.join('\n')], { type: 'text/csv' })
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: 'link-undangan-pieter-febriyanti.csv'
    })
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#1A1410] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
            Undangan
          </h1>
          <p className="text-[#6B5040] text-xs font-medium">{guests.length} link undangan dibuat</p>
        </div>
        <div className="flex items-center gap-2">
          {guests.length > 0 && (
            <button onClick={exportCSV}
              className="inline-flex items-center gap-2 px-3 py-2 border-2 border-[#8A7560] text-[#3D2E1E] text-xs font-bold uppercase hover:bg-[#8A7560] hover:text-white transition-all"
              style={{ fontFamily: 'var(--font-poppins)' }}>
              Export CSV
            </button>
          )}
          <button onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3D2E1E] text-[#F5F0E8] text-xs font-bold tracking-wider uppercase hover:bg-[#1A1410] transition-colors"
            style={{ fontFamily: 'var(--font-poppins)' }}>
            <Plus size={12} />Buat Undangan
          </button>
        </div>
      </div>

      {/* Info card undangan utama */}
      <div className="bg-white rounded-sm p-5 border border-[#CCC6B1]/40 relative" style={{ boxShadow: '0 2px 12px rgba(26,16,8,0.08)' }}>
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#8A7560]" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#8A7560]" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#8A7560]" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#8A7560]" />

        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[#1A1410] mb-0.5" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.5rem', fontWeight: 400 }}>
              Pieter Nero Ginting Suka
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[#8A7560] text-sm" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>&</span>
              <h3 className="text-[#1A1410]" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.5rem', fontWeight: 400 }}>
                Febriyanti Br. Surbakti
              </h3>
            </div>
          </div>
          <span className="text-[10px] px-2 py-1 font-bold rounded-sm" style={{ background: '#dcfce7', color: '#166534', border: '1px solid #86efac' }}>
            Aktif
          </span>
        </div>

        <div className="h-px bg-[#EAE4D5] mb-4" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Tanggal', value: '15 Juni 2026' },
            { label: 'Lokasi', value: 'GBKP Rg. Simpang Tuntungan, Medan' },
            { label: 'URL Utama', value: '/invite/pieter-febriyanti' },
            { label: 'Hashtag', value: '#PieterFebry2026' },
          ].map(item => (
            <div key={item.label} className="bg-[#F5F0E8] p-2.5 rounded-sm border border-[#CCC6B1]/30">
              <p className="text-[#8A7560] text-[9px] uppercase tracking-wider mb-0.5 font-bold">{item.label}</p>
              <p className="text-[#1A1410] text-xs font-semibold truncate">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Link href="/invite/pieter-febriyanti" target="_blank"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#3D2E1E] text-[#F5F0E8] text-xs font-bold tracking-wider uppercase hover:bg-[#1A1410] transition-colors"
            style={{ fontFamily: 'var(--font-poppins)' }}>
            <ExternalLink size={12} />Buka Undangan
          </Link>
          <button onClick={() => copyLink('pieter-febriyanti', 'main')}
            className="flex items-center gap-2 px-4 py-3 border-2 border-[#3D2E1E] text-[#1A1410] text-xs font-bold uppercase hover:bg-[#3D2E1E] hover:text-white transition-all"
            style={{ fontFamily: 'var(--font-poppins)' }}>
            {copiedId === 'main' ? <><Check size={12} />Tersalin</> : <><Copy size={12} />Salin Link</>}
          </button>
        </div>
      </div>

      {/* Daftar link personal */}
      {guests.length > 0 && (
        <div className="bg-white rounded-sm border border-[#CCC6B1]/40 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(26,16,8,0.08)' }}>
          <div className="px-5 py-4 border-b border-[#EAE4D5] flex items-center justify-between" style={{ background: '#F5F0E8' }}>
            <h3 className="text-[#1A1410] text-sm font-bold flex items-center gap-2" style={{ fontFamily: 'var(--font-poppins)' }}>
              <Users size={14} className="text-[#8A7560]" />
              Link Undangan Personal ({guests.length})
            </h3>
          </div>
          <div className="divide-y divide-[#EAE4D5]">
            {guests.map((guest, i) => (
              <motion.div key={guest.id}
                className="flex items-center gap-4 px-5 py-3 hover:bg-[#F5F0E8] transition-colors"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                <div className="w-9 h-9 rounded-full bg-[#D4CDB8] border border-[#8A7560] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1A1410] text-xs font-bold">{guest.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1A1410] text-sm font-bold truncate">{guest.name}</p>
                  <p className="text-[#8A7560] text-[10px] font-medium truncate">/invite/{guest.slug}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/invite/${guest.slug}`} target="_blank"
                    className="p-1.5 text-[#8A7560] hover:text-[#3D2E1E] transition-colors" title="Buka">
                    <ExternalLink size={13} />
                  </Link>
                  <button onClick={() => copyLink(guest.slug, guest.id)}
                    className="p-1.5 text-[#8A7560] hover:text-[#3D2E1E] transition-colors" title="Salin link">
                    {copiedId === guest.id ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                  </button>
                  <button onClick={() => copyWAMessage(guest)}
                    className="p-1.5 text-[#8A7560] hover:text-[#25D366] transition-colors" title="Salin pesan WA">
                    {copiedId === 'wa-' + guest.id ? <Check size={13} className="text-green-600" /> : <Send size={13} />}
                  </button>
                  <button onClick={() => removeGuest(guest.id)}
                    className="p-1.5 text-[#8A7560] hover:text-red-600 transition-colors" title="Hapus">
                    <X size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {guests.length === 0 && (
        <div className="bg-white rounded-sm border border-[#CCC6B1]/40 py-16 text-center" style={{ boxShadow: '0 2px 12px rgba(26,16,8,0.08)' }}>
          <LinkIcon size={32} className="text-[#CCC6B1] mx-auto mb-3" />
          <p className="text-[#3D2E1E] text-sm font-bold mb-1">Belum ada link personal</p>
          <p className="text-[#8A7560] text-xs font-medium mb-4">Buat link undangan personal untuk setiap tamu</p>
          <button onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3D2E1E] text-white text-xs font-bold uppercase hover:bg-[#1A1410] transition-colors"
            style={{ fontFamily: 'var(--font-poppins)' }}>
            <Plus size={12} />Buat Sekarang
          </button>
        </div>
      )}

      {/* Modal Buat Undangan */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-[#1A1410]/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />

            <motion.div className="relative bg-white rounded-sm w-full max-w-md shadow-2xl"
              style={{ boxShadow: '0 25px 80px rgba(26,16,8,0.3)' }}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>

              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#8A7560]" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#8A7560]" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#8A7560]" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#8A7560]" />

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-[#1A1410]" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
                    Buat Link Undangan
                  </h2>
                  <button onClick={() => setShowModal(false)} className="text-[#8A7560] hover:text-[#1A1410] transition-colors">
                    <X size={18} />
                  </button>
                </div>

                {/* Toggle mode */}
                <div className="flex gap-2 mb-5">
                  <button onClick={() => setBulkMode(false)}
                    className={`flex-1 py-2 text-xs font-bold uppercase transition-all border-2 ${!bulkMode ? 'bg-[#3D2E1E] border-[#3D2E1E] text-white' : 'border-[#CCC6B1] text-[#3D2E1E]'}`}
                    style={{ fontFamily: 'var(--font-poppins)' }}>
                    Satu Tamu
                  </button>
                  <button onClick={() => setBulkMode(true)}
                    className={`flex-1 py-2 text-xs font-bold uppercase transition-all border-2 ${bulkMode ? 'bg-[#3D2E1E] border-[#3D2E1E] text-white' : 'border-[#CCC6B1] text-[#3D2E1E]'}`}
                    style={{ fontFamily: 'var(--font-poppins)' }}>
                    Banyak Tamu
                  </button>
                </div>

                {!bulkMode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#1A1410] text-xs tracking-[0.3em] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
                        Nama Tamu
                      </label>
                      <input
                        value={guestName}
                        onChange={e => setGuestName(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { addGuest(); setShowModal(false) } }}
                        className="w-full bg-[#F5F0E8] border-2 border-[#CCC6B1] focus:border-[#3D2E1E] text-[#1A1410] px-4 py-3 outline-none text-sm font-medium placeholder:text-[#8A7560]"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                        placeholder="Contoh: Budi Santoso"
                        autoFocus
                      />
                      {guestName && (
                        <p className="text-[#8A7560] text-xs mt-1.5 font-medium">
                          Link: <span className="text-[#3D2E1E] font-bold">/invite/{nameToSlug(guestName)}</span>
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => { addGuest(); setShowModal(false) }}
                      disabled={!guestName.trim()}
                      className="w-full py-3 bg-[#3D2E1E] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#1A1410] transition-colors disabled:opacity-40"
                      style={{ fontFamily: 'var(--font-poppins)' }}>
                      Buat Link
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#1A1410] text-xs tracking-[0.3em] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
                        Daftar Nama (satu per baris)
                      </label>
                      <textarea
                        value={bulkNames}
                        onChange={e => setBulkNames(e.target.value)}
                        rows={6}
                        className="w-full bg-[#F5F0E8] border-2 border-[#CCC6B1] focus:border-[#3D2E1E] text-[#1A1410] px-4 py-3 outline-none text-sm font-medium placeholder:text-[#8A7560] resize-none"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                        placeholder={"Budi Santoso\nDewi Rahayu\nAhmad Fauzi\n..."}
                        autoFocus
                      />
                      {bulkNames && (
                        <p className="text-[#8A7560] text-xs mt-1.5 font-medium">
                          {bulkNames.split('\n').filter(n => n.trim()).length} tamu akan dibuat
                        </p>
                      )}
                    </div>
                    <button
                      onClick={addBulk}
                      disabled={!bulkNames.trim()}
                      className="w-full py-3 bg-[#3D2E1E] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#1A1410] transition-colors disabled:opacity-40"
                      style={{ fontFamily: 'var(--font-poppins)' }}>
                      Buat Semua Link
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
