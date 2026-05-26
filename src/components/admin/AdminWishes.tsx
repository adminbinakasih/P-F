'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, RefreshCw, Heart } from 'lucide-react'

interface WishItem {
  id: string; name: string; message: string; invitationSlug: string; createdAt: string
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return 'baru saja'
  if (diff < 3600) return `${Math.floor(diff / 60)} mnt lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
  return `${Math.floor(diff / 86400)} hari lalu`
}

export default function AdminWishes() {
  const [wishes, setWishes] = useState<WishItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchWishes = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/wishes')
      setWishes((await res.json()).data || [])
    } catch { /* silent */ }
    setLoading(false)
  }

  useEffect(() => { fetchWishes() }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#1A1410] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>
            Buku Tamu
          </h1>
          <p className="text-[#6B5040] text-xs font-medium">{wishes.length} ucapan diterima</p>
        </div>
        <button onClick={fetchWishes} className="text-[#8A7560] hover:text-[#3D2E1E] transition-colors p-2">
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <RefreshCw size={24} className="text-[#8A7560] mx-auto mb-3 animate-spin" />
          <p className="text-[#8A7560] text-xs font-medium">Memuat ucapan...</p>
        </div>
      ) : wishes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-sm border border-[#CCC6B1]/40">
          <MessageSquare size={32} className="text-[#CCC6B1] mx-auto mb-3" />
          <p className="text-[#8A7560] text-sm font-medium">Belum ada ucapan masuk</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishes.map((wish, i) => (
            <motion.div key={wish.id}
              className="bg-white rounded-sm p-5 border border-[#CCC6B1]/40 relative"
              style={{ boxShadow: '0 2px 12px rgba(26,16,8,0.06)' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#8A7560]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#8A7560]" />

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4CDB8] border-2 border-[#8A7560] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1A1410] text-sm font-bold">{wish.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#1A1410] text-sm font-bold">{wish.name}</p>
                    <p className="text-[#8A7560] text-[10px] font-medium">{timeAgo(wish.createdAt)}</p>
                  </div>
                  <p className="text-[#3D2E1E] leading-relaxed font-medium"
                    style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1rem' }}>
                    "{wish.message}"
                  </p>
                </div>
              </div>
              <Heart size={10} className="absolute bottom-3 right-4 text-[#B76E79]" fill="#B76E79" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
