'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Share2, Copy, Check, MessageCircle, Phone } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'

const WA_NUMBER = '6283197679315'

interface ShareSectionProps {
  slug: string
  coupleName: string
  weddingDate: string
}

export default function ShareSection({ slug, coupleName, weddingDate }: ShareSectionProps) {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState(`https://undanganpiter.vercel.app/invite/${slug}`)

  useEffect(() => {
    setUrl(`${window.location.origin}/invite/${slug}`)
  }, [slug])

  const tanggal = new Date(weddingDate).toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const shareMessage = `Kepada Yth. Bapak/Ibu/Saudara/i,\n\nDengan penuh sukacita kami mengundang Anda untuk hadir dalam pernikahan\n\n✨ ${coupleName} ✨\n\n📅 ${tanggal}\n\nBuka undangan digital kami di:\n${url}\n\n#PieterFebry2026`

  const confirmMessage = `Halo Pieter & Febry, saya ingin mengkonfirmasi kehadiran saya di pernikahan kalian pada ${tanggal}. 🙏`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* fallback */ }
  }

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank')
  }

  const handleWhatsAppConfirm = () => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(confirmMessage)}`, '_blank')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `Undangan Pernikahan ${coupleName}`, text: shareMessage, url })
      } catch { /* cancelled */ }
    } else {
      handleCopy()
    }
  }

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#EDE8DC' }}>
      <div className="container-luxury relative z-10">
        <SectionReveal className="text-center mb-16">
          <p className="text-[#CCC6B1]/60 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            Sebarkan Kebahagiaan
          </p>
          <h2 className="text-5xl md:text-6xl text-[#2C2416] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
            Bagikan Undangan
          </h2>
          <GoldDivider />
        </SectionReveal>

        <div className="max-w-lg mx-auto space-y-4">
          {/* Card bagikan link */}
          <SectionReveal delay={0.1}>
            <div className="glass p-8 text-center relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#CCC6B1]/30" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#CCC6B1]/30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#CCC6B1]/30" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#CCC6B1]/30" />

              <p className="text-[#2C2416]/40 text-xs mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                Link Undangan
              </p>

              <div className="flex items-center gap-2 bg-[#2C2416]/5 border border-[#2C2416]/15 px-4 py-3 mb-6">
                <p className="text-[#2C2416]/60 text-sm flex-1 truncate text-left" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {url}
                </p>
                <motion.button onClick={handleCopy} className="flex-shrink-0 text-[#CCC6B1]/60 hover:text-[#CCC6B1] transition-colors" whileTap={{ scale: 0.9 }}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </motion.button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={handleWhatsAppShare}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366]/80 hover:text-[#25D366] hover:bg-[#25D366]/20 transition-all text-xs tracking-wider uppercase"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </motion.button>

                <motion.button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-[#CCC6B1]/30 text-[#CCC6B1]/60 hover:text-[#CCC6B1] hover:bg-[#CCC6B1]/10 transition-all text-xs tracking-wider uppercase"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 size={14} />
                  Bagikan
                </motion.button>
              </div>
            </div>
          </SectionReveal>

          {/* Card konfirmasi langsung ke mempelai */}
          <SectionReveal delay={0.2}>
            <div className="glass p-6 text-center relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#25D366]/20" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#25D366]/20" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#25D366]/20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#25D366]/20" />

              <p className="text-[#2C2416]/40 text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
                Konfirmasi Langsung
              </p>
              <p className="text-[#2C2416]/30 text-xs mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                Hubungi mempelai via WhatsApp
              </p>

              <motion.a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(confirmMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3 bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366]/90 hover:text-[#25D366] hover:bg-[#25D366]/25 transition-all text-sm"
                style={{ fontFamily: 'var(--font-poppins)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={14} />
                +62 831-9767-9315
              </motion.a>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
