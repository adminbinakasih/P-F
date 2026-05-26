'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Share2, Copy, Check, MessageCircle, Phone } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'

const WA_NUMBER = '6283197679315'

interface ShareSectionProps { slug: string; coupleName: string; weddingDate: string }

export default function ShareSection({ slug, coupleName, weddingDate }: ShareSectionProps) {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState(`https://undanganpiter.vercel.app/invite/${slug}`)

  useEffect(() => { setUrl(`${window.location.origin}/invite/${slug}`) }, [slug])

  const tanggal = new Date(weddingDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const shareMessage = `Kepada Yth. Bapak/Ibu/Saudara/i,\n\nDengan penuh sukacita kami mengundang Anda untuk hadir dalam pernikahan\n\n✨ ${coupleName} ✨\n\n📅 ${tanggal}\n\nBuka undangan digital kami di:\n${url}\n\n#PieterFebry2026`
  const confirmMessage = `Halo Pieter & Febry, saya ingin mengkonfirmasi kehadiran saya di pernikahan kalian pada ${tanggal}. 🙏`

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* fallback */ }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: `Undangan Pernikahan ${coupleName}`, text: shareMessage, url }) } catch { /* cancelled */ }
    } else { handleCopy() }
  }

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#C8BFA8' }}>
      <div className="container-luxury relative z-10">
        <SectionReveal className="text-center mb-16">
          <p className="text-[#1A1410] text-xs tracking-[0.5em] uppercase mb-4 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>Sebarkan Kebahagiaan</p>
          <h2 className="text-5xl md:text-6xl text-[#1A1410] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>Bagikan Undangan</h2>
          <GoldDivider />
        </SectionReveal>

        <div className="max-w-lg mx-auto space-y-4">
          <SectionReveal delay={0.1}>
            <div className="glass p-8 text-center relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#CCC6B1]/50" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#CCC6B1]/50" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#CCC6B1]/50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#CCC6B1]/50" />

              <p className="text-[#1A1410] text-xs mb-4 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>Link Undangan</p>

              <div className="flex items-center gap-2 bg-white border-2 border-[#8A7560] px-4 py-3 mb-6">
                <p className="text-[#1A1410] text-sm flex-1 truncate text-left font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>{url}</p>
                <motion.button onClick={handleCopy} className="flex-shrink-0 text-[#3D2E1E] hover:text-[#1A1410] transition-colors" whileTap={{ scale: 0.9 }}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </motion.button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank')}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white hover:bg-[#1da851] transition-all text-xs tracking-wider uppercase font-bold"
                  style={{ fontFamily: 'var(--font-poppins)' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <MessageCircle size={14} />WhatsApp
                </motion.button>
                <motion.button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#3D2E1E] text-white hover:bg-[#1A1410] transition-all text-xs tracking-wider uppercase font-bold"
                  style={{ fontFamily: 'var(--font-poppins)' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Share2 size={14} />Bagikan
                </motion.button>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="glass p-6 text-center relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#25D366]/30" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#25D366]/30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#25D366]/30" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#25D366]/30" />

              <p className="text-[#1A1410] text-xs tracking-[0.3em] uppercase mb-1 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>Konfirmasi Langsung</p>
              <p className="text-[#1A1410] text-xs mb-4 font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>Hubungi mempelai via WhatsApp</p>

              <motion.a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(confirmMessage)}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3 bg-[#25D366] text-white hover:bg-[#1da851] transition-all text-sm font-bold"
                style={{ fontFamily: 'var(--font-poppins)' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Phone size={14} />+62 831-9767-9315
              </motion.a>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
