'use client'

import { motion } from 'framer-motion'
import { Plane, Heart } from 'lucide-react'
import CountdownTimer from '@/components/ui/CountdownTimer'
import type { Couple } from '@/lib/types'

interface HeroBoardingPassProps {
  couple: Couple
  guestName: string
  onOpen: () => void
}

export default function HeroBoardingPass({ couple, guestName, onOpen }: HeroBoardingPassProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20" style={{ background: 'linear-gradient(135deg, #F5EFE7 0%, #E8DED2 100%)' }}>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-9xl" style={{ fontFamily: 'var(--font-cormorant)' }}>✈</div>
        <div className="absolute bottom-20 right-10 text-9xl" style={{ fontFamily: 'var(--font-cormorant)' }}>✈</div>
      </div>

      {/* Boarding Pass Container */}
      <motion.div 
        className="relative max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Boarding Pass */}
        <div className="bg-white shadow-2xl overflow-hidden" style={{ 
          border: '3px solid #D4C5B9',
          borderRadius: '12px'
        }}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8B7355] to-[#6B5D52] text-white px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Plane size={24} className="rotate-45" />
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-bold">Wedding Flight</p>
                <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>WED-2026</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs tracking-wider uppercase">Destination</p>
              <p className="text-lg font-bold">{couple.venue.city}</p>
            </div>
          </div>

          {/* Perforation Line */}
          <div className="relative h-6 bg-gradient-to-r from-[#F5EFE7] to-[#E8DED2]">
            <div className="absolute inset-0 flex items-center justify-between px-4">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-[#8B7355]/30" />
              ))}
            </div>
            {/* Circle cutouts */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F5EFE7]" style={{ boxShadow: 'inset 0 0 0 3px #D4C5B9' }} />
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F5EFE7]" style={{ boxShadow: 'inset 0 0 0 3px #D4C5B9' }} />
          </div>

          {/* Body */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              
              {/* Left Side - Guest Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-[#8B7355] tracking-[0.3em] uppercase mb-2 font-bold">Passenger Name</p>
                  <p className="text-3xl md:text-4xl text-[#2C2416] font-bold" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
                    {guestName && guestName !== 'Tamu Undangan' ? guestName : 'Guest Invitation'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#8B7355] tracking-wider uppercase mb-1">Flight No.</p>
                    <p className="text-xl font-bold text-[#2C2416]">ES-1212</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8B7355] tracking-wider uppercase mb-1">Gate</p>
                    <p className="text-xl font-bold text-[#2C2416]">A1</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#8B7355] tracking-wider uppercase mb-1">Seat</p>
                    <p className="text-xl font-bold text-[#2C2416]">VIP</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8B7355] tracking-wider uppercase mb-1">Class</p>
                    <p className="text-xl font-bold text-[#2C2416]">First</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Couple Names */}
              <div className="flex flex-col justify-center items-center text-center">
                <Heart size={32} className="text-[#B76E79] mb-4" fill="#B76E79" />
                <p className="text-xs text-[#8B7355] tracking-[0.3em] uppercase mb-3">Wedding of</p>
                <h1 className="text-2xl md:text-3xl text-[#2C2416] leading-tight mb-2 px-4" style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600 }}>
                  {couple.groom.fullName}
                </h1>
                <div className="flex items-center gap-3 my-3">
                  <div className="h-px w-8 bg-[#8B7355]" />
                  <span className="text-2xl text-[#8B7355]" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>&</span>
                  <div className="h-px w-8 bg-[#8B7355]" />
                </div>
                <h1 className="text-2xl md:text-3xl text-[#2C2416] leading-tight px-4" style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600 }}>
                  {couple.bride.fullName}
                </h1>
              </div>
            </div>

            {/* Flight Schedule */}
            <div className="border-t-2 border-dashed border-[#D4C5B9] pt-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-xs text-[#8B7355] tracking-wider uppercase mb-2">Departure</p>
                  <p className="text-2xl font-bold text-[#2C2416]" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
                    {new Date(couple.weddingDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </p>
                  <p className="text-sm text-[#5A4A42]">{couple.venue.time.split(' - ')[0]}</p>
                </div>
                <div className="flex items-center justify-center">
                  <Plane size={28} className="text-[#8B7355]" />
                </div>
                <div>
                  <p className="text-xs text-[#8B7355] tracking-wider uppercase mb-2">Arrival</p>
                  <p className="text-2xl font-bold text-[#2C2416]" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
                    Forever
                  </p>
                  <p className="text-sm text-[#5A4A42]">Together</p>
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="mb-8">
              <CountdownTimer targetDate={`${couple.weddingDate}T${couple.weddingTime}:00`} />
            </div>

            {/* Open Button */}
            <div className="text-center">
              <motion.button
                onClick={onOpen}
                className="bg-gradient-to-r from-[#8B7355] to-[#6B5D52] text-white px-12 py-4 text-sm tracking-[0.2em] uppercase font-bold shadow-lg hover:shadow-xl transition-all"
                style={{ fontFamily: 'var(--font-poppins)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ✈ Board Now
              </motion.button>
            </div>
          </div>

          {/* Barcode Footer */}
          <div className="bg-[#F5EFE7] px-8 py-6 border-t-2 border-dashed border-[#D4C5B9]">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex gap-1 mb-2">
                  {[...Array(60)].map((_, i) => (
                    <div key={i} className={`w-1 bg-[#2C2416] ${i % 3 === 0 ? 'h-12' : i % 2 === 0 ? 'h-8' : 'h-10'}`} />
                  ))}
                </div>
                <p className="text-xs text-[#5A4A42] tracking-[0.5em] font-mono">ES{couple.weddingDate.replace(/-/g, '')}2026</p>
              </div>
              <div className="text-right ml-8">
                <p className="text-xs text-[#8B7355] tracking-wider uppercase">Booking Code</p>
                <p className="text-lg font-bold text-[#2C2416]" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
                  {couple.hashtag.replace('#', '')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shadow ticket stub */}
        <div className="absolute -right-2 -bottom-2 w-full h-full bg-[#D4C5B9] -z-10" style={{ borderRadius: '12px' }} />
      </motion.div>

      {/* Bottom Note */}
      <motion.p 
        className="mt-8 text-sm text-[#5A4A42] text-center max-w-md"
        style={{ fontFamily: 'var(--font-poppins)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Please keep this boarding pass for the duration of the journey to eternal happiness
      </motion.p>
    </section>
  )
}
