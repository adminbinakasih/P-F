'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  groomName?: string
  brideName?: string
}

export default function LoadingScreen({
  groomName = 'Pieter',
  brideName = 'Febriyanti',
}: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 700)
          return 100
        }
        return Math.min(prev + Math.random() * 12 + 3, 100)
      })
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const initials = `${groomName[0]}${brideName[0]}`

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Rotating rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[600px] h-[600px] rounded-full border border-[#CCC6B1]/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full border border-[#CCC6B1]/8"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[200px] h-[200px] rounded-full border border-[#CCC6B1]/12"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Monogram */}
            <motion.div
              className="w-24 h-24 rounded-full border border-[#CCC6B1]/30 flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(201,168,76,0)',
                  '0 0 40px 10px rgba(201,168,76,0.12)',
                  '0 0 0 0 rgba(201,168,76,0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span
                className="text-3xl text-gradient-gold"
                style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
              >
                {initials}
              </span>
            </motion.div>

            {/* Names */}
            <div className="text-center">
              <motion.p
                className="text-[#CCC6B1]/50 text-xs tracking-[0.5em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-poppins)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Undangan Pernikahan
              </motion.p>
              <motion.h1
                className="text-white/90 text-3xl md:text-4xl"
                style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {groomName} & {brideName}
              </motion.h1>
              <motion.p
                className="text-[#CCC6B1]/40 text-xs tracking-[0.3em] mt-2"
                style={{ fontFamily: 'var(--font-poppins)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                #PieterFebry2026
              </motion.p>
            </div>

            {/* Progress bar */}
            <div className="w-40 sm:w-56 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#CCC6B1] to-[#E8D5A3]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <motion.p
              className="text-white/20 text-xs tracking-widest -mt-4"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {Math.round(Math.min(progress, 100))}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
