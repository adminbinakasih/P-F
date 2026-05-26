'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import GoldDivider from '@/components/ui/GoldDivider'

export default function BibleVerseSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #111008 50%, #0A0A0A 100%)' }}
    >
      {/* Decorative glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 65%)' }}
      />

      {/* Rotating ornament */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <motion.div
          className="w-[500px] h-[500px] rounded-full border border-[#C9A84C]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full border border-[#C9A84C]"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container-luxury relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Cross / symbol */}
          <div className="flex items-center justify-center mb-8">
            <span
              className="text-[#C9A84C]/50 text-4xl"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              ✝
            </span>
          </div>

          <GoldDivider className="mb-10" />

          {/* Ayat utama */}
          <motion.blockquote
            className="text-white/75 text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-6"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            "Apa yang telah dipersatukan Allah,
            <br />
            tidak boleh diceraikan manusia."
          </motion.blockquote>

          <motion.p
            className="text-[#C9A84C]/60 text-sm tracking-[0.4em] uppercase mb-12"
            style={{ fontFamily: 'var(--font-poppins)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Markus 10 : 9
          </motion.p>

          <GoldDivider className="mb-10" />

          {/* Ayat kedua */}
          <motion.blockquote
            className="text-white/50 text-lg md:text-xl leading-relaxed mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            "Dan di atas semuanya itu: kenakanlah kasih, sebagai pengikat yang mempersatukan dan menyempurnakan."
          </motion.blockquote>

          <motion.p
            className="text-[#C9A84C]/40 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-poppins)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Kolose 3 : 14
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
