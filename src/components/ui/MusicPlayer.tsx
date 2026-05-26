'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Music2, Volume2, VolumeX } from 'lucide-react'

interface MusicPlayerProps {
  src?: string
  title?: string
  artist?: string
}

export default function MusicPlayer({
  src,
  title = 'Perfect',
  artist = 'Ed Sheeran',
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    audio.addEventListener('timeupdate', updateProgress)
    return () => audio.removeEventListener('timeupdate', updateProgress)
  }, [])

  // Autoplay saat komponen mount (setelah user klik "Buka Undangan")
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !src) return

    // Mulai dengan volume 0, fade in perlahan
    audio.volume = 0
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          setIsExpanded(true)
          // Fade in volume selama 2 detik
          let vol = 0
          const fadeIn = setInterval(() => {
            vol = Math.min(vol + 0.05, 0.8)
            audio.volume = vol
            if (vol >= 0.8) clearInterval(fadeIn)
          }, 100)
          // Tutup expanded setelah 3 detik
          setTimeout(() => setIsExpanded(false), 3000)
        })
        .catch(() => {
          // Browser blokir autoplay — biarkan user klik manual
        })
    }
  }, [src])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-[calc(1.5rem+env(safe-area-inset-left,0px))] z-50">
      {src && <audio ref={audioRef} src={src} loop preload="auto" />}

      <motion.div
        className="glass-dark rounded-full overflow-hidden"
        animate={{ width: isExpanded ? 220 : 52, height: 52 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex items-center h-full px-3 gap-3">
          {/* Play button */}
          <motion.button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0 hover:bg-[#C9A84C]/30 transition-colors"
            whileTap={{ scale: 0.9 }}
            onHoverStart={() => setIsExpanded(true)}
          >
            {isPlaying ? (
              <Pause size={12} className="text-[#C9A84C]" />
            ) : (
              <Play size={12} className="text-[#C9A84C] ml-0.5" />
            )}
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="flex items-center gap-2 flex-1 min-w-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onMouseLeave={() => !isPlaying && setIsExpanded(false)}
              >
                {/* Song info */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-white/80 text-xs truncate"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-[#C9A84C]/60 text-[10px] truncate"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {artist}
                  </p>
                </div>

                {/* Mute button */}
                <button
                  onClick={toggleMute}
                  className="flex-shrink-0 text-white/40 hover:text-[#C9A84C] transition-colors"
                >
                  {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
            <div
              className="h-full bg-[#C9A84C]"
              style={{ width: `${progress}%`, transition: 'width 1s linear' }}
            />
          </div>
        )}
      </motion.div>

      {/* Equalizer animation when playing */}
      {isPlaying && !isExpanded && (
        <div className="absolute -top-1 -right-1 flex items-end gap-0.5 h-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-[#C9A84C] rounded-full"
              animate={{ height: ['4px', '12px', '6px', '14px', '4px'] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
