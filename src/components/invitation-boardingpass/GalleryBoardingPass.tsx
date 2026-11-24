'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { InvitationData } from '@/lib/types';

interface GalleryBoardingPassProps {
  data: InvitationData;
}

export default function GalleryBoardingPass({ data }: GalleryBoardingPassProps) {
  const { gallery } = data;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) return null;

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? gallery.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === gallery.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 text-6xl">📸</div>
        <div className="absolute bottom-40 left-10 text-5xl">🎞️</div>
        <div className="absolute top-1/2 left-1/4 text-4xl">📷</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-gold/10 rounded-full mb-4">
            <Camera className="w-5 h-5 text-rose-gold" />
            <span className="text-sm font-medium text-rose-gold uppercase tracking-wider">Photo Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-3">Galeri Perjalanan</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Koleksi momen indah dalam perjalanan cinta kami
          </p>
        </div>

        {/* Gallery Grid - Passport Stamp Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {gallery.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Photo */}
              <Image
                src={photo.url}
                alt={photo.caption || `Gallery ${index + 1}`}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
                onError={(e) => {
                  // Hide broken images
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-sm font-medium">{photo.caption || `Foto #${index + 1}`}</span>
                    <Camera className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Passport Stamp Effect */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 border-2 border-rose-gold rounded-full flex items-center justify-center rotate-12 bg-white/90 backdrop-blur">
                  <span className="text-xs font-bold text-rose-gold">✓</span>
                </div>
              </div>

              {/* Photo Frame Border */}
              <div className="absolute inset-0 border-4 border-white rounded-xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-gold/10 to-gold/10 rounded-full border-2 border-dashed border-gold/30">
            <span className="text-2xl">📸</span>
            <p className="text-slate-700 font-medium">
              {gallery.length} Momen Terabadikan
            </p>
            <span className="text-2xl">❤️</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center transition-all duration-300 z-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center transition-all duration-300 z-50"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center transition-all duration-300 z-50"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur rounded-full z-50">
            <p className="text-white text-sm font-medium">
              {selectedImage + 1} / {gallery.length}
            </p>
          </div>

          {/* Image Container */}
          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Boarding Pass Frame */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Main Image */}
              <div className="relative w-full h-full max-h-[80vh]">
                <Image
                  src={gallery[selectedImage].url}
                  alt={gallery[selectedImage].caption || `Gallery ${selectedImage + 1}`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              {/* Passport Stamps Decoration */}
              <div className="absolute top-4 right-4 w-20 h-20 border-4 border-rose-gold rounded-full flex items-center justify-center rotate-12 bg-white/20 backdrop-blur">
                <span className="text-2xl">✈️</span>
              </div>
              <div className="absolute bottom-4 left-4 w-20 h-20 border-4 border-gold rounded-full flex items-center justify-center -rotate-12 bg-white/20 backdrop-blur">
                <span className="text-2xl">❤️</span>
              </div>
            </div>
          </div>

          {/* Photo Number Badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <p className="text-white text-sm font-mono">
              PHOTO-{(selectedImage + 1).toString().padStart(3, '0')}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
