'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, Heart } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import type { Wish } from '@/lib/types'

interface WishesSectionProps {
  wishes: Wish[]
  invitationSlug: string
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diff < 60) return 'baru saja'
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
  return `${Math.floor(diff / 86400)} hari lalu`
}

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

export default function WishesSection({ wishes: initialWishes, invitationSlug }: WishesSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const displayedWishes = showAll ? wishes : wishes.slice(0, 4)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setIsLoading(true)
    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    }
    try {
      await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, invitationSlug }),
      })
    } catch { /* demo mode */ }
    setWishes((prev) => [newWish, ...prev])
    setName('')
    setMessage('')
    setIsLoading(false)
  }

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#0D0D0D' }}>
      <div className="container-luxury relative z-10">
        <SectionReveal className="text-center mb-16">
          <p className="text-[#CCC6B1]/60 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            Ucapan & Doa
          </p>
          <h2 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
            Buku Tamu
          </h2>
          <GoldDivider />
        </SectionReveal>

        <div className="max-w-2xl mx-auto">
          {/* Form kirim ucapan */}
          <SectionReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass p-5 sm:p-8 mb-12 relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#CCC6B1]/30" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#CCC6B1]/30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#CCC6B1]/30" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#CCC6B1]/30" />

              <h3 className="text-xl text-white mb-6 text-center" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
                Tulis Ucapan & Doa
              </h3>

              <div className="space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#CCC6B1]/50 text-white/80 px-4 py-3 outline-none transition-colors text-sm placeholder:text-white/20"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                  placeholder="Nama Anda"
                  required
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#CCC6B1]/50 text-white/80 px-4 py-3 outline-none transition-colors text-sm placeholder:text-white/20 resize-none"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                  placeholder="Tulis ucapan dan doa tulus untuk kedua mempelai..."
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-luxury w-full flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  {isLoading ? 'Mengirim...' : 'Kirim Ucapan'}
                </button>
              </div>
            </form>
          </SectionReveal>

          {/* Daftar ucapan */}
          <div className="space-y-4">
            <AnimatePresence>
              {displayedWishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  className="glass p-6 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CCC6B1]/30 to-[#B76E79]/30 border border-[#CCC6B1]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#CCC6B1] text-xs font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {getInitials(wish.name)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white/80 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
                          {wish.name}
                        </h4>
                        <span className="text-white/30 text-xs" style={{ fontFamily: 'var(--font-poppins)' }}>
                          {timeAgo(wish.createdAt)}
                        </span>
                      </div>
                      <p className="text-white/50 leading-relaxed" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1rem' }}>
                        "{wish.message}"
                      </p>
                    </div>
                  </div>
                  <Heart size={10} className="absolute bottom-3 right-4 text-[#B76E79]/30" fill="currentColor" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {wishes.length > 4 && (
            <SectionReveal className="text-center mt-8" delay={0.2}>
              <button onClick={() => setShowAll(!showAll)} className="btn-outline-luxury">
                {showAll ? 'Tampilkan Lebih Sedikit' : `Lihat Semua ${wishes.length} Ucapan`}
              </button>
            </SectionReveal>
          )}
        </div>
      </div>
    </section>
  )
}
