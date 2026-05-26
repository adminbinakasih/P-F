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
    <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3 sm:gap-5">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
          >
            {/* Kotak angka — latar gelap agar angka putih terbaca */}
            <div
              className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center rounded-sm relative"
              style={{
                background: 'rgba(26, 16, 8, 0.55)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(204,198,177,0.6)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#CCC6B1]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#CCC6B1]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#CCC6B1]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#CCC6B1]" />

              <motion.span
                key={unit.value}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: '#E8D5A3',
                  textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {pad(unit.value)}
              </motion.span>
            </div>

            {/* Label */}
            <span
              className="text-[10px] sm:text-xs tracking-[0.25em] uppercase mt-2 font-medium"
              style={{
                fontFamily: 'var(--font-poppins)',
                color: '#E8D5A3',
                textShadow: '0 1px 6px rgba(0,0,0,0.8)',
              }}
            >
              {unit.label}
            </span>
          </motion.div>

          {i < units.length - 1 && (
            <span
              className="text-2xl md:text-3xl mb-5 font-light"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: '#CCC6B1',
                textShadow: '0 1px 6px rgba(0,0,0,0.6)',
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
