import { Heart, MessageCircle } from 'lucide-react'

const WA_NUMBER = '6283197679315'

interface FooterProps { coupleName: string; hashtag: string }

export default function Footer({ coupleName, hashtag }: FooterProps) {
  const waMessage = `Halo, saya ingin mengkonfirmasi kehadiran saya di pernikahan ${coupleName}. 🙏`
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`

  return (
    <footer className="py-12 md:py-20 border-t-2 border-[#8A7560]" style={{ background: '#D4CDB8' }}>
      <div className="container-luxury text-center">

        {/* Ayat Alkitab */}
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-[#1A1410] text-xs tracking-[0.4em] uppercase mb-6 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
            ✦ Firman Tuhan ✦
          </p>
          <blockquote className="text-[#1A1410] text-xl md:text-2xl leading-relaxed italic mb-4" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 500 }}>
            "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Ia tidak melakukan yang tidak sopan dan tidak mencari keuntungan diri sendiri. Ia tidak pemarah dan tidak menyimpan kesalahan orang lain."
          </blockquote>
          <p className="text-[#1A1410] text-xs tracking-[0.3em] uppercase font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
            1 Korintus 13 : 4–5
          </p>
        </div>

        <div className="h-0.5 bg-[#8A7560] mb-12 max-w-xs mx-auto" />

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-0.5 w-12 bg-[#3D2E1E]" />
          <Heart size={14} className="text-[#B76E79]" fill="#B76E79" />
          <div className="h-0.5 w-12 bg-[#3D2E1E]" />
        </div>

        <p className="text-3xl text-[#1A1410] mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 500 }}>
          {coupleName}
        </p>
        <p className="text-[#1A1410] text-xs tracking-[0.4em] uppercase mb-10 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
          {hashtag}
        </p>

        <p className="text-[#1A1410] text-sm mb-2 font-medium" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami
        </p>
        <p className="text-[#1A1410] text-sm mb-8 font-medium" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
          apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>

        {/* Tombol WhatsApp */}
        <div className="mb-10">
          <p className="text-[#1A1410] text-xs tracking-[0.3em] uppercase mb-4 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
            Hubungi Kami
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 bg-[#25D366] text-white hover:bg-[#1da851] transition-all text-xs tracking-wider uppercase font-bold"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            <MessageCircle size={14} />
            +62 831-9767-9315
          </a>
        </div>

        <div className="h-0.5 bg-[#8A7560] mb-8 max-w-xs mx-auto" />

        <p className="text-[#1A1410] text-xs font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
          Dibuat oleh <span className="font-bold">Developer BKN</span>
        </p>
      </div>
    </footer>
  )
}
