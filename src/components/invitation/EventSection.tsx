'use client'

import { MapPin, Clock, Shirt, Calendar, ExternalLink } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import type { Couple } from '@/lib/types'

interface EventSectionProps { couple: Couple }

export default function EventSection({ couple }: EventSectionProps) {
  const weddingDateFormatted = new Date(couple.weddingDate).toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const addToCalendar = () => {
    const startDate = new Date(`${couple.weddingDate}T${couple.weddingTime}:00`)
    const endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000)
    const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Pernikahan ${couple.groom.name} & ${couple.bride.name}`
    )}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(
      `${couple.hashtag}\n\nAkad: ${couple.venue.name}\nResepsi: ${couple.reception.name}`
    )}&location=${encodeURIComponent(couple.venue.address)}`
    window.open(url, '_blank')
  }

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#C8BFA8' }}>
      <div className="container-luxury relative z-10">
        <SectionReveal className="text-center mb-16">
          <p className="text-[#1A1410] text-xs tracking-[0.5em] uppercase mb-4 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
            Catat Tanggalnya
          </p>
          <h2 className="text-5xl md:text-6xl text-[#1A1410] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
            Rangkaian Acara
          </h2>
          <GoldDivider />
        </SectionReveal>

        <SectionReveal className="text-center mb-16" delay={0.1}>
          <div className="inline-block glass px-6 sm:px-10 py-5 sm:py-6 relative max-w-full">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#CCC6B1]/60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#CCC6B1]/60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#CCC6B1]/60" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#CCC6B1]/60" />
            <p className="text-[#1A1410] text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
              {weddingDateFormatted}
            </p>
            <p className="text-[#1A1410] text-xl sm:text-2xl md:text-3xl font-medium" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
              {couple.groom.name} & {couple.bride.name}
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <SectionReveal delay={0.2} direction="left">
            <EventCard title="Pemberkatan Pernikahan" subtitle="Akad / Ibadah Pernikahan" venue={couple.venue} icon="✝" />
          </SectionReveal>
          <SectionReveal delay={0.3} direction="right">
            <EventCard title="Pesta Adat" subtitle="Resepsi & Adat Karo" venue={couple.reception} icon="✦" />
          </SectionReveal>
        </div>

        {couple.venue.dresscode && (
          <SectionReveal className="text-center mb-12" delay={0.4}>
            <div className="inline-flex items-center gap-4 glass px-8 py-4">
              <Shirt size={16} className="text-[#8A7560]" />
              <div>
                <p className="text-[#6B5040] text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>Dresscode</p>
                <p className="text-[#2C2416] text-sm font-medium" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>{couple.venue.dresscode}</p>
              </div>
            </div>
          </SectionReveal>
        )}

        <SectionReveal className="text-center" delay={0.5}>
          <button onClick={addToCalendar} className="btn-outline-luxury inline-flex items-center gap-3">
            <Calendar size={14} />
            Tambah ke Kalender
          </button>
        </SectionReveal>
      </div>
    </section>
  )
}

function EventCard({ title, subtitle, venue, icon }: { title: string; subtitle: string; venue: Couple['venue']; icon: string }) {
  return (
    <div className="glass p-5 sm:p-8 relative group hover-lift">
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#CCC6B1]/40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-[#CCC6B1]/80" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#CCC6B1]/40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-[#CCC6B1]/80" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#CCC6B1]/40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-[#CCC6B1]/80" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#CCC6B1]/40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-[#CCC6B1]/80" />

      <div className="text-center">
        <span className="text-[#3D2E1E] text-2xl block mb-4 font-bold" style={{ fontFamily: 'var(--font-cormorant)' }}>{icon}</span>
        <h3 className="text-2xl text-[#1A1410] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 500 }}>{title}</h3>
        <p className="text-[#1A1410] text-xs tracking-[0.3em] uppercase mb-6 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>{subtitle}</p>
        <div className="h-0.5 bg-[#8A7560] mb-6" />

        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3">
            <Clock size={14} className="text-[#3D2E1E] mt-0.5 flex-shrink-0" />
            <div>
              {venue.date && <p className="text-[#1A1410] text-sm font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>{venue.date}</p>}
              <p className="text-[#1A1410] text-sm font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>{venue.time}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={14} className="text-[#3D2E1E] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[#1A1410] text-sm font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>{venue.name}</p>
              <p className="text-[#1A1410] text-xs mt-0.5 font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>{venue.address}</p>
            </div>
          </div>
        </div>

        <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[#1A1410] hover:text-[#3D2E1E] transition-colors text-xs tracking-wider uppercase font-bold underline underline-offset-2"
          style={{ fontFamily: 'var(--font-poppins)' }}>
          <ExternalLink size={12} />
          Lihat di Maps
        </a>
      </div>
    </div>
  )
}
