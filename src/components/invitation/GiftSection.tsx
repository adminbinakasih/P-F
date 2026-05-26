'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Gift } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import type { GiftAccount } from '@/lib/types'

interface GiftSectionProps { gifts: GiftAccount[] }

export default function GiftSection({ gifts }: GiftSectionProps) {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#D4CDB8' }}>
      <div className="container-luxury relative z-10">
        <SectionReveal className="text-center mb-16">
          <p className="text-[#1A1410] text-xs tracking-[0.5em] uppercase mb-4 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>Tanda Kasih</p>
          <h2 className="text-5xl md:text-6xl text-[#1A1410] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>Amplop Digital</h2>
          <GoldDivider />
          <p className="text-[#1A1410] text-sm mt-6 max-w-md mx-auto font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
            Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, berikut informasinya.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {gifts.map((gift, index) => (
            <SectionReveal key={index} delay={index * 0.1}>
              <GiftCard gift={gift} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function GiftCard({ gift }: { gift: GiftAccount }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(gift.accountNumber); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* fallback */ }
  }

  const typeLabel = { bank: 'Transfer Bank', ewallet: 'Dompet Digital', qris: 'QRIS' }[gift.type]
  const typeColor = { bank: '#8A7560', ewallet: '#B76E79', qris: '#6B6B6B' }[gift.type]

  return (
    <div className="glass p-6 relative group hover-lift">
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#CCC6B1]/40 group-hover:border-[#CCC6B1]/80 transition-colors" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#CCC6B1]/40 group-hover:border-[#CCC6B1]/80 transition-colors" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#CCC6B1]/40 group-hover:border-[#CCC6B1]/80 transition-colors" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#CCC6B1]/40 group-hover:border-[#CCC6B1]/80 transition-colors" />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-[0.3em] uppercase font-bold" style={{ fontFamily: 'var(--font-poppins)', color: typeColor }}>{typeLabel}</span>
        <Gift size={14} style={{ color: typeColor }} />
      </div>

      <h3 className="text-2xl text-[#1A1410] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 500 }}>{gift.name}</h3>
      <p className="text-[#1A1410] text-xs mb-4 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>a.n. {gift.accountName}</p>

      <div className="h-0.5 bg-[#8A7560] mb-4" />

      <div className="flex items-center justify-between gap-3">
        <p className="text-[#1A1410] text-sm font-bold tracking-wider flex-1 break-all" style={{ fontFamily: 'var(--font-poppins)' }}>{gift.accountNumber}</p>
        <motion.button onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#3D2E1E] text-white hover:bg-[#1A1410] transition-all font-bold"
          style={{ fontFamily: 'var(--font-poppins)' }} whileTap={{ scale: 0.95 }}>
          {copied ? <><Check size={11} />Tersalin</> : <><Copy size={11} />Salin</>}
        </motion.button>
      </div>
    </div>
  )
}
