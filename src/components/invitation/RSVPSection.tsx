'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2, Users, MessageSquare } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'

const rsvpSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  phone: z.string().optional(),
  attendance: z.enum(['hadir', 'tidak_hadir', 'mungkin']),
  guestCount: z.number().min(1).max(5),
  message: z.string().optional(),
})

type RSVPFormValues = z.infer<typeof rsvpSchema>

interface RSVPSectionProps {
  invitationSlug: string
  guestName?: string
}

export default function RSVPSection({ invitationSlug, guestName }: RSVPSectionProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: guestName && guestName !== 'Tamu Undangan' ? guestName : '',
      attendance: 'hadir',
      guestCount: 1,
    },
  })

  const attendance = watch('attendance')

  const onSubmit = async (data: RSVPFormValues) => {
    setIsLoading(true)
    try {
      await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, invitationSlug }) })
      setSubmitted(true)
    } catch { setSubmitted(true) }
    finally { setIsLoading(false) }
  }

  const attendanceOptions = [
    { value: 'hadir', label: 'Hadir', emoji: '✓' },
    { value: 'tidak_hadir', label: 'Tidak Hadir', emoji: '✗' },
    { value: 'mungkin', label: 'Mungkin', emoji: '?' },
  ]

  const inputClass = "w-full bg-white border-2 border-[#8A7560] focus:border-[#3D2E1E] text-[#1A1410] px-4 py-3 outline-none transition-colors text-sm placeholder:text-[#8A7560] font-medium"

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#D4CDB8' }}>
      <div className="container-luxury relative z-10">
        <SectionReveal className="text-center mb-16">
          <p className="text-[#1A1410] text-xs tracking-[0.5em] uppercase mb-4 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
            Konfirmasi Kehadiran
          </p>
          <h2 className="text-5xl md:text-6xl text-[#1A1410] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
            RSVP
          </h2>
          <GoldDivider />
          <p className="text-[#1A1410] text-sm mt-6 max-w-md mx-auto font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
            Kehadiran Anda adalah kehormatan terbesar bagi kami. Mohon konfirmasi kehadiran Anda.
          </p>
        </SectionReveal>

        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" className="text-center py-16" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                <div className="w-20 h-20 rounded-full border-2 border-[#CCC6B1] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-[#8A7560]" />
                </div>
                <h3 className="text-3xl text-[#2C2416] mb-4" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>Terima Kasih</h3>
                <p className="text-[#3D2E1E] text-sm" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Konfirmasi kehadiran Anda telah kami terima. Kami sangat menantikan kehadiran Anda.
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div>
                  <label className="block text-[#1A1410] text-xs tracking-[0.3em] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>Nama Lengkap</label>
                  <input {...register('name')} className={inputClass} style={{ fontFamily: 'var(--font-poppins)' }} placeholder="Nama lengkap Anda" />
                  {errors.name && <p className="text-red-700 text-xs mt-1 font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-[#1A1410] text-xs tracking-[0.3em] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
                    No. WhatsApp <span className="text-[#5A4535] normal-case tracking-normal font-normal">(opsional)</span>
                  </label>
                  <input {...register('phone')} className={inputClass} style={{ fontFamily: 'var(--font-poppins)' }} placeholder="08xx xxxx xxxx" />
                </div>

                <div>
                  <label className="block text-[#1A1410] text-xs tracking-[0.3em] uppercase mb-3 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>Konfirmasi Kehadiran</label>
                  <div className="grid grid-cols-3 gap-3">
                    {attendanceOptions.map((opt) => (
                      <label key={opt.value} className={`relative cursor-pointer flex flex-col items-center gap-2 py-4 border-2 transition-all duration-300 ${
                        attendance === opt.value ? 'border-[#3D2E1E] bg-white' : 'border-[#8A7560] bg-white/60 hover:border-[#3D2E1E]'
                      }`}>
                        <input type="radio" value={opt.value} {...register('attendance')} className="sr-only" />
                        <span className="text-lg">{opt.emoji}</span>
                        <span className={`text-xs tracking-wider font-bold ${attendance === opt.value ? 'text-[#1A1410]' : 'text-[#3D2E1E]'}`} style={{ fontFamily: 'var(--font-poppins)' }}>
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {attendance === 'hadir' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="block text-[#1A1410] text-xs tracking-[0.3em] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
                      <Users size={12} className="inline mr-2" />Jumlah Tamu
                    </label>
                    <select {...register('guestCount', { valueAsNumber: true })} className={inputClass} style={{ fontFamily: 'var(--font-poppins)' }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n} className="bg-white">{n} orang</option>
                      ))}
                    </select>
                  </motion.div>
                )}

                <div>
                  <label className="block text-[#1A1410] text-xs tracking-[0.3em] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
                    <MessageSquare size={12} className="inline mr-2" />
                    Pesan <span className="text-[#5A4535] normal-case tracking-normal font-normal">(opsional)</span>
                  </label>
                  <textarea {...register('message')} rows={3} className={`${inputClass} resize-none`} style={{ fontFamily: 'var(--font-poppins)' }} placeholder="Tulis pesan untuk kedua mempelai..." />
                </div>

                <button type="submit" disabled={isLoading} className="btn-luxury w-full flex items-center justify-center gap-3 disabled:opacity-50">
                  {isLoading && <Loader2 size={16} className="animate-spin" />}
                  {isLoading ? 'Mengirim...' : 'Konfirmasi Kehadiran'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
