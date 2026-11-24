'use client';

import React, { useState, useEffect } from 'react';
import { InvitationData } from '@/lib/types';
import HeroBoardingPass from './HeroBoardingPass';
import CoupleBoardingPass from './CoupleBoardingPass';
import EventBoardingPass from './EventBoardingPass';
import StoryBoardingPass from './StoryBoardingPass';
import GalleryBoardingPass from './GalleryBoardingPass';
import RSVPBoardingPass from './RSVPBoardingPass';
import WishesBoardingPass from './WishesBoardingPass';
import GiftBoardingPass from './GiftBoardingPass';
import FooterBoardingPass from './FooterBoardingPass';
import BarcodePattern from './BarcodePattern';

interface BoardingPassInvitationProps {
  data: InvitationData;
  guestName?: string;
}

export default function BoardingPassInvitation({ data, guestName }: BoardingPassInvitationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    // Prevent scrolling when invitation is not opened
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    
    // Play music on user interaction
    setTimeout(() => {
      const audio = document.getElementById('wedding-music') as HTMLAudioElement;
      if (audio) {
        // Set volume first
        audio.volume = 0.5;
        
        // Try to play
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setMusicPlaying(true);
              console.log('Music playing');
            })
            .catch(err => {
              console.log('Audio play failed:', err);
              // If failed, try with user interaction
              document.addEventListener('click', () => {
                audio.play()
                  .then(() => setMusicPlaying(true))
                  .catch(e => console.log('Retry failed:', e));
              }, { once: true });
            });
        }
      }
    }, 100); // Small delay to ensure DOM is ready
  };

  if (!isOpen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-4 pt-safe z-50 overflow-y-auto">
        {/* Boarding Pass Cover */}
        <div className="max-w-md w-full my-auto py-8">
          {/* Ticket Design */}
          <div className="bg-white rounded-2xl shadow-2xl border-4 border-slate-200">
            {/* Ticket Header - Gold Band */}
            <div className="bg-gradient-to-r from-rose-gold via-gold to-amber-500 px-4 py-10 sm:px-6 text-white relative rounded-t-2xl">
              {/* Background decorations only */}
              <div className="absolute inset-0 opacity-10 overflow-hidden rounded-t-2xl pointer-events-none">
                <div className="absolute top-4 right-4 w-24 h-24 bg-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-20 h-20 bg-white rounded-full"></div>
              </div>
              <div className="relative z-10 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xs font-mono opacity-80">FLIGHT-INV-2026</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider mb-2">Wedding Invitation</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl sm:text-2xl">✈️</span>
                  <span className="text-xs sm:text-sm font-medium">Boarding Pass</span>
                  <span className="text-xl sm:text-2xl">🎫</span>
                </div>
              </div>
            </div>

            {/* Perforation Line */}
            <div className="relative h-6 bg-white overflow-hidden">
              <div className="absolute inset-0 flex justify-between px-3">
                {[...Array(18)].map((_, i) => (
                  <div key={i} className="w-1 h-full bg-slate-200"></div>
                ))}
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full -ml-3"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full -mr-3"></div>
            </div>

            {/* Ticket Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Couple Names */}
              <div className="text-center space-y-2">
                <p className="text-xs text-slate-500 uppercase tracking-widest">The Wedding of</p>
                <h1 className="text-lg sm:text-xl font-serif font-bold text-slate-800 leading-tight px-2">
                  {data.couple.groom.fullName}
                </h1>
                <div className="flex items-center justify-center">
                  <span className="text-rose-gold text-xl">❤️</span>
                </div>
                <h1 className="text-lg sm:text-xl font-serif font-bold text-slate-800 leading-tight px-2">
                  {data.couple.bride.fullName}
                </h1>
              </div>

              {/* Flight Details */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-200">
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase mb-1">Departure</p>
                  <p className="text-lg font-bold text-slate-800">12</p>
                  <p className="text-xs text-slate-600">December</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase mb-1">Year</p>
                  <p className="text-lg font-bold text-slate-800">2026</p>
                  <p className="text-xs text-slate-600">Destination</p>
                </div>
              </div>

              {/* Guest Name */}
              {guestName && (
                <div className="bg-slate-50 rounded-lg p-4 border-2 border-dashed border-slate-200">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Passenger Name</p>
                  <p className="font-semibold text-slate-800">{guestName}</p>
                </div>
              )}

              {/* Open Button */}
              <button
                onClick={handleOpen}
                className="w-full py-4 bg-gradient-to-r from-rose-gold via-gold to-amber-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>✈️</span>
                <span>Buka Undangan</span>
                <span>🎫</span>
              </button>

              {/* Barcode */}
              <BarcodePattern 
                text={`INV-${data.couple.groom.name.toUpperCase()}-${data.couple.bride.name.toUpperCase()}-2026`}
                className="pt-4"
              />
            </div>

            {/* Ticket Footer */}
            <div className="bg-slate-100 px-6 sm:px-8 py-4 text-center border-t-2 border-dashed border-slate-300 rounded-b-2xl">
              <p className="text-xs text-slate-600">
                Please keep this boarding pass until the end of the journey
              </p>
            </div>
          </div>

          {/* Bottom Note */}
          <p className="text-center text-white/70 text-sm mt-6">
            Tap the button above to view your invitation
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Background Music */}
      <audio
        id="wedding-music"
        src="/si-rokkap-ni-tondi.mp3"
        loop
        preload="auto"
      />

      {/* Main Invitation Content */}
      <div className="min-h-screen bg-white">
        <HeroBoardingPass 
          couple={data.couple} 
          guestName={guestName || ''} 
          onOpen={() => {
            // Scroll to RSVP section
            const rsvpSection = document.getElementById('rsvp-section');
            if (rsvpSection) {
              rsvpSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }} 
        />
        <CoupleBoardingPass couple={data.couple} />
        <EventBoardingPass data={data} />
        <StoryBoardingPass data={data} />
        <GalleryBoardingPass data={data} />
        <RSVPBoardingPass guestName={guestName} />
        <WishesBoardingPass />
        <GiftBoardingPass data={data} />
        <FooterBoardingPass />
      </div>

      {/* Music Control Button */}
      <button
        onClick={() => {
          const audio = document.getElementById('wedding-music') as HTMLAudioElement;
          if (audio) {
            if (musicPlaying) {
              audio.pause();
              setMusicPlaying(false);
            } else {
              audio.play();
              setMusicPlaying(true);
            }
          }
        }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-rose-gold to-gold text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-40 hover:scale-110"
        aria-label="Toggle music"
      >
        {musicPlaying ? (
          <span className="text-2xl">🔊</span>
        ) : (
          <span className="text-2xl">🔇</span>
        )}
      </button>
    </>
  );
}
