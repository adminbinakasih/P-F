'use client';

import React, { useState } from 'react';
import { Luggage, Users, MessageSquare, Check, Loader2 } from 'lucide-react';
import { MiniBarcodePattern } from './BarcodePattern';

interface RSVPBoardingPassProps {
  guestName?: string;
}

export default function RSVPBoardingPass({ guestName = '' }: RSVPBoardingPassProps) {
  const [formData, setFormData] = useState({
    name: guestName,
    attendance: '',
    guestCount: '1',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        attendance: formData.attendance,
        guestCount: parseInt(formData.guestCount),
        message: formData.message,
        invitationSlug: 'elianser-esra',
      };

      console.log('Sending RSVP data:', payload);

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('RSVP response:', result);

      if (response.ok && result.success) {
        setIsSubmitted(true);
        
        // Save to localStorage as backup
        const wishes = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
        wishes.push({
          id: Date.now(),
          name: formData.name,
          message: formData.message,
          attendance: formData.attendance,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('wedding-wishes', JSON.stringify(wishes));
        
        // Trigger wishes refresh
        window.dispatchEvent(new Event('wishes-updated'));
        
        // Reset after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: guestName,
            attendance: '',
            guestCount: '1',
            message: ''
          });
        }, 3000);
      } else {
        console.error('RSVP failed:', result);
        alert(`Gagal mengirim konfirmasi: ${result.message || 'Silakan coba lagi'}`);
      }
    } catch (error) {
      console.error('RSVP submission error:', error);
      
      // Fallback: save to localStorage only
      if (formData.message) {
        const wishes = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
        wishes.push({
          id: Date.now(),
          name: formData.name,
          message: formData.message,
          attendance: formData.attendance,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('wedding-wishes', JSON.stringify(wishes));
        window.dispatchEvent(new Event('wishes-updated'));
        
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: guestName,
            attendance: '',
            guestCount: '1',
            message: ''
          });
        }, 3000);
      } else {
        alert('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="rsvp-section" className="relative py-20 px-4 bg-gradient-to-b from-white to-slate-50 overflow-hidden scroll-mt-20">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 opacity-5">
        <Luggage className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 right-10 w-24 h-24 opacity-5">
        <Users className="w-full h-full" />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-gold/10 rounded-full mb-4">
            <Luggage className="w-5 h-5 text-rose-gold" />
            <span className="text-sm font-medium text-rose-gold uppercase tracking-wider">Baggage Check-in</span>
          </div>
          <h2 className="text-4xl font-serif text-slate-800 mb-2">Konfirmasi Kehadiran</h2>
          <p className="text-slate-600">Bantu kami mempersiapkan tempat terbaik untuk Anda</p>
        </div>

        {/* RSVP Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-slate-100">
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-rose-gold via-gold to-amber-500 p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono opacity-80">RSVP-FORM</span>
                <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                  CHECK-IN
                </div>
              </div>
              <h3 className="text-2xl font-bold">Passenger Information</h3>
              <p className="text-sm opacity-90 mt-1">Please fill in your travel details</p>
            </div>
          </div>

          {/* Perforation Line */}
          <div className="relative h-6 bg-white">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-full h-[2px] border-t-2 border-dashed border-slate-300"></div>
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full -ml-3 border-2 border-slate-200"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full -mr-3 border-2 border-slate-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 uppercase tracking-wide">
                Nama Penumpang / Passenger Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all outline-none"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            {/* Attendance */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 uppercase tracking-wide">
                Status Kehadiran / Attendance Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`relative flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.attendance === 'hadir' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-slate-200 hover:border-green-300'
                }`}>
                  <input
                    type="radio"
                    name="attendance"
                    value="hadir"
                    checked={formData.attendance === 'hadir'}
                    onChange={handleChange}
                    required
                    className="sr-only"
                  />
                  <Check className={`w-5 h-5 ${formData.attendance === 'hadir' ? 'text-green-600' : 'text-slate-400'}`} />
                  <span className={`font-medium ${formData.attendance === 'hadir' ? 'text-green-700' : 'text-slate-600'}`}>
                    ✈️ Hadir
                  </span>
                </label>

                <label className={`relative flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.attendance === 'tidak-hadir' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-slate-200 hover:border-red-300'
                }`}>
                  <input
                    type="radio"
                    name="attendance"
                    value="tidak-hadir"
                    checked={formData.attendance === 'tidak-hadir'}
                    onChange={handleChange}
                    required
                    className="sr-only"
                  />
                  <span className={`text-xl ${formData.attendance === 'tidak-hadir' ? 'text-red-600' : 'text-slate-400'}`}>✕</span>
                  <span className={`font-medium ${formData.attendance === 'tidak-hadir' ? 'text-red-700' : 'text-slate-600'}`}>
                    Tidak Hadir
                  </span>
                </label>
              </div>
            </div>

            {/* Guest Count - Only show if attending */}
            {formData.attendance === 'hadir' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 uppercase tracking-wide">
                  Jumlah Tamu / Number of Passengers
                </label>
                <select
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all outline-none"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Orang' : 'Orang'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Message */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 uppercase tracking-wide flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Pesan & Doa / Message & Wishes
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all outline-none resize-none"
                placeholder="Tuliskan ucapan dan doa untuk kami..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitted
                  ? 'bg-green-500'
                  : 'bg-gradient-to-r from-rose-gold via-gold to-amber-500 hover:shadow-xl hover:scale-105'
              } disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSubmitted && <Check className="w-5 h-5" />}
              {isSubmitted ? '✓ Konfirmasi Terkirim!' : isSubmitting ? 'Mengirim...' : '✈️ Kirim Konfirmasi'}
            </button>
          </form>

          {/* Ticket Footer - Barcode */}
          <div className="px-8 pb-8">
            <div className="pt-6 border-t-2 border-dashed border-slate-200">
              <MiniBarcodePattern text={`RSVP-CONFIRMATION-${new Date().getFullYear()}`} barCount={40} />
              <p className="text-center text-xs text-slate-500 mt-2 font-mono">
                RSVP-CONFIRMATION-{new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>

        {/* Info Notice */}
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <p className="text-sm text-blue-800">
            <strong>📋 Catatan:</strong> Konfirmasi kehadiran Anda sangat membantu kami dalam mempersiapkan acara dengan lebih baik. Terima kasih!
          </p>
        </div>
      </div>
    </section>
  );
}
