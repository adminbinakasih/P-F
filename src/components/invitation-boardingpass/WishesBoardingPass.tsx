'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, User, Calendar } from 'lucide-react';
import { Wish } from '@/lib/types';

export default function WishesBoardingPass() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishes();
    // Refresh wishes every 30 seconds
    const interval = setInterval(fetchWishes, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchWishes = async () => {
    try {
      const response = await fetch('/api/wishes?slug=elianser-esra');
      const data = await response.json();
      if (data.success) {
        setWishes(data.wishes || []);
      }
    } catch (error) {
      console.error('Failed to fetch wishes:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <section className="relative py-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (wishes.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-6xl">💌</div>
        <div className="absolute top-40 right-20 text-5xl">❤️</div>
        <div className="absolute bottom-40 left-1/4 text-4xl">✨</div>
        <div className="absolute bottom-20 right-1/3 text-5xl">🎊</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-gold/10 rounded-full mb-4">
            <MessageSquare className="w-5 h-5 text-rose-gold" />
            <span className="text-sm font-medium text-rose-gold uppercase tracking-wider">Messages</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-3">Ucapan & Doa</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Terima kasih atas doa dan ucapan yang telah diberikan
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-500">
            <Heart className="w-4 h-4 text-rose-gold fill-rose-gold" />
            <span>{wishes.length} Ucapan</span>
          </div>
        </div>

        {/* Wishes Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {wishes.map((wish, index) => (
            <div
              key={wish.id || index}
              className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-rose-gold/10 to-gold/10 px-6 py-4 border-b border-slate-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center text-white font-bold shadow-lg">
                      {wish.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-600" />
                        <h3 className="font-bold text-slate-800">{wish.name}</h3>
                      </div>
                      {wish.createdAt && (
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <p className="text-xs text-slate-500">{formatDate(wish.createdAt)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Attendance Badge */}
                  {wish.attendance && (
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      wish.attendance === 'hadir' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {wish.attendance === 'hadir' ? '✓ Hadir' : 'Tidak Hadir'}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body - Message */}
              <div className="p-6">
                <div className="relative">
                  <MessageSquare className="absolute -top-2 -left-2 w-6 h-6 text-rose-gold/20" />
                  <p className="text-slate-700 leading-relaxed pl-6 italic">
                    "{wish.message}"
                  </p>
                </div>
              </div>

              {/* Card Footer - Decoration */}
              <div className="px-6 pb-4">
                <div className="flex items-center justify-center gap-2 text-rose-gold">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent"></div>
                  <Heart className="w-4 h-4 fill-rose-gold" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
