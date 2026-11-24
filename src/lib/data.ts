import type { InvitationData, Wish } from './types'

// ============================================================
// DATA PERNIKAHAN: ELIANSER & ESRA
// ============================================================
export const elianserEsraData: InvitationData = {
  slug: 'elianser-esra',
  guestName: 'Tamu Undangan',
  couple: {
    groom: {
      name: 'Elianser',
      fullName: 'Elianser Sihombing, S.S.I',
      photo: '/prawedd/WhatsApp Image 2026-11-19 at 09.31.35.jpeg',
      father: 'Bapak T. Sihombing',
      mother: 'Ibu R. Br. Pardosi',
      instagram: '@elianser',
      bio: 'Seorang pria yang percaya bahwa cinta sejati adalah perjalanan yang paling indah.',
    },
    bride: {
      name: 'Esra',
      fullName: 'Esra Putri Udur Parhusip, S.Tr.Par',
      photo: '/prawedd/WhatsApp Image 2026-11-19 at 09.31.36.jpeg',
      father: 'Bapak T. Parhusip, S.Pd',
      mother: 'Ibu T. Br. Simanjuntak',
      instagram: '@esraputri',
      bio: 'Seorang wanita yang menemukan keindahan hidup dalam setiap momen bersama orang-orang tercinta.',
    },
    weddingDate: '2026-12-12',
    weddingTime: '09:00',
    hashtag: '#ElianserEsra2026',
    venue: {
      name: 'Pemberkatan Pernikahan',
      address: 'Gereja HKI Resort Khusus Sempurna, Jl. Sempurna No. 90, Cinta Damai, Medan',
      city: 'Medan',
      mapsUrl: 'https://maps.app.goo.gl/Xi6JUdxfGY9KEwQ46',
      date: 'Sabtu, 12 Desember 2026',
      time: '09.00 WIB - Selesai',
      dresscode: 'Formal — Putih & Gold',
    },
    reception: {
      name: 'Resepsi & Adat Batak',
      address: 'WISMA ADAT HKBP CINTA DAMAI, Jl. Pantai Timur, Medan',
      city: 'Medan',
      mapsUrl: 'https://maps.app.goo.gl/zfnB6pgRwwohyor28',
      date: 'Sabtu, 12 Desember 2026',
      time: '12.00 WIB - Selesai',
      dresscode: 'Adat Batak',
    },
    story: [
      {
        date: 'Awal Pertemuan',
        title: 'Pertemuan Pertama',
        description: 'Dua jiwa yang dipertemukan oleh takdir. Sebuah pertemuan sederhana yang ternyata menjadi awal dari segalanya.',
        image: '/prawedd/1.jpeg',
      },
      {
        date: 'Mengenal Lebih Dekat',
        title: 'Semakin Dekat',
        description: 'Hari demi hari, percakapan demi percakapan — kami semakin mengenal satu sama lain dan menemukan kecocokan yang luar biasa.',
        image: '/prawedd/2.jpeg',
      },
      {
        date: '12 Desember 2026',
        title: 'Hari yang Dinantikan',
        description: 'Hari ini, di hadapan Tuhan, keluarga, dan orang-orang terkasih — kami mengucapkan janji suci untuk selamanya.',
        image: '/prawedd/3.jpeg',
      },
    ],
  },
  gallery: [
    { id: '1',  url: '/prawedd/IMG_4276 bb.JPG',      caption: 'Elianser & Esra',   width: 800, height: 1000 },
    { id: '2',  url: '/prawedd/IMG_4281.jpg',         caption: 'Momen Spesial',    width: 800, height: 1000 },
    { id: '3',  url: '/prawedd/IMG_4299 (1) bb.JPG',  caption: 'Senja Berdua',     width: 800, height: 1000 },
    { id: '4',  url: '/prawedd/IMG_4305.jpg',         caption: 'Indah',            width: 800, height: 1000 },
    { id: '5',  url: '/prawedd/IMG_4311.jpg',         caption: 'Bahagia',          width: 800, height: 1000 },
    { id: '6',  url: '/prawedd/IMG_4319 bb.JPG',      caption: 'Bersama Selalu',   width: 800, height: 1000 },
    { id: '7',  url: '/prawedd/IMG_4348.jpg',         caption: 'Selamanya',        width: 800, height: 1000 },
    { id: '8',  url: '/prawedd/IMG_4352.JPG',         caption: 'Kenangan',         width: 800, height: 1000 },
    { id: '9',  url: '/prawedd/IMG_4362b.JPG',        caption: 'Kebersamaan',      width: 800, height: 1000 },
    { id: '10', url: '/prawedd/IMG_4377.JPG',         caption: 'Kasih Sayang',     width: 800, height: 1000 },
    { id: '11', url: '/prawedd/IMG_4389.JPG',         caption: 'Romantis',         width: 800, height: 1000 },
    { id: '12', url: '/prawedd/IMG_4405b.JPG',        caption: 'Kebahagiaan',      width: 800, height: 1000 },
    { id: '13', url: '/prawedd/IMG_4407 bb.JPG',      caption: 'Harmonis',         width: 800, height: 1000 },
  ],
  wishes: [],
  gifts: [
    {
      type: 'bank',
      name: 'Bank Mandiri',
      accountName: 'Elianser Sihombing',
      accountNumber: '1060015762423',
    },
    {
      type: 'bank',
      name: 'BCA',
      accountName: 'Esra Putri Udur Parhusip',
      accountNumber: '3491717431',
    },
    {
      type: 'ewallet',
      name: 'Dana',
      accountName: 'Esra Putri Udur Parhusip',
      accountNumber: '085270480776',
    },
  ],
  template: 'classic',
}

// ============================================================
// DEFAULT DATA (legacy / demo)
// ============================================================
export const defaultInvitationData: InvitationData = elianserEsraData

export function getInvitationBySlug(slug: string): InvitationData {
  // Route khusus Elianser & Esra (dengan backward compatibility untuk URL lama)
  if (
    slug === 'elianser-esra' ||
    slug === 'elianser' ||
    slug === 'esra' ||
    slug === 'default' ||
    slug === 'pieter-febriyanti' || // Legacy URL compatibility
    slug === 'pieter' ||
    slug === 'febriyanti'
  ) {
    return {
      ...elianserEsraData,
      slug,
      guestName: 'Tamu Undangan',
    }
  }

  // Personalized: nama tamu dari slug
  return {
    ...elianserEsraData,
    slug,
    guestName: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
  }
}

export const mockWishes: Wish[] = elianserEsraData.wishes

export const weddingDate = new Date('2026-12-12T09:00:00')
