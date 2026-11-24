'use client';

import React, { useState } from 'react';
import { Gift, CreditCard, Copy, Check, Wallet } from 'lucide-react';
import { InvitationData } from '@/lib/types';
import { MiniBarcodePattern } from './BarcodePattern';

interface GiftBoardingPassProps {
  data: InvitationData;
}

export default function GiftBoardingPass({ data }: GiftBoardingPassProps) {
  const { gifts } = data;
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  if (!gifts || gifts.length === 0) return null;

  const handleCopy = async (accountNumber: string, bankName: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedAccount(bankName);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getBankIcon = (bankName: string) => {
    const name = bankName.toLowerCase();
    if (name.includes('mandiri')) return '🟡';
    if (name.includes('bca')) return '🔵';
    if (name.includes('bni')) return '🟠';
    if (name.includes('bri')) return '⚪';
    if (name.includes('dana')) return '💙';
    if (name.includes('gopay')) return '💚';
    if (name.includes('ovo')) return '💜';
    return '🏦';
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">🎁</div>
        <div className="absolute top-40 right-10 text-5xl">💝</div>
        <div className="absolute bottom-20 left-1/4 text-4xl">🎉</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full mb-4">
            <Gift className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">Wedding Gift</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-3">Hadiah Pernikahan</h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Doa Restu Anda adalah karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.
          </p>
        </div>

        {/* Gift Cards - Boarding Pass Style */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {gifts.map((account, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-100 hover:shadow-2xl transition-all duration-300"
            >
              {/* Card Header - Like Credit Card Top */}
              <div className={`p-6 bg-gradient-to-br ${
                account.name.toLowerCase().includes('mandiri')
                  ? 'from-yellow-500 to-yellow-600'
                  : account.name.toLowerCase().includes('bca')
                  ? 'from-blue-500 to-blue-600'
                  : account.name.toLowerCase().includes('dana')
                  ? 'from-cyan-500 to-blue-500'
                  : 'from-rose-gold to-gold'
              } text-white relative overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl">{getBankIcon(account.name)}</span>
                    <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold">
                      {account.type === 'ewallet' ? 'E-WALLET' : 'BANK ACCOUNT'}
                    </div>
                  </div>
                  
                  {/* Account Number - Credit Card Style */}
                  <div className="font-mono text-2xl tracking-wider mb-4 font-bold">
                    {account.accountNumber.match(/.{1,4}/g)?.join(' ') || account.accountNumber}
                  </div>
                  
                  {/* Account Holder Name */}
                  <div className="space-y-1">
                    <p className="text-xs opacity-80 uppercase tracking-wide">Account Holder</p>
                    <p className="font-semibold text-lg">{account.accountName}</p>
                  </div>
                </div>
              </div>

              {/* Perforation Line */}
              <div className="relative h-4 bg-white">
                <div className="absolute inset-0 flex justify-between px-2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 h-full bg-slate-200"></div>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Bank Name Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-slate-600" />
                    <span className="font-bold text-slate-800 text-lg">{account.name}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">ACC-{(index + 1).toString().padStart(3, '0')}</span>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(account.accountNumber, account.name)}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    copiedAccount === account.name
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105'
                  }`}
                >
                  {copiedAccount === account.name ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Nomor Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>

                {/* Mini Barcode */}
                <div className="pt-3 border-t border-slate-200">
                  <MiniBarcodePattern text={`GIFT-${account.accountNumber.slice(-4)}`} barCount={25} />
                  <p className="text-center text-xs text-slate-500 mt-1 font-mono">
                    GIFT-{account.accountNumber.slice(-4)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gift Info Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-dashed border-amber-200 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-amber-700" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-amber-900 text-lg">Informasi Pengiriman Hadiah</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                Anda dapat mengirimkan hadiah melalui transfer ke salah satu rekening di atas. 
                Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami. Terima kasih atas perhatian dan kasih sayang Anda! 💝
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mt-8 text-center">
          <div className="inline-block px-8 py-4 bg-white rounded-full shadow-md border border-slate-200">
            <p className="text-slate-600 italic text-sm md:text-base">
              "Kasih itu sabar, kasih itu murah hati" - 1 Korintus 13:4
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
