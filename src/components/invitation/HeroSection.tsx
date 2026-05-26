'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import CountdownTimer from '@/components/ui/CountdownTimer'
import type { Couple } from '@/lib/types'

interface HeroSectionProps {
  couple: Couple
  guestName: string
  onOpen: () => void
}

export default function HeroSection({ couple, guestName, onOpen }: HeroSectionProps) {
  const weddingDateFormatted = new Date(couple.weddingDate).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image with parallax feel */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/EL_06256.png)',
          }}
        />
        {/* Multi-layer overlay for cinematic feel */}
        <div className="absolute inset-0 bg-[#0A0A0A]/60" />
        <div className="absolute inset-0 gradient-hero" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)',
          }}
        />
      </div>

      {/* Decorative corner ornaments */}
      <div className="absolute top-8 left-8 z-10 opacity-40">
        <div className="w-12 h-12 border-t border-l border-[#C9A84C]" />
      </div>
      <div className="absolute top-8 right-8 z-10 opacity-40">
        <div className="w-12 h-12 border-t border-r border-[#C9A84C]" />
      </div>
      <div className="absolute bottom-8 left-8 z-10 opacity-40">
        <div className="w-12 h-12 border-b border-l border-[#C9A84C]" />
      </div>
      <div className="absolute bottom-8 right-8 z-10 opacity-40">
        <div className="w-12 h-12 border-b border-r border-[#C9A84C]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Pre-title */}
        <motion.p
          className="text-[#C9A84C]/70 text-xs tracking-[0.5em] uppercase mb-6"
          style={{ fontFamily: 'var(--font-poppins)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Pernikahan
        </motion.p>

        {/* Groom name first (Batak tradition: groom leads) */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white leading-none"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
          >
            {couple.groom.name}
          </h1>
        </motion.div>

        <motion.div
          className="flex items-center gap-4 md:gap-6 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
          <span
            className="text-[#C9A84C] text-2xl md:text-4xl"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
          >
            &
          </span>
          <div className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white leading-none"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
          >
            {couple.bride.name}
          </h1>
        </motion.div>

        {/* Date */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center gap-4 justify-center mb-2">
            <div className="h-px w-8 bg-[#C9A84C]/40" />
            <p
              className="text-[#C9A84C]/80 text-sm tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {weddingDateFormatted}
            </p>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </div>
          <p
            className="text-white/40 text-xs tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {couple.venue.name} · {couple.venue.city}
          </p>
        </motion.div>

        {/* Guest name */}
        {guestName && guestName !== 'Tamu Undangan' && (
          <motion.div
            className="mb-8 glass px-8 py-3 rounded-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <p
              className="text-white/50 text-xs tracking-[0.3em] uppercase mb-1"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Kepada Yth.
            </p>
            <p
              className="text-[#E8D5A3] text-lg"
              style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
            >
              {guestName}
            </p>
          </motion.div>
        )}

        {/* Countdown */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <CountdownTimer targetDate={`${couple.weddingDate}T${couple.weddingTime}:00`} />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onOpen}
          className="btn-luxury rounded-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Buka Undangan
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p
          className="text-white/30 text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-[#C9A84C]/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
