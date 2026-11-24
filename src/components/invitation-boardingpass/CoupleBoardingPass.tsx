'use client'

import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import type { Couple } from '@/lib/types'

interface CoupleBoardingPassProps { couple: Couple }

export default function CoupleBoardingPass({ couple }: CoupleBoardingPassProps) {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#F5EFE7' }}>
      <div className="container-luxury relative z-10">
        
        {/* Title */}
        <SectionReveal className="text-center mb-16">
          <p className="text-[#8B7355] text-xs tracking-[0.5em] uppercase mb-4 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
            Flight Passengers
          </p>
          <h2 className="text-5xl md:text-6xl text-[#2C2416] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
            Our Journey
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#8B7355] to-transparent" />
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Passenger 01 - Groom */}
          <SectionReveal delay={0.1} direction="left">
            <PassengerCard 
              number="01"
              role="THE GROOM"
              person={couple.groom}
              side="left"
            />
          </SectionReveal>

          {/* Passenger 02 - Bride */}
          <SectionReveal delay={0.2} direction="right">
            <PassengerCard 
              number="02"
              role="THE BRIDE"
              person={couple.bride}
              side="right"
            />
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

interface PassengerCardProps {
  number: string
  role: string
  person: Couple['groom'] | Couple['bride']
  side: 'left' | 'right'
}

function PassengerCard({ number, role, person, side }: PassengerCardProps) {
  return (
    <div className="bg-white shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500" style={{ 
      border: '3px solid #D4C5B9',
      borderRadius: '12px'
    }}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#E8DED2] to-[#F5EFE7] px-6 py-4 flex items-center justify-between border-b-2 border-dashed border-[#D4C5B9]">
        <div>
          <p className="text-xs text-[#8B7355] tracking-[0.3em] uppercase font-bold">Passenger {number}</p>
          <p className="text-sm text-[#5A4A42] tracking-wider font-semibold">{role}</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-white border-2 border-[#8B7355] flex items-center justify-center text-2xl font-bold text-[#2C2416]">
          {number}
        </div>
      </div>

      {/* Body - Photo & Info */}
      <div className="p-6">
        
        {/* Photo */}
        <div className="relative mb-6 group">
          <div className={`relative w-full aspect-[3/4] overflow-hidden ${side === 'left' ? 'clip-passport-left' : 'clip-passport-right'}`} style={{ background: '#E8DED2' }}>
            <Image 
              src={person.photo} 
              alt={person.fullName} 
              fill 
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          {/* Stamp Effect */}
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-4 border-[#B76E79]/40 flex items-center justify-center rotate-12 bg-white/80">
            <span className="text-[#B76E79] text-xs font-bold tracking-wider" style={{ fontFamily: 'var(--font-poppins)' }}>VIP</span>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="space-y-4">
          
          {/* Full Name */}
          <div>
            <p className="text-xs text-[#8B7355] tracking-[0.2em] uppercase mb-1 font-bold">Full Name</p>
            <p className="text-2xl md:text-3xl text-[#2C2416] font-bold leading-tight" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
              {person.name}
            </p>
            <p className="text-sm text-[#5A4A42] mt-1 font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>
              {person.fullName}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4C5B9] to-transparent" />
            <div className="text-xs text-[#8B7355] tracking-[0.3em] font-bold">❖</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4C5B9] to-transparent" />
          </div>

          {/* Parents */}
          <div>
            <p className="text-xs text-[#8B7355] tracking-[0.2em] uppercase mb-2 font-bold">Son/Daughter of</p>
            <p className="text-base text-[#2C2416] font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
              {person.father}
            </p>
            <p className="text-base text-[#2C2416] font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
              & {person.mother}
            </p>
          </div>

          {/* Passport Number (Instagram) */}
          {person.instagram && (
            <div className="bg-[#F5EFE7] p-4 rounded-lg border border-[#D4C5B9]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#8B7355] tracking-[0.2em] uppercase mb-1 font-bold">Passport ID</p>
                  <p className="text-sm text-[#2C2416] font-mono font-bold">
                    {person.instagram.replace('@', '').toUpperCase().padEnd(12, 'X')}
                  </p>
                </div>
                <a 
                  href={`https://instagram.com/${person.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#8B7355] hover:text-[#2C2416] transition-colors"
                >
                  <span className="text-xl">📷</span>
                </a>
              </div>
            </div>
          )}

          {/* Bio */}
          {person.bio && (
            <div className="pt-2">
              <p className="text-sm text-[#5A4A42] italic leading-relaxed" style={{ fontFamily: 'var(--font-cormorant)' }}>
                "{person.bio}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Perforation */}
      <div className="relative h-4 bg-[#E8DED2]">
        <div className="absolute inset-0 flex items-center justify-between px-2">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[#8B7355]/30" />
          ))}
        </div>
      </div>
    </div>
  )
}

<style jsx global>{`
.clip-passport-left {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 95% 100%, 85% 100%, 80% 92%, 70% 92%, 65% 100%, 55% 100%, 50% 92%, 40% 92%, 35% 100%, 25% 100%, 20% 92%, 10% 92%, 5% 100%, 0 85%);
}

.clip-passport-right {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 95% 100%, 90% 92%, 80% 92%, 75% 100%, 65% 100%, 60% 92%, 50% 92%, 45% 100%, 35% 100%, 30% 92%, 20% 92%, 15% 100%, 5% 100%, 0 85%);
}
`}</style>
