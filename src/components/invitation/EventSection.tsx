'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Shirt, Calendar, ExternalLink } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import type { Couple } from '@/lib/types'

interface EventSectionProps {
  couple: Couple
}

export default function EventSection({ couple }: EventSectionProps) {
  const weddingDateFormatted = new Date(couple.weddingDate).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const addToCalendar = () => {
    const startDate = new Date(`${couple.weddingDate}T${couple.weddingTime}:00`)
    const endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000)

    const formatDate = (d: Date) =>
      d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Pernikahan ${couple.groom.name} & ${couple.bride.name}`
    )}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(
      `${couple.hashtag}\n\nAkad: ${couple.venue.name}\nResepsi: ${couple.reception.name}`
    )}&location=${encodeURIComponent(couple.venue.address)}`

    window.open(url, '_blank')
  }

  return (
    <section className="section-padding relative overflow-hidden bg-[#0A0A0A]">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }}
        />
      </div>

      <div className="container-luxury relative z-10">
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <p
            className="text-[#C9A84C]/60 text-xs tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Catat Tanggalnya
          </p>
          <h2
            className="text-5xl md:text-6xl text-white mb-6"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Rangkaian Acara
          </h2>
          <GoldDivider />
        </SectionReveal>

        {/* Date banner */}
        <SectionReveal className="text-center mb-16" delay={0.1}>
          <div className="inline-block glass px-6 sm:px-10 py-5 sm:py-6 relative max-w-full">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C9A84C]/50" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#C9A84C]/50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#C9A84C]/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C9A84C]/50" />
            <p
              className="text-[#C9A84C]/60 text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-2"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {weddingDateFormatted}
            </p>
            <p
              className="text-white text-xl sm:text-2xl md:text-3xl"
              style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
            >
              {couple.groom.name} & {couple.bride.name}
            </p>
          </div>
        </SectionReveal>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Pemberkatan */}
          <SectionReveal delay={0.2} direction="left">
            <EventCard
              title="Pemberkatan Pernikahan"
              subtitle="Akad / Ibadah Pernikahan"
              venue={couple.venue}
              icon="✝"
            />
          </SectionReveal>

          {/* Pesta Adat */}
          <SectionReveal delay={0.3} direction="right">
            <EventCard
              title="Pesta Adat"
              subtitle="Resepsi & Adat Karo"
              venue={couple.reception}
              icon="✦"
            />
          </SectionReveal>
        </div>

        {/* Dresscode */}
        {couple.venue.dresscode && (
          <SectionReveal className="text-center mb-12" delay={0.4}>
            <div className="inline-flex items-center gap-4 glass px-8 py-4">
              <Shirt size={16} className="text-[#C9A84C]/60" />
              <div>
                <p
                  className="text-[#C9A84C]/60 text-xs tracking-[0.3em] uppercase"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Dresscode
                </p>
                <p
                  className="text-white/80 text-sm"
                  style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
                >
                  {couple.venue.dresscode}
                </p>
              </div>
            </div>
          </SectionReveal>
        )}

        {/* Add to calendar */}
        <SectionReveal className="text-center" delay={0.5}>
          <button
            onClick={addToCalendar}
            className="btn-outline-luxury inline-flex items-center gap-3"
          >
            <Calendar size={14} />
            Tambah ke Kalender
          </button>
        </SectionReveal>
      </div>
    </section>
  )
}

function EventCard({
  title,
  subtitle,
  venue,
  icon,
}: {
  title: string
  subtitle: string
  venue: Couple['venue']
  icon: string
}) {
  return (
    <div className="glass p-5 sm:p-8 relative group hover-lift">
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#C9A84C]/30 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-[#C9A84C]/60" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#C9A84C]/30 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-[#C9A84C]/60" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#C9A84C]/30 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-[#C9A84C]/60" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#C9A84C]/30 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-[#C9A84C]/60" />

      <div className="text-center">
        <span
          className="text-[#C9A84C]/40 text-2xl block mb-4"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {icon}
        </span>

        <h3
          className="text-2xl text-white mb-1"
          style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}
        >
          {title}
        </h3>
        <p
          className="text-[#C9A84C]/50 text-xs tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {subtitle}
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent mb-6" />

        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3">
            <Clock size={14} className="text-[#C9A84C]/50 mt-0.5 flex-shrink-0" />
            <div>
              {venue.date && (
                <p
                  className="text-white/80 text-sm font-medium"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {venue.date}
                </p>
              )}
              <p
                className="text-white/60 text-sm"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {venue.time}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={14} className="text-[#C9A84C]/50 mt-0.5 flex-shrink-0" />
            <div>
              <p
                className="text-white/80 text-sm font-medium"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {venue.name}
              </p>
              <p
                className="text-white/40 text-xs mt-0.5"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {venue.address}
              </p>
            </div>
          </div>
        </div>

        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors text-xs tracking-wider uppercase"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <ExternalLink size={12} />
          Lihat di Maps
        </a>
      </div>
    </div>
  )
}
