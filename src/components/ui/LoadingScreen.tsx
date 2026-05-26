'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  groomName?: string
  brideName?: string
}

export default function LoadingScreen({ groomName = 'Pieter', brideName = 'Febriyanti' }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(timer); setTimeout(() => setIsLoading(false), 700); return 100 }
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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#D4CDB8' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Rotating rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div className="w-[600px] h-[600px] rounded-full border-2 border-[#8A7560]/40"
              animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
            <motion.div className="absolute w-[400px] h-[400px] rounded-full border-2 border-[#8A7560]/50"
              animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
            <motion.div className="absolute w-[200px] h-[200px] rounded-full border-2 border-[#3D2E1E]/40"
              animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} />
          </div>

          <motion.div className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>

            {/* Monogram */}
            <motion.div
              className="w-24 h-24 rounded-full border-2 border-[#3D2E1E] bg-white flex items-center justify-center"
              animate={{ boxShadow: ['0 0 0 0 rgba(61,46,30,0)', '0 0 30px 8px rgba(61,46,30,0.2)', '0 0 0 0 rgba(61,46,30,0)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-3xl text-[#1A1410]" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 700 }}>
                {initials}
              </span>
            </motion.div>

            <div className="text-center">
              <motion.p className="text-[#1A1410] text-xs tracking-[0.5em] uppercase mb-3 font-bold"
                style={{ fontFamily: 'var(--font-poppins)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                Undangan Pernikahan
              </motion.p>
              <motion.h1 className="text-[#1A1410] text-3xl md:text-4xl"
                style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 600 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                {groomName} & {brideName}
              </motion.h1>
              <motion.p className="text-[#3D2E1E] text-xs tracking-[0.3em] mt-2 font-bold"
                style={{ fontFamily: 'var(--font-poppins)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                #PieterFebry2026
              </motion.p>
            </div>

            {/* Progress bar */}
            <div className="w-40 sm:w-56 h-1 bg-[#8A7560]/40 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#3D2E1E] rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <motion.p className="text-[#1A1410] text-xs tracking-widest -mt-4 font-bold"
              style={{ fontFamily: 'var(--font-poppins)' }}>
              {Math.round(Math.min(progress, 100))}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
