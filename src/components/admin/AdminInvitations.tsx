'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Plus } from 'lucide-react'

const invitations = [
  {
    slug: 'pieter-febriyanti',
    groom: 'Pieter Nero Ginting Suka',
    bride: 'Febriyanti Br. Surbakti',
    date: '15 Juni 2026',
    venue: 'GBKP Rg. Simpang Tuntungan, Medan',
    status: 'active',
  },
]

export default function AdminInvitations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#1A1410] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
            Undangan
          </h1>
          <p className="text-[#6B5040] text-xs font-medium">{invitations.length} total undangan aktif</p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#3D2E1E] text-[#F5F0E8] text-xs font-bold tracking-wider uppercase hover:bg-[#1A1410] transition-colors"
          style={{ fontFamily: 'var(--font-poppins)' }}>
          <Plus size={12} />Buat Undangan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {invitations.map((inv, i) => (
          <motion.div key={inv.slug}
            className="bg-white rounded-sm p-6 relative border border-[#CCC6B1]/40"
            style={{ boxShadow: '0 4px 20px rgba(26,16,8,0.10)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>

            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#8A7560]" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#8A7560]" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#8A7560]" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#8A7560]" />

            {/* Status badge */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[#1A1410] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.4rem', fontWeight: 400 }}>
                  {inv.groom}
                </h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#8A7560] text-sm" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>&</span>
                  <h3 className="text-[#1A1410]" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.4rem', fontWeight: 400 }}>
                    {inv.bride}
                  </h3>
                </div>
              </div>
              <span className="text-[10px] px-2 py-1 font-bold rounded-sm"
                style={{ background: '#dcfce7', color: '#166534', border: '1px solid #86efac' }}>
                {inv.status === 'active' ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>

            <div className="h-px bg-[#EAE4D5] mb-4" />

            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: 'Tanggal', value: inv.date },
                { label: 'Lokasi', value: inv.venue },
                { label: 'URL', value: `/invite/${inv.slug}` },
                { label: 'Hashtag', value: '#PieterFebry2026' },
              ].map(item => (
                <div key={item.label} className="bg-[#F5F0E8] p-2.5 rounded-sm border border-[#CCC6B1]/30">
                  <p className="text-[#8A7560] text-[9px] uppercase tracking-wider mb-0.5 font-bold">{item.label}</p>
                  <p className="text-[#1A1410] text-xs font-semibold truncate">{item.value}</p>
                </div>
              ))}
            </div>

            <Link href={`/invite/${inv.slug}`} target="_blank"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#3D2E1E] text-[#F5F0E8] text-xs font-bold tracking-wider uppercase hover:bg-[#1A1410] transition-colors"
              style={{ fontFamily: 'var(--font-poppins)' }}>
              <ExternalLink size={12} />
              Buka Undangan
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
