'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { InvitationData } from '@/lib/types';
import { MiniBarcodePattern } from './BarcodePattern';

interface StoryBoardingPassProps {
  data: InvitationData;
}

export default function StoryBoardingPass({ data }: StoryBoardingPassProps) {
  const { story } = data.couple;

  if (!story || story.length === 0) return null;

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-6xl">✈️</div>
        <div className="absolute top-40 right-20 text-5xl">❤️</div>
        <div className="absolute bottom-40 left-1/4 text-4xl">🎫</div>
        <div className="absolute bottom-20 right-1/3 text-5xl">🌍</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-gold/10 rounded-full mb-4">
            <Heart className="w-5 h-5 text-rose-gold" />
            <span className="text-sm font-medium text-rose-gold uppercase tracking-wider">Travel Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-3">Perjalanan Cinta Kami</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Setiap perjalanan dimulai dengan satu langkah, dan kami bersyukur langkah-langkah kami bertemu
          </p>
        </div>

        {/* Timeline - Flight Route Style */}
        <div className="relative">
          {/* Connecting Line (Flight Path) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-gold via-gold to-amber-500 hidden md:block transform -translate-x-1/2">
            {/* Decorative dots on the path */}
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-rose-gold rounded-full transform -translate-x-1/2 -translate-y-2"></div>
            <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-amber-500 rounded-full transform -translate-x-1/2 translate-y-2"></div>
          </div>

          {/* Story Items */}
          <div className="space-y-12 md:space-y-16">
            {story.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Story Card - Boarding Pass Style */}
                  <div className="w-full md:w-5/12">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      {/* Image */}
                      <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                        {item.image && (
                          <div className="absolute inset-0 bg-slate-100">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        )}
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                        
                        {/* Ticket Number Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-mono font-bold text-slate-800">
                          #{(index + 1).toString().padStart(3, '0')}
                        </div>
                      </div>

                      {/* Perforation */}
                      <div className="relative h-4 bg-white">
                        <div className="absolute inset-0 flex justify-between px-2">
                          {[...Array(15)].map((_, i) => (
                            <div key={i} className="w-1 h-full bg-slate-200"></div>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        {/* Date Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 rounded-full text-xs font-medium text-gold">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-serif font-bold text-slate-800">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Mini Barcode */}
                        <div className="pt-3 border-t border-slate-100">
                          <MiniBarcodePattern text={`STORY-${index + 1}`} barCount={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Icon - Stamp/Checkpoint */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center shadow-lg border-4 border-white">
                      {index === 0 && <span className="text-2xl">🛫</span>}
                      {index > 0 && index < story.length - 1 && <span className="text-2xl">📍</span>}
                      {index === story.length - 1 && <span className="text-2xl">🛬</span>}
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Quote - Destination Reached */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-br from-rose-gold/10 via-gold/10 to-amber-500/10 rounded-2xl border-2 border-dashed border-gold/30">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-6 h-6 text-rose-gold fill-rose-gold" />
              <span className="text-3xl">✈️</span>
              <Heart className="w-6 h-6 text-rose-gold fill-rose-gold" />
            </div>
            <p className="text-xl md:text-2xl font-serif text-slate-800 italic max-w-2xl">
              "Dan akhirnya kami tiba di destinasi terindah: Pernikahan kami"
            </p>
            <p className="text-sm text-slate-600 mt-3 uppercase tracking-widest">
              Final Destination • 12 Desember 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
