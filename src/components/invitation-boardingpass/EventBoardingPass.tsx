'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Plane } from 'lucide-react';
import { InvitationData } from '@/lib/types';

interface EventBoardingPassProps {
  data: InvitationData;
}

export default function EventBoardingPass({ data }: EventBoardingPassProps) {
  const { venue, reception } = data.couple;
  
  // Format dates - use weddingDate as fallback
  const venueDate = venue.date ? new Date(venue.date) : new Date(data.couple.weddingDate);
  const receptionDate = reception.date ? new Date(reception.date) : new Date(data.couple.weddingDate);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  const formatTime = (time: string) => {
    return time.replace('.', ':');
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative stamps */}
      <div className="absolute top-10 right-10 w-32 h-32 opacity-5">
        <div className="w-full h-full border-8 border-rose-gold rounded-full flex items-center justify-center rotate-12">
          <span className="text-4xl font-bold">✈</span>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-4">
            <Plane className="w-5 h-5 text-gold" />
            <span className="text-sm font-medium text-gold uppercase tracking-wider">Flight Schedule</span>
          </div>
          <h2 className="text-4xl font-serif text-slate-800 mb-2">Jadwal Penerbangan</h2>
          <p className="text-slate-600">Rencana perjalanan kami menuju bahagia</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pemberkatan - Flight 1 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-dashed border-slate-200">
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-rose-gold to-gold p-6 text-white relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono opacity-80">FLIGHT-01</span>
                  <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                    PEMBERKATAN
                  </div>
                </div>
                <h3 className="text-2xl font-bold">Holy Matrimony</h3>
              </div>
            </div>

            {/* Perforation */}
            <div className="relative h-4 bg-white">
              <div className="absolute inset-0 flex justify-between px-2">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-1 h-full bg-slate-200"></div>
                ))}
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6 space-y-4">
              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 uppercase">
                    <Calendar className="w-4 h-4" />
                    <span>Departure Date</span>
                  </div>
                  <p className="font-semibold text-slate-800">{formatDate(venueDate)}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 uppercase">
                    <Clock className="w-4 h-4" />
                    <span>Boarding Time</span>
                  </div>
                  <p className="font-semibold text-slate-800">{formatTime(venue.time)} WIB</p>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500 uppercase">
                  <MapPin className="w-4 h-4" />
                  <span>Gate Location</span>
                </div>
                <p className="font-semibold text-slate-800">{venue.name}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{venue.address}</p>
              </div>

              {/* Map Button */}
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-gradient-to-r from-rose-gold to-gold text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                📍 Lihat Lokasi di Maps
              </a>

              {/* Barcode */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-center gap-[2px] h-16 items-end">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-slate-800"
                      style={{ height: `${Math.random() * 60 + 40}%` }}
                    ></div>
                  ))}
                </div>
                <p className="text-center text-xs text-slate-500 mt-2 font-mono">
                  HOLY-MATRIMONY-{venueDate.getFullYear()}
                </p>
              </div>
            </div>
          </div>

          {/* Resepsi - Flight 2 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-dashed border-slate-200">
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-gold to-amber-500 p-6 text-white relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono opacity-80">FLIGHT-02</span>
                  <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                    RESEPSI
                  </div>
                </div>
                <h3 className="text-2xl font-bold">Wedding Reception</h3>
              </div>
            </div>

            {/* Perforation */}
            <div className="relative h-4 bg-white">
              <div className="absolute inset-0 flex justify-between px-2">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-1 h-full bg-slate-200"></div>
                ))}
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6 space-y-4">
              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 uppercase">
                    <Calendar className="w-4 h-4" />
                    <span>Departure Date</span>
                  </div>
                  <p className="font-semibold text-slate-800">{formatDate(receptionDate)}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 uppercase">
                    <Clock className="w-4 h-4" />
                    <span>Boarding Time</span>
                  </div>
                  <p className="font-semibold text-slate-800">{formatTime(reception.time)} WIB</p>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500 uppercase">
                  <MapPin className="w-4 h-4" />
                  <span>Gate Location</span>
                </div>
                <p className="font-semibold text-slate-800">{reception.name}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{reception.address}</p>
              </div>

              {/* Map Button */}
              <a
                href={reception.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-gradient-to-r from-gold to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                📍 Lihat Lokasi di Maps
              </a>

              {/* Barcode */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-center gap-[2px] h-16 items-end">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-slate-800"
                      style={{ height: `${Math.random() * 60 + 40}%` }}
                    ></div>
                  ))}
                </div>
                <p className="text-center text-xs text-slate-500 mt-2 font-mono">
                  RECEPTION-{receptionDate.getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 p-6 bg-amber-50 border-2 border-dashed border-amber-200 rounded-xl">
          <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <span className="text-xl">✈️</span>
            Informasi Penting
          </h4>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• Mohon hadir tepat waktu sesuai jadwal boarding</li>
            <li>• Pakaian: {venue.dresscode || 'Formal/Semi Formal'}</li>
            <li>• Protokol kesehatan tetap diterapkan</li>
            <li>• Konfirmasi kehadiran melalui RSVP sangat membantu kami</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
