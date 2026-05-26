'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import GoldDivider from '@/components/ui/GoldDivider'

export default function BibleVerseSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #E8E2D0 0%, #DDD7C4 50%, #E8E2D0 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-8">
        <motion.div className="w-[500px] h-[500px] rounded-full border border-[#CCC6B1]" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute w-[350px] h-[350px] rounded-full border border-[#CCC6B1]" animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
      </div>

      <div className="container-luxury relative z-10 text-center max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }}>

          <div className="flex items-center justify-center mb-8">
            <span className="text-[#8A7560] text-4xl" style={{ fontFamily: 'var(--font-cormorant)' }}>✝</span>
          </div>

          <GoldDivider className="mb-10" />

          <motion.blockquote
            className="text-[#2C2416] text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.2 }}
          >
            "Apa yang telah dipersatukan Allah,
            <br />tidak boleh diceraikan manusia."
          </motion.blockquote>

          <motion.p
            className="text-[#6B5040] text-sm tracking-[0.4em] uppercase mb-12 font-medium"
            style={{ fontFamily: 'var(--font-poppins)' }}
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }}
          >
            Markus 10 : 9
          </motion.p>

          <GoldDivider className="mb-10" />

          <motion.blockquote
            className="text-[#3D2E1E] text-lg md:text-xl leading-relaxed mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.5 }}
          >
            "Dan di atas semuanya itu: kenakanlah kasih, sebagai pengikat yang mempersatukan dan menyempurnakan."
          </motion.blockquote>

          <motion.p
            className="text-[#6B5040] text-xs tracking-[0.3em] uppercase font-medium"
            style={{ fontFamily: 'var(--font-poppins)' }}
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.7 }}
          >
            Kolose 3 : 14
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
