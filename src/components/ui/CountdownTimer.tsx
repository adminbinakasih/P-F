'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: string
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculate = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const diff = target - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (!mounted) return null

  const units = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ]

  return (
    <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-wrap justify-center">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
          >
            <div className="relative">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-sm"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(204,198,177,0.5)',
                }}
              >
                <motion.span
                  key={unit.value}
                  className="text-xl sm:text-2xl md:text-3xl text-white"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 600,
                    textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {pad(unit.value)}
                </motion.span>
              </div>
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#CCC6B1]/70" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#CCC6B1]/70" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#CCC6B1]/70" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#CCC6B1]/70" />
            </div>
            <span
              className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-white/80 uppercase mt-2"
              style={{ fontFamily: 'var(--font-poppins)', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
            >
              {unit.label}
            </span>
          </motion.div>

          {i < units.length - 1 && (
            <span
              className="text-white/60 text-xl md:text-2xl mb-4"
              style={{ fontFamily: 'var(--font-cormorant)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
