'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/ui/LoadingScreen'
import FloatingPetals from '@/components/ui/FloatingPetals'
import MusicPlayer from '@/components/ui/MusicPlayer'
import HeroSection from './HeroSection'
import BibleVerseSection from './BibleVerseSection'
import CoupleSection from './CoupleSection'
import StorySection from './StorySection'
import EventSection from './EventSection'
import GallerySection from './GallerySection'
import RSVPSection from './RSVPSection'
import WishesSection from './WishesSection'
import GiftSection from './GiftSection'
import ShareSection from './ShareSection'
import Footer from './Footer'
import type { InvitationData } from '@/lib/types'

interface InvitationWrapperProps {
  data: InvitationData
}

export default function InvitationWrapper({ data }: InvitationWrapperProps) {
  const [isOpened, setIsOpened] = useState(false)

  const { couple, gallery, wishes, gifts, slug, guestName } = data

  return (
    <>
      <LoadingScreen groomName={couple.groom.name} brideName={couple.bride.name} />
      <FloatingPetals />

      {/* Cover — fixed di atas sebelum dibuka */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="cover"
            className="fixed inset-0 z-40"
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HeroSection couple={couple} guestName={guestName} onOpen={() => setIsOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konten utama */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpened ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={isOpened ? 'block' : 'pointer-events-none select-none'}
      >
        {/* Banner pembuka setelah cover */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/EL_06256.png)' }}
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/70" />
            <div className="absolute inset-0 gradient-hero" />
          </div>

          {/* Corner ornaments */}
          <div className="absolute top-8 left-8 z-10 opacity-30">
            <div className="w-12 h-12 border-t border-l border-[#C9A84C]" />
          </div>
          <div className="absolute top-8 right-8 z-10 opacity-30">
            <div className="w-12 h-12 border-t border-r border-[#C9A84C]" />
          </div>
          <div className="absolute bottom-8 left-8 z-10 opacity-30">
            <div className="w-12 h-12 border-b border-l border-[#C9A84C]" />
          </div>
          <div className="absolute bottom-8 right-8 z-10 opacity-30">
            <div className="w-12 h-12 border-b border-r border-[#C9A84C]" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.p
              className="text-[#C9A84C]/60 text-xs tracking-[0.5em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-poppins)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpened ? 1 : 0, y: isOpened ? 0 : 20 }}
              transition={{ delay: 0.5 }}
            >
              Pernikahan
            </motion.p>

            {/* Groom first */}
            <motion.h1
              className="text-5xl sm:text-7xl md:text-9xl text-white leading-none mb-4"
              style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isOpened ? 1 : 0, y: isOpened ? 0 : 30 }}
              transition={{ delay: 0.6 }}
            >
              {couple.groom.name}
            </motion.h1>

            <motion.div
              className="flex items-center gap-4 md:gap-6 justify-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpened ? 1 : 0 }}
              transition={{ delay: 0.75 }}
            >
              <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
              <span className="text-[#C9A84C] text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>&</span>
              <div className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
            </motion.div>

            {/* Bride */}
            <motion.h1
              className="text-5xl sm:text-7xl md:text-9xl text-white leading-none mb-8"
              style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isOpened ? 1 : 0, y: isOpened ? 0 : 30 }}
              transition={{ delay: 0.9 }}
            >
              {couple.bride.name}
            </motion.h1>

            <motion.p
              className="text-white/40 text-sm tracking-[0.3em]"
              style={{ fontFamily: 'var(--font-poppins)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpened ? 1 : 0 }}
              transition={{ delay: 1.1 }}
            >
              {new Date(couple.weddingDate).toLocaleDateString('id-ID', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })}
            </motion.p>
          </div>
        </section>

        {/* Ayat Alkitab pembuka */}
        <BibleVerseSection />

        {/* Semua section */}
        <CoupleSection couple={couple} />
        <StorySection story={couple.story} />
        <EventSection couple={couple} />
        <GallerySection gallery={gallery} />
        <RSVPSection invitationSlug={slug} guestName={guestName} />
        <WishesSection wishes={wishes} invitationSlug={slug} />
        <GiftSection gifts={gifts} />
        <ShareSection
          slug={slug}
          coupleName={`${couple.groom.name} & ${couple.bride.name}`}
          weddingDate={couple.weddingDate}
        />
        <Footer
          coupleName={`${couple.groom.name} & ${couple.bride.name}`}
          hashtag={couple.hashtag}
        />
      </motion.main>

      {/* Music player */}
      {isOpened && (
        <MusicPlayer src="/music.mp3" title="I Wanna Grow Old with You" artist="Westlife" />
      )}
    </>
  )
}
