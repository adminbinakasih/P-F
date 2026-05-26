'use client'

import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  rotation: number
  color: string
}

const PETAL_COLORS = [
  'rgba(201, 168, 76, 0.6)',
  'rgba(232, 213, 163, 0.5)',
  'rgba(183, 110, 121, 0.4)',
  'rgba(212, 160, 168, 0.4)',
  'rgba(247, 231, 206, 0.5)',
]

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 12 + 6,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 20,
      rotation: Math.random() * 360,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }))
    setPetals(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute bottom-0"
          style={{
            left: `${petal.left}%`,
            animation: `float-up ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        >
          {/* Petal shape using CSS */}
          <div
            style={{
              width: petal.size,
              height: petal.size * 1.5,
              backgroundColor: petal.color,
              borderRadius: '50% 0 50% 0',
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'blur(0.5px)',
            }}
          />
        </div>
      ))}
    </div>
  )
}
