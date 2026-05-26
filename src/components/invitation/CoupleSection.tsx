'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { AtSign, Heart } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import type { Couple } from '@/lib/types'

interface CoupleSectionProps {
  couple: Couple
}

export default function CoupleSection({ couple }: CoupleSectionProps) {
  return (
    <section className="section-padding relative overflow-hidden bg-[#0A0A0A]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-luxury relative z-10">
        {/* Section header */}
        <SectionReveal className="text-center mb-16">
          <p
            className="text-[#C9A84C]/60 text-xs tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Dengan Penuh Cinta
          </p>
          <h2
            className="text-5xl md:text-6xl text-white mb-6"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Mempelai
          </h2>
          <GoldDivider />
        </SectionReveal>

        {/* Couple cards — Pria dulu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-3xl mx-auto">
          {/* Groom */}
          <SectionReveal delay={0.1} direction="left">
            <PersonCard person={couple.groom} role="Mempelai Pria" />
          </SectionReveal>

          {/* Bride */}
          <SectionReveal delay={0.2} direction="right">
            <PersonCard person={couple.bride} role="Mempelai Wanita" />
          </SectionReveal>
        </div>

        {/* Hashtag */}
        <SectionReveal className="text-center mt-16" delay={0.3}>
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-12 bg-[#C9A84C]/30" />
            <Heart size={14} className="text-[#B76E79]" fill="#B76E79" />
            <p
              className="text-[#C9A84C] text-lg tracking-wider"
              style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
            >
              {couple.hashtag}
            </p>
            <Heart size={14} className="text-[#B76E79]" fill="#B76E79" />
            <div className="h-px w-12 bg-[#C9A84C]/30" />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

function PersonCard({
  person,
  role,
}: {
  person: Couple['bride'] | Couple['groom']
  role: string
}) {
  return (
    <div className="flex flex-col items-center text-center group">
      {/* Photo */}
      <div className="relative mb-8">
        <div className="relative w-56 h-72 overflow-hidden">
          {/* Decorative frame */}
          <div className="absolute -inset-2 border border-[#C9A84C]/20 z-10 pointer-events-none" />
          <div className="absolute -inset-4 border border-[#C9A84C]/10 z-10 pointer-events-none" />

          <Image
            src={person.photo}
            alt={person.fullName}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 224px, 224px"
          />
          {/* Photo overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent" />
        </div>

        {/* Role badge */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass px-4 py-1 whitespace-nowrap">
          <span
            className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {role}
          </span>
        </div>
      </div>

      {/* Name — nickname besar, fullname kecil di bawah */}
      <h3
        className="text-4xl sm:text-5xl text-white mt-2 mb-1"
        style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}
      >
        {person.name}
      </h3>
      <p
        className="text-white/40 text-xs tracking-wide mb-4 px-2"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {person.fullName}
      </p>

      {/* Parents */}
      <div className="mb-4">
        <p
          className="text-white/30 text-xs tracking-wider mb-1"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Putra/Putri dari
        </p>
        <p
          className="text-white/60 text-sm"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {person.father}
        </p>
        <p
          className="text-white/60 text-sm"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          & {person.mother}
        </p>
      </div>

      {/* Instagram dihapus */}
    </div>
  )
}
