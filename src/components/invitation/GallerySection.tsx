'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
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

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#0D0D0D' }}>
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

        {/* Masonry grid */}
        <SectionReveal delay={0.1}>
          <div className="masonry-grid">
            {gallery.map((item, index) => (
              <div key={item.id} className="masonry-item">
                <motion.div
                  className="relative overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(index)}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: `${(item.height / item.width) * 100}%` }}
                  >
                    <Image
                      src={item.url}
                      alt={item.caption || `Gallery ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/40 transition-all duration-400 flex items-center justify-center">
                      <ZoomIn
                        size={24}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    {/* Gold border on hover */}
                    <div className="absolute inset-0 border border-[#C9A84C]/0 group-hover:border-[#C9A84C]/30 transition-all duration-400" />
                  </div>
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p
                        className="text-white/80 text-xs text-center"
                        style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
                      >
                        {item.caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
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
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-sm"
              onClick={closeLightbox}
            />

            {/* Image */}
            <motion.div
              className="relative z-10 max-w-4xl max-h-[85vh] w-full mx-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative w-full h-[70vh]">
                <Image
                  src={gallery[lightboxIndex].url}
                  alt={gallery[lightboxIndex].caption || ''}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              {gallery[lightboxIndex].caption && (
                <p
                  className="text-center text-white/60 text-sm mt-4 italic"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {gallery[lightboxIndex].caption}
                </p>
              )}
            </motion.div>

            {/* Controls */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 w-10 h-10 glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <ChevronRight size={18} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <p
                className="text-white/40 text-xs tracking-widest"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {lightboxIndex + 1} / {gallery.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
