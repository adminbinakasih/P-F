'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import type { StoryItem } from '@/lib/types'

interface StorySectionProps {
  story: StoryItem[]
}

export default function StorySection({ story }: StorySectionProps) {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#0D0D0D' }}>
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(201,168,76,0.02) 80px, rgba(201,168,76,0.02) 81px)',
          }}
        />
      </div>

      <div className="container-luxury relative z-10">
        {/* Header */}
        <SectionReveal className="text-center mb-20">
          <p
            className="text-[#C9A84C]/60 text-xs tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Our Journey
          </p>
          <h2
            className="text-5xl md:text-6xl text-white mb-6"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Kisah Cinta
          </h2>
          <GoldDivider />
        </SectionReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {story.map((item, index) => (
              <StoryCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StoryCard({ item, index }: { item: StoryItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image */}
      <div className="w-full md:w-5/12">
        {item.image ? (
          <div className="relative aspect-[4/3] overflow-hidden group">
            <div className="absolute -inset-1 border border-[#C9A84C]/15 z-10 pointer-events-none" />
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
          </div>
        ) : (
          <div className="aspect-[4/3] glass flex items-center justify-center">
            <span
              className="text-[#C9A84C]/30 text-6xl"
              style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
            >
              ♡
            </span>
          </div>
        )}
      </div>

      {/* Center dot (desktop) */}
      <div className="hidden md:flex w-2/12 justify-center">
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-[#C9A84C] animate-pulse-gold" />
          <div className="absolute inset-0 rounded-full bg-[#C9A84C]/20 scale-150" />
        </div>
      </div>

      {/* Content */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:text-left' : 'md:text-right'} text-center`}>
        <p
          className="text-[#C9A84C]/60 text-xs tracking-[0.4em] uppercase mb-3"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {item.date}
        </p>
        <h3
          className="text-3xl text-white mb-4"
          style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}
        >
          {item.title}
        </h3>
        <div className={`h-px w-12 bg-[#C9A84C]/40 mb-4 ${isEven ? '' : 'md:ml-auto'} mx-auto md:mx-0`} />
        <p
          className="text-white/50 text-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}
