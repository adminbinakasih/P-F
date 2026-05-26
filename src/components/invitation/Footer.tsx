import { Heart } from 'lucide-react'

interface FooterProps {
  coupleName: string
  hashtag: string
}

export default function Footer({ coupleName, hashtag }: FooterProps) {
  return (
    <footer className="py-12 md:py-20 bg-[#0A0A0A] border-t border-white/5">
      <div className="container-luxury text-center">

        {/* Ayat Alkitab */}
        <div className="max-w-2xl mx-auto mb-12">
          <p
            className="text-[#C9A84C]/40 text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            ✦ Firman Tuhan ✦
          </p>
          <blockquote
            className="text-white/60 text-xl md:text-2xl leading-relaxed italic mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
          >
            "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Ia tidak melakukan yang tidak sopan dan tidak mencari keuntungan diri sendiri. Ia tidak pemarah dan tidak menyimpan kesalahan orang lain."
          </blockquote>
          <p
            className="text-[#C9A84C]/50 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            1 Korintus 13 : 4–5
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/15 to-transparent mb-12" />

        {/* Couple name */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#C9A84C]/20" />
          <Heart size={12} className="text-[#B76E79]" fill="#B76E79" />
          <div className="h-px w-12 bg-[#C9A84C]/20" />
        </div>

        <p
          className="text-3xl text-white/80 mb-2"
          style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
        >
          {coupleName}
        </p>

        <p
          className="text-[#C9A84C]/50 text-xs tracking-[0.4em] uppercase mb-10"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {hashtag}
        </p>

        {/* Penutup */}
        <p
          className="text-white/30 text-sm mb-2"
          style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami
        </p>
        <p
          className="text-white/30 text-sm mb-8"
          style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
        >
          apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/10 to-transparent mb-8" />

        <p
          className="text-white/20 text-xs"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Dibuat oleh{' '}
          <span className="text-[#C9A84C]/40">Developer BKN</span>
        </p>
      </div>
    </footer>
  )
}
