'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Gift } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import type { GiftAccount } from '@/lib/types'

interface GiftSectionProps {
  gifts: GiftAccount[]
}

export default function GiftSection({ gifts }: GiftSectionProps) {
  return (
    <section className="section-padding relative overflow-hidden bg-[#EAE4D5]">
      <div className="container-luxury relative z-10">
        <SectionReveal className="text-center mb-16">
          <p className="text-[#CCC6B1]/60 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            Tanda Kasih
          </p>
          <h2 className="text-5xl md:text-6xl text-[#2C2416] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
            Amplop Digital
          </h2>
          <GoldDivider />
          <p className="text-[#2C2416]/40 text-sm mt-6 max-w-md mx-auto" style={{ fontFamily: 'var(--font-poppins)' }}>
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
    try {
      await navigator.clipboard.writeText(gift.accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* fallback */ }
  }

  const typeLabel = { bank: 'Transfer Bank', ewallet: 'Dompet Digital', qris: 'QRIS' }[gift.type]
  const typeColor = { bank: '#CCC6B1', ewallet: '#B76E79', qris: '#8C8C8C' }[gift.type]

  return (
    <div className="glass p-6 relative group hover-lift">
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#CCC6B1]/20 group-hover:border-[#CCC6B1]/50 transition-colors" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#CCC6B1]/20 group-hover:border-[#CCC6B1]/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#CCC6B1]/20 group-hover:border-[#CCC6B1]/50 transition-colors" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#CCC6B1]/20 group-hover:border-[#CCC6B1]/50 transition-colors" />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-poppins)', color: typeColor + '80' }}>
          {typeLabel}
        </span>
        <Gift size={14} style={{ color: typeColor + '60' }} />
      </div>

      <h3 className="text-2xl text-[#2C2416] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
        {gift.name}
      </h3>
      <p className="text-[#2C2416]/50 text-xs mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
        a.n. {gift.accountName}
      </p>

      <div className="h-px bg-gradient-to-r from-transparent via-[#CCC6B1]/20 to-transparent mb-4" />

      <div className="flex items-center justify-between gap-3">
        <p className="text-[#2C2416]/80 text-sm font-medium tracking-wider flex-1 break-all" style={{ fontFamily: 'var(--font-poppins)' }}>
          {gift.accountNumber}
        </p>
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[#CCC6B1]/30 hover:border-[#CCC6B1]/60 text-[#CCC6B1]/60 hover:text-[#CCC6B1] transition-all"
          style={{ fontFamily: 'var(--font-poppins)' }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? <><Check size={11} />Tersalin</> : <><Copy size={11} />Salin</>}
        </motion.button>
      </div>
    </div>
  )
}
