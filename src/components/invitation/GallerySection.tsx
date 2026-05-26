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

  const closeLightbox = () => setLightboxIndex(null)
  const prev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)
  }
  const next = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % gallery.length)
  }

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#F0EBE0' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.04) 0%, transparent 65%)' }}
      />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <p className="text-[#CCC6B1]/60 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            Kenangan Indah
          </p>
          <h2 className="text-5xl md:text-6xl text-[#2C2416] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
            Galeri Foto
          </h2>
          <GoldDivider />
        </SectionReveal>

        {/* Grid 3 kolom — semua foto tampil dengan aspect ratio asli */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-5xl mx-auto">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden cursor-pointer group"
              style={{ paddingBottom: `${(item.height / item.width) * 100}%` }}
              onClick={() => setLightboxIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src={item.url}
                alt={item.caption || `Foto ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-[#CCC6B1]/0 group-hover:w-5 group-hover:h-5 group-hover:border-[#CCC6B1]/80 transition-all duration-500 z-10" />
              <div className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-[#CCC6B1]/0 group-hover:w-5 group-hover:h-5 group-hover:border-[#CCC6B1]/80 transition-all duration-500 z-10" />
              <div className="absolute bottom-0 left-0 w-0 h-0 border-b-2 border-l-2 border-[#CCC6B1]/0 group-hover:w-5 group-hover:h-5 group-hover:border-[#CCC6B1]/80 transition-all duration-500 z-10" />
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-[#CCC6B1]/0 group-hover:w-5 group-hover:h-5 group-hover:border-[#CCC6B1]/80 transition-all duration-500 z-10" />
              <div className="absolute inset-0 bg-[#F5F0E8]/0 group-hover:bg-[#F5F0E8]/30 transition-all duration-500 z-10" />
            </motion.div>
          ))}
        </div>

        {/* Hint */}
        <SectionReveal className="text-center mt-8" delay={0.2}>
          <p className="text-[#2C2416]/20 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-poppins)' }}>
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
            <div className="absolute inset-0 bg-[#F5F0E8]/97 backdrop-blur-md" onClick={closeLightbox} />

            <motion.div
              className="relative z-10 w-full max-w-4xl mx-4 sm:mx-8"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Gold corner frame */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#CCC6B1]/60 z-20" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#CCC6B1]/60 z-20" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#CCC6B1]/60 z-20" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#CCC6B1]/60 z-20" />

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
                <p className="text-center text-[#CCC6B1]/60 text-xs mt-4 tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {gallery[lightboxIndex].caption}
                </p>
              )}
            </motion.div>

            <button onClick={closeLightbox} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 glass flex items-center justify-center text-[#2C2416]/50 hover:text-[#CCC6B1] transition-colors">
              <X size={16} />
            </button>
            <button onClick={prev} className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass flex items-center justify-center text-[#2C2416]/50 hover:text-[#CCC6B1] transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass flex items-center justify-center text-[#2C2416]/50 hover:text-[#CCC6B1] transition-colors">
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`transition-all duration-300 rounded-full ${i === lightboxIndex ? 'w-4 h-1.5 bg-[#CCC6B1]' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
