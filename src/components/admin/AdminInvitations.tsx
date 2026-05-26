'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Eye, Edit, Trash2, Plus, ExternalLink } from 'lucide-react'

const invitations = [
  { slug: 'pieter-febriyanti', groom: 'Pieter Nero Ginting Suka', bride: 'Febriyanti Br. Surbakti', date: '15 Juni 2026', views: 0, rsvp: 0, status: 'active' },
]

export default function AdminInvitations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
            Undangan
          </h1>
          <p className="text-white/40 text-xs">{invitations.length} total undangan</p>
        </div>
        <button className="btn-luxury text-xs py-2 px-4 inline-flex items-center gap-2">
          <Plus size={12} />
          Buat Undangan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {invitations.map((inv, i) => (
          <motion.div
            key={inv.slug}
            className="glass p-5 relative group hover-lift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#CCC6B1]/20 group-hover:border-[#CCC6B1]/50 transition-colors" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#CCC6B1]/20 group-hover:border-[#CCC6B1]/50 transition-colors" />

            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white/80 text-sm font-medium" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.1rem' }}>
                  {inv.groom} & {inv.bride}
                </h3>
                <p className="text-white/30 text-xs mt-0.5">{inv.date}</p>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 border ${
                  inv.status === 'active'
                    ? 'bg-green-500/10 text-green-400/70 border-green-500/20'
                    : 'bg-white/5 text-white/30 border-white/10'
                }`}
              >
                {inv.status}
              </span>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#CCC6B1]/15 to-transparent mb-3" />

            <div className="flex items-center gap-6 mb-4">
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-wider">Views</p>
                <p className="text-white/70 text-sm font-medium">{inv.views.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-wider">RSVP</p>
                <p className="text-[#CCC6B1]/70 text-sm font-medium">{inv.rsvp}</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-wider">URL</p>
                <p className="text-white/50 text-xs">/invite/{inv.slug}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/invite/${inv.slug}`}
                target="_blank"
                className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 border border-[#CCC6B1]/30 text-[#CCC6B1]/60 hover:text-[#CCC6B1] hover:border-[#CCC6B1]/60 transition-all"
              >
                <ExternalLink size={10} />
                Open
              </Link>
              <button className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 border border-white/10 text-white/40 hover:text-white/60 transition-all">
                <Edit size={10} />
                Edit
              </button>
              <button className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 border border-red-500/20 text-red-400/40 hover:text-red-400/70 transition-all ml-auto">
                <Trash2 size={10} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
