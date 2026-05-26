import { Heart, MessageCircle } from 'lucide-react'

const WA_NUMBER = '6283197679315'

interface FooterProps {
  coupleName: string
  hashtag: string
}

export default function Footer({ coupleName, hashtag }: FooterProps) {
  const waMessage = `Halo, saya ingin mengkonfirmasi kehadiran saya di pernikahan ${coupleName}. 🙏`
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`

  return (
    <footer className="py-12 md:py-20 border-t border-[#CCC6B1]/20" style={{ background: '#F5F0E8' }}>
      <div className="container-luxury text-center">

        {/* Ayat Alkitab */}
        <div className="max-w-2xl mx-auto mb-12">
          <p
            className="text-[#CCC6B1]/40 text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            ✦ Firman Tuhan ✦
          </p>
          <blockquote
            className="text-[#2C2416]/60 text-xl md:text-2xl leading-relaxed italic mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
          >
            "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Ia tidak melakukan yang tidak sopan dan tidak mencari keuntungan diri sendiri. Ia tidak pemarah dan tidak menyimpan kesalahan orang lain."
          </blockquote>
          <p
            className="text-[#CCC6B1]/50 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            1 Korintus 13 : 4–5
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#CCC6B1]/15 to-transparent mb-12" />

        {/* Couple name */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#CCC6B1]/20" />
          <Heart size={12} className="text-[#B76E79]" fill="#B76E79" />
          <div className="h-px w-12 bg-[#CCC6B1]/20" />
        </div>

        <p
          className="text-3xl text-[#2C2416]/80 mb-2"
          style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300 }}
        >
          {coupleName}
        </p>

        <p
          className="text-[#CCC6B1]/50 text-xs tracking-[0.4em] uppercase mb-10"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {hashtag}
        </p>

        {/* Penutup */}
        <p
          className="text-[#2C2416]/30 text-sm mb-2"
          style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami
        </p>
        <p
          className="text-[#2C2416]/30 text-sm mb-8"
          style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
        >
          apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>

        {/* Tombol WhatsApp */}
        <div className="mb-10">
          <p
            className="text-[#2C2416]/30 text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Hubungi Kami
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366]/80 hover:text-[#25D366] hover:bg-[#25D366]/20 transition-all text-xs tracking-wider uppercase"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            <MessageCircle size={14} />
            +62 831-9767-9315
          </a>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#CCC6B1]/10 to-transparent mb-8" />

        <p
          className="text-[#2C2416]/20 text-xs"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Dibuat oleh{' '}
          <span className="text-[#CCC6B1]/40">Developer BKN</span>
        </p>
      </div>
    </footer>
  )
}
