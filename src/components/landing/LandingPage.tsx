'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Star, Check, Heart } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'

const DEMO_SLUG = 'pieter-febriyanti'

const features = [
  { icon: '✦', title: 'Desain Sinematik', desc: 'Tampilan mewah berkelas Apple dengan estetika premium yang memukau setiap tamu undangan.' },
  { icon: '✦', title: 'URL Personal', desc: 'Setiap tamu mendapat link undangan unik dengan nama mereka sendiri yang tertera indah.' },
  { icon: '✦', title: 'Sistem RSVP', desc: 'Form konfirmasi kehadiran elegan dengan pelacakan tamu dan statistik secara real-time.' },
  { icon: '✦', title: 'Kisah Cinta', desc: 'Ceritakan perjalanan cinta Anda dengan timeline interaktif yang penuh animasi.' },
  { icon: '✦', title: 'Galeri Foto', desc: 'Galeri masonry sinematik dengan lightbox dan transisi foto yang halus.' },
  { icon: '✦', title: 'Buku Tamu', desc: 'Ucapan & doa real-time dengan tampilan kartu elegan dan infinite scroll.' },
  { icon: '✦', title: 'Amplop Digital', desc: 'Transfer bank, dompet digital, dan QRIS dengan tombol salin satu klik.' },
  { icon: '✦', title: 'Pemutar Musik', desc: 'Pemutar musik ambient mengambang dengan kontrol halus dan auto-play.' },
  { icon: '✦', title: 'Dashboard Admin', desc: 'Panel admin berkualitas SaaS premium dengan analitik lengkap dan manajemen tamu.' },
]

const plans = [
  {
    name: 'Classic',
    price: 'Rp 299K',
    period: 'sekali bayar',
    features: ['1 Undangan', 'Template Dasar', 'Sistem RSVP', 'Buku Tamu', 'Aktif 30 Hari'],
    cta: 'Mulai Sekarang',
    highlight: false,
  },
  {
    name: 'Premium',
    price: 'Rp 599K',
    period: 'sekali bayar',
    features: ['1 Undangan', 'Semua Template', 'RSVP + Analitik', 'Upload Galeri', 'Pemutar Musik', 'Amplop Digital', 'Aktif 90 Hari'],
    cta: 'Paling Populer',
    highlight: true,
  },
  {
    name: 'Eternal',
    price: 'Rp 999K',
    period: 'sekali bayar',
    features: ['Undangan Tak Terbatas', 'Domain Kustom', 'Prioritas Support', 'Dashboard Admin', 'Export Data', 'Aktif Selamanya'],
    cta: 'Pilih Eternal',
    highlight: false,
  },
]

const testimonials = [
  { name: 'Rizky & Indah', text: 'Undangan digitalnya luar biasa! Semua tamu terpesona dengan tampilannya. Sangat elegan dan mudah digunakan.', date: 'Oktober 2025' },
  { name: 'Budi & Sari', text: 'Fitur RSVP-nya sangat membantu kami mengelola tamu. Desainnya mewah sekali, persis seperti undangan fisik premium.', date: 'September 2025' },
  { name: 'Andi & Dewi', text: 'Terbaik! Tamu-tamu kami sangat terkesan. Countdown timer dan galeri fotonya membuat undangan terasa hidup.', date: 'Agustus 2025' },
]

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="bg-[#F5F0E8] min-h-screen">

      {/* ── NAVIGASI ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container-luxury flex items-center justify-between h-16">
          <span className="text-2xl text-gradient-gold" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
            Eternal Vows
          </span>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Fitur', anchor: 'features' },
              { label: 'Demo', anchor: 'demo' },
              { label: 'Harga', anchor: 'pricing' },
            ].map((item) => (
              <a key={item.anchor} href={`#${item.anchor}`}
                className="text-[#2C2416]/50 hover:text-[#CCC6B1] transition-colors text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-poppins)' }}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin"
              className="text-[#2C2416]/40 hover:text-[#2C2416]/70 transition-colors text-xs tracking-wider uppercase hidden md:block"
              style={{ fontFamily: 'var(--font-poppins)' }}>
              Admin
            </Link>
            <Link href={`/invite/${DEMO_SLUG}`} className="btn-luxury text-xs py-2 px-5">
              Lihat Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=80)' }} />
          <div className="absolute inset-0 bg-[#F5F0E8]/60" />
          <div className="absolute inset-0 gradient-hero" />
        </motion.div>

        {/* Rotating rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div className="w-[800px] h-[800px] rounded-full border border-[#CCC6B1]/15"
            animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute w-[550px] h-[550px] rounded-full border border-[#CCC6B1]/10"
            animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
        </div>

        <motion.div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ opacity: heroOpacity }}>
          <motion.div className="inline-flex items-center gap-2 glass px-4 py-2 mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Sparkles size={12} className="text-[#CCC6B1]" />
            <span className="text-[#2C2416]/70 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-poppins)' }}>
              Platform Undangan Pernikahan Digital Premium
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-[7rem] text-[#2C2416] leading-none mb-6"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            Kisah Cinta Anda,
            <br />
            <span className="text-gradient-gold">Diceritakan Indah</span>
          </motion.h1>

          <motion.p
            className="text-[#2C2416]/55 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: 'var(--font-poppins)', fontWeight: 300 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Buat undangan pernikahan digital yang terasa seperti pengalaman jutaan rupiah.
            Sinematik, elegan, dan tak terlupakan.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <Link href={`/invite/${DEMO_SLUG}`} className="btn-luxury inline-flex items-center gap-3">
              Lihat Demo Langsung
              <ArrowRight size={14} />
            </Link>
            <a href="#pricing" className="btn-outline-luxury">
              Lihat Harga
            </a>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <motion.div className="w-px h-12 bg-gradient-to-b from-[#CCC6B1]/60 to-transparent mx-auto"
            animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
      </section>

      {/* ── FITUR ── */}
      <section id="features" className="section-padding" style={{ background: '#EDE8DC' }}>
        <div className="container-luxury">
          <SectionReveal className="text-center mb-16">
            <p className="text-[#CCC6B1]/70 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Semua yang Anda Butuhkan
            </p>
            <h2 className="text-5xl md:text-6xl text-[#2C2416] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
              Fitur Premium
            </h2>
            <GoldDivider />
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="glass p-6 group hover-lift relative h-full">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#CCC6B1]/30 group-hover:border-[#CCC6B1]/60 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#CCC6B1]/30 group-hover:border-[#CCC6B1]/60 transition-colors" />
                  <span className="text-[#CCC6B1]/60 text-xl block mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    {feature.icon}
                  </span>
                  <h3 className="text-[#2C2416]/90 text-lg mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
                    {feature.title}
                  </h3>
                  <p className="text-[#2C2416]/50 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {feature.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO PREVIEW ── */}
      <section id="demo" className="section-padding" style={{ background: '#F5F0E8' }}>
        <div className="container-luxury">
          <SectionReveal className="text-center mb-16">
            <p className="text-[#CCC6B1]/70 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Lihat Langsung
            </p>
            <h2 className="text-5xl md:text-6xl text-[#2C2416] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
              Contoh Undangan
            </h2>
            <GoldDivider />
            <p className="text-[#2C2416]/40 text-sm mt-6 max-w-lg mx-auto" style={{ fontFamily: 'var(--font-poppins)' }}>
              Undangan pernikahan Pieter & Febriyanti — dibuat dengan Developer SMA Unggul Bina Kasih Nusantara
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="relative max-w-4xl mx-auto group">
              {/* Browser mockup */}
              <div className="glass rounded-sm overflow-hidden luxury-shadow">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#CCC6B1]/20">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                    <div className="w-3 h-3 rounded-full bg-green-400/50" />
                  </div>
                  <div className="flex-1 mx-4 bg-[#2C2416]/5 rounded-sm px-3 py-1">
                    <p className="text-[#2C2416]/40 text-xs" style={{ fontFamily: 'var(--font-poppins)' }}>
                      undanganpiter.vercel.app/invite/pieter-febriyanti
                    </p>
                  </div>
                </div>
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80)' }} />
                  <div className="absolute inset-0 bg-[#F5F0E8]/50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <p className="text-[#CCC6B1]/80 text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                      Pernikahan
                    </p>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl text-[#2C2416] mb-2"
                      style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
                      Pieter
                    </h3>
                    <span className="text-[#CCC6B1] text-3xl mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>&</span>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl text-[#2C2416] mb-4"
                      style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
                      Febriyanti
                    </h3>
                    <p className="text-[#CCC6B1]/70 text-sm tracking-widest" style={{ fontFamily: 'var(--font-poppins)' }}>
                      22 November 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <Link href={`/invite/${DEMO_SLUG}`} className="btn-luxury inline-flex items-center gap-3">
                  Buka Undangan Demo
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </SectionReveal>

          {/* Personalized URL demo */}
          <SectionReveal className="mt-12 text-center" delay={0.2}>
            <p className="text-[#2C2416]/30 text-xs mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Setiap tamu mendapat link personal — coba klik:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['budi-santoso', 'dewi-rahayu', 'ahmad-fauzi'].map((name) => (
                <Link key={name} href={`/invite/${name}`}
                  className="glass px-4 py-2 text-xs text-[#CCC6B1]/70 hover:text-[#CCC6B1] transition-colors border border-[#CCC6B1]/20 hover:border-[#CCC6B1]/50"
                  style={{ fontFamily: 'var(--font-poppins)' }}>
                  /invite/{name}
                </Link>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="section-padding" style={{ background: '#EAE4D5' }}>
        <div className="container-luxury">
          <SectionReveal className="text-center mb-16">
            <p className="text-[#CCC6B1]/70 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Kata Mereka
            </p>
            <h2 className="text-5xl md:text-6xl text-[#2C2416] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
              Testimoni
            </h2>
            <GoldDivider />
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="glass p-6 relative hover-lift h-full flex flex-col">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#CCC6B1]/20" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#CCC6B1]/20" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={10} className="text-[#CCC6B1]" fill="#CCC6B1" />
                    ))}
                  </div>
                  <p className="text-[#2C2416]/60 text-sm leading-relaxed flex-1 mb-4 italic"
                    style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem' }}>
                    "{t.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-[#2C2416]/80 text-xs font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
                      {t.name}
                    </p>
                    <p className="text-[#2C2416]/30 text-xs" style={{ fontFamily: 'var(--font-poppins)' }}>
                      {t.date}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HARGA ── */}
      <section id="pricing" className="section-padding" style={{ background: '#F0EBE0' }}>
        <div className="container-luxury">
          <SectionReveal className="text-center mb-16">
            <p className="text-[#CCC6B1]/70 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Sederhana & Transparan
            </p>
            <h2 className="text-5xl md:text-6xl text-[#2C2416] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
              Harga
            </h2>
            <GoldDivider />
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className={`relative p-8 hover-lift h-full flex flex-col ${plan.highlight ? 'border border-[#CCC6B1]/50 bg-[#CCC6B1]/10' : 'glass'}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#CCC6B1] px-4 py-1">
                      <span className="text-[#2C2416] text-xs tracking-[0.2em] uppercase font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
                        Terpopuler
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl text-[#2C2416] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl text-gradient-gold" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600 }}>
                      {plan.price}
                    </span>
                    <span className="text-[#2C2416]/40 text-xs" style={{ fontFamily: 'var(--font-poppins)' }}>
                      /{plan.period}
                    </span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#CCC6B1]/30 to-transparent mb-6" />
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <Check size={12} className="text-[#CCC6B1] flex-shrink-0" />
                        <span className="text-[#2C2416]/60 text-sm" style={{ fontFamily: 'var(--font-poppins)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={plan.highlight ? 'btn-luxury w-full' : 'btn-outline-luxury w-full'}>
                    {plan.cta}
                  </button>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA AKHIR ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #EDE8DC 0%, #E5DFD0 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(204,198,177,0.15) 0%, transparent 70%)' }} />
        <div className="container-luxury relative z-10 text-center">
          <SectionReveal>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#CCC6B1]/30" />
              <Heart size={12} className="text-[#B76E79]" fill="#B76E79" />
              <div className="h-px w-12 bg-[#CCC6B1]/30" />
            </div>
            <p className="text-[#CCC6B1]/70 text-xs tracking-[0.5em] uppercase mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
              Mulai Kisah Anda
            </p>
            <h2 className="text-5xl md:text-7xl text-[#2C2416] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
              Siap Membuat
              <br />
              <span className="text-gradient-gold">Undangan Anda?</span>
            </h2>
            <p className="text-[#2C2416]/45 text-sm max-w-md mx-auto mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              Bergabunglah dengan ribuan pasangan yang telah mempercayakan kisah cinta mereka kepada Developer SMA Unggul Bina Kasih Nusantara.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/invite/${DEMO_SLUG}`} className="btn-luxury inline-flex items-center gap-3">
                <Star size={14} />
                Lihat Demo
              </Link>
              <Link href="/admin" className="btn-outline-luxury">
                Dashboard Admin
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-[#CCC6B1]/20" style={{ background: '#F5F0E8' }}>
        <div className="container-luxury text-center">
          <p className="text-3xl text-[#2C2416]/60 mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}>
            Developer SMA Unggul Bina Kasih Nusantara
          </p>
          <p className="text-[#CCC6B1]/50 text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
            Platform Undangan Pernikahan Digital Premium
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-[#CCC6B1]/20 to-transparent mb-6" />
          <p className="text-[#2C2416]/25 text-xs" style={{ fontFamily: 'var(--font-poppins)' }}>
            © 2026 Developer SMA Unggul Bina Kasih Nusantara. Dibuat dengan penuh cinta.
          </p>
        </div>
      </footer>
    </div>
  )
}
