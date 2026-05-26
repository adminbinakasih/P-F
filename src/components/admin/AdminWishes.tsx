'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, MessageSquare, RefreshCw } from 'lucide-react'

interface WishItem {
  id: string
  name: string
  message: string
  invitationSlug: string
  createdAt: string
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return 'baru saja'
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
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
      const data = await res.json()
      setWishes(data.data || [])
    } catch { /* silent */ }
    setLoading(false)
  }

  useEffect(() => { fetchWishes() }, [])

  const deleteWish = (id: string) => {
    setWishes((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
            Buku Tamu
          </h1>
          <p className="text-white/40 text-xs">{wishes.length} ucapan diterima</p>
        </div>
        <button onClick={fetchWishes} className="text-white/40 hover:text-[#C9A84C] transition-colors p-2" title="Refresh">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <RefreshCw size={24} className="text-[#C9A84C]/30 mx-auto mb-3 animate-spin" />
          <p className="text-white/30 text-xs">Memuat ucapan...</p>
        </div>
      ) : wishes.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare size={32} className="text-white/10 mx-auto mb-3" />
          <p className="text-white/30 text-sm">Belum ada ucapan masuk</p>
        </div>
      ) : (
        <div className="space-y-3">
          {wishes.map((wish, i) => (
            <motion.div key={wish.id}
              className="glass p-5 flex items-start gap-4 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}>
              <div className="w-9 h-9 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#C9A84C] text-xs">{wish.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-white/70 text-xs font-medium">{wish.name}</p>
                  <p className="text-white/20 text-[10px]">{timeAgo(wish.createdAt)}</p>
                </div>
                <p className="text-white/50 text-sm italic" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.95rem' }}>
                  "{wish.message}"
                </p>
              </div>
              <button onClick={() => deleteWish(wish.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400/40 hover:text-red-400/70 transition-all flex-shrink-0">
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
