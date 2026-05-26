'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import type { Couple } from '@/lib/types'

interface CoupleSectionProps { couple: Couple }

export default function CoupleSection({ couple }: CoupleSectionProps) {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#C8BFA8' }}>
      <div className="container-luxury relative z-10">
        <SectionReveal className="text-center mb-16">
          <p className="text-[#1A1410] text-xs tracking-[0.5em] uppercase mb-4 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
            Dengan Penuh Cinta
          </p>
          <h2 className="text-5xl md:text-6xl text-[#1A1410] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
            Mempelai
          </h2>
          <GoldDivider />
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-3xl mx-auto">
          <SectionReveal delay={0.1} direction="left">
            <PersonCard person={couple.groom} role="Mempelai Pria" />
          </SectionReveal>
          <SectionReveal delay={0.2} direction="right">
            <PersonCard person={couple.bride} role="Mempelai Wanita" />
          </SectionReveal>
        </div>

        <SectionReveal className="text-center mt-16" delay={0.3}>
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-12 bg-[#CCC6B1]/50" />
            <Heart size={14} className="text-[#B76E79]" fill="#B76E79" />
            <p className="text-[#8A7560] text-lg tracking-wider" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
              {couple.hashtag}
            </p>
            <Heart size={14} className="text-[#B76E79]" fill="#B76E79" />
            <div className="h-px w-12 bg-[#CCC6B1]/50" />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

function PersonCard({ person, role }: { person: Couple['bride'] | Couple['groom']; role: string }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative mb-8">
        <div className="relative w-56 h-72 overflow-hidden">
          <div className="absolute -inset-2 border border-[#CCC6B1]/30 z-10 pointer-events-none" />
          <div className="absolute -inset-4 border border-[#CCC6B1]/15 z-10 pointer-events-none" />
          <Image src={person.photo} alt={person.fullName} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="224px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8]/40 to-transparent" />
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass px-4 py-1 whitespace-nowrap">
          <span className="text-[#1A1410] text-xs tracking-[0.3em] uppercase font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
            {role}
          </span>
        </div>
      </div>

      <h3 className="text-4xl sm:text-5xl text-[#1A1410] mt-2 mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 500 }}>
        {person.name}
      </h3>
      <p className="text-[#1A1410] text-xs tracking-wide mb-4 px-2 font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>
        {person.fullName}
      </p>

      <div className="mb-4">
        <p className="text-[#3D2E1E] text-xs tracking-wider mb-2 font-bold uppercase" style={{ fontFamily: 'var(--font-poppins)' }}>
          Putra/Putri dari
        </p>
        <p className="text-[#1A1410] text-sm font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
          {person.father}
        </p>
        <p className="text-[#1A1410] text-sm font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
          & {person.mother}
        </p>
      </div>
    </div>
  )
}
