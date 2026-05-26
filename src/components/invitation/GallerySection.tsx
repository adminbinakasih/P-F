'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import type { GalleryItem } from '@/lib/types'

interface GallerySectionProps {
  gallery: GalleryItem[]
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)
  }
  const next = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % gallery.length)
  }

  // Layout bento: foto pertama featured besar, sisanya grid
  const featured = gallery[0]
  const rest = gallery.slice(1)

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.04) 0%, transparent 65%)' }}
      />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <p
            className="text-[#C9A84C]/60 text-xs tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Kenangan Indah
          </p>
          <h2
            className="text-5xl md:text-6xl text-white mb-6"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Galeri Foto
          </h2>
          <GoldDivider />
        </SectionReveal>

        {/* Bento layout */}
        <div className="max-w-5xl mx-auto space-y-3">

          {/* Row 1: Featured foto besar + 2 foto kanan */}
          <SectionReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Featured — 2/3 lebar */}
              {featured && (
                <GalleryCard
                  item={featured}
                  index={0}
                  onClick={() => openLightbox(0)}
                  className="md:col-span-2 aspect-[4/3]"
                />
              )}
              {/* 2 foto kanan stacked */}
              <div className="grid grid-rows-2 gap-3">
                {rest.slice(0, 2).map((item, i) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    index={i + 1}
                    onClick={() => openLightbox(i + 1)}
                    className="aspect-[4/3] md:aspect-auto"
                  />
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Row 2: 3 foto sejajar */}
          <SectionReveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {rest.slice(2, 5).map((item, i) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={i + 3}
                  onClick={() => openLightbox(i + 3)}
                  className="aspect-[3/4]"
                />
              ))}
            </div>
          </SectionReveal>

          {/* Row 3: sisa foto (jika ada) — 2 foto lebar */}
          {rest.slice(5).length > 0 && (
            <SectionReveal delay={0.3}>
              <div className={`grid gap-3 ${rest.slice(5).length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {rest.slice(5).map((item, i) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    index={i + 6}
                    onClick={() => openLightbox(i + 6)}
                    className="aspect-[16/9]"
                  />
                ))}
              </div>
            </SectionReveal>
          )}
        </div>

        {/* Caption hint */}
        <SectionReveal className="text-center mt-8" delay={0.4}>
          <p
            className="text-white/20 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Ketuk foto untuk memperbesar
          </p>
        </SectionReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-[#0A0A0A]/97 backdrop-blur-md"
              onClick={closeLightbox}
            />

            <motion.div
              className="relative z-10 w-full max-w-4xl mx-4 sm:mx-8"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Gold frame corners */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#C9A84C]/60 z-20" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#C9A84C]/60 z-20" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#C9A84C]/60 z-20" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#C9A84C]/60 z-20" />

              <div className="relative w-full h-[65vh] sm:h-[75vh]">
                <Image
                  src={gallery[lightboxIndex].url}
                  alt={gallery[lightboxIndex].caption || ''}
                  fill
                  className="object-contain"
                  sizes="95vw"
                />
              </div>

              {gallery[lightboxIndex].caption && (
                <p
                  className="text-center text-[#C9A84C]/60 text-sm mt-4 tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {gallery[lightboxIndex].caption}
                </p>
              )}
            </motion.div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 glass flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-colors"
            >
              <X size={16} />
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Next */}
            <button
              onClick={next}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-colors"
            >
              <ChevronRight size={18} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === lightboxIndex
                      ? 'w-4 h-1.5 bg-[#C9A84C]'
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryCard({
  item,
  index,
  onClick,
  className = '',
}: {
  item: GalleryItem
  index: number
  onClick: () => void
  className?: string
}) {
  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer group ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.005 }}
    >
      {/* Gold border frame */}
      <div className="absolute inset-0 border border-[#C9A84C]/0 group-hover:border-[#C9A84C]/40 transition-all duration-500 z-10 pointer-events-none" />
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-[#C9A84C]/0 group-hover:w-6 group-hover:h-6 group-hover:border-[#C9A84C]/70 transition-all duration-500 z-10" />
      <div className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-[#C9A84C]/0 group-hover:w-6 group-hover:h-6 group-hover:border-[#C9A84C]/70 transition-all duration-500 z-10" />
      <div className="absolute bottom-0 left-0 w-0 h-0 border-b-2 border-l-2 border-[#C9A84C]/0 group-hover:w-6 group-hover:h-6 group-hover:border-[#C9A84C]/70 transition-all duration-500 z-10" />
      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-[#C9A84C]/0 group-hover:w-6 group-hover:h-6 group-hover:border-[#C9A84C]/70 transition-all duration-500 z-10" />

      <Image
        src={item.url}
        alt={item.caption || `Foto ${index + 1}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
    </motion.div>
  )
}
