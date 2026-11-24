'use client';

import React from 'react';
import { Heart, MessageCircle, Mail } from 'lucide-react';
import BarcodePattern from './BarcodePattern';

export default function FooterBoardingPass() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-slate-800 to-slate-900 text-white py-16 px-4 overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">✈️</div>
        <div className="absolute top-20 right-20 text-5xl">🎫</div>
        <div className="absolute bottom-10 left-1/4 text-4xl">❤️</div>
        <div className="absolute bottom-20 right-1/3 text-5xl">🌍</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Content */}
        <div className="text-center space-y-8">
          {/* Boarding Pass Footer Design */}
          <div className="inline-block">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border-2 border-white/20">
              {/* Perforation Top */}
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-white/30 rounded-full"></div>
                ))}
              </div>

              {/* Logo/Names */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-3xl">✈️</span>
                  <h3 className="text-3xl font-serif font-bold">E & E</h3>
                  <span className="text-3xl">❤️</span>
                </div>
                <p className="text-white/80 text-sm">Elianser & Esra Wedding Flight</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"></div>

              {/* Thank You Message */}
              <div className="space-y-3">
                <p className="text-xl font-serif italic">Terima kasih atas kehadiran Anda</p>
                <p className="text-white/70 text-sm max-w-md mx-auto">
                  Doa dan restu Anda adalah hadiah terindah dalam perjalanan hidup kami
                </p>
              </div>

              {/* Perforation Bottom */}
              <div className="flex justify-center gap-2 mt-6">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-white/30 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <a
              href="https://wa.me/6285270480776"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <span className="text-white/30">•</span>
            <a
              href="mailto:wedding@elianser-esra.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {/* Wedding Date Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-rose-gold to-gold rounded-full">
            <span className="text-xl">🎫</span>
            <div className="text-left">
              <p className="text-xs opacity-80 uppercase tracking-wide">Destination Wedding</p>
              <p className="font-bold">12 Desember 2026</p>
            </div>
            <span className="text-xl">✈️</span>
          </div>

          {/* Barcode */}
          <div className="flex justify-center">
            <div className="space-y-2">
              <div className="flex justify-center gap-[2px] h-16 items-end">
                {[85, 65, 95, 70, 55, 90, 75, 60, 80, 50, 92, 68, 78, 63, 88, 72, 58, 82, 67, 93, 77, 62, 87, 73, 83, 69, 91, 66, 79, 74, 86, 71, 94, 64, 89, 76, 61, 81, 70, 84].map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-white/70"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-white/50 font-mono">
                WEDDING-ELIANSER-ESRA-{currentYear}
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-white/50 text-sm flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-rose-gold fill-rose-gold" /> for Elianser & Esra
            </p>
            <p className="text-white/40 text-xs mt-2">
              © {currentYear} Wedding Invitation. All rights reserved.
            </p>
          </div>

          {/* Final Quote */}
          <div className="max-w-2xl mx-auto">
            <p className="text-white/60 text-sm italic leading-relaxed">
              "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope"
            </p>
            <p className="text-white/40 text-xs mt-2">— Maya Angelou</p>
          </div>

          {/* Ticket Stub Style Bottom */}
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
              <span className="text-white/50 text-xs font-mono uppercase tracking-widest">
                Thank you for boarding • Safe travels
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
