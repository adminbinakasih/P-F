import type { InvitationData, Wish } from './types'

// ============================================================
// DATA PERNIKAHAN: PIETER & FEBRIYANTI
// ============================================================
export const pieterFebriyantiData: InvitationData = {
  slug: 'pieter-febriyanti',
  guestName: 'Tamu Undangan',
  couple: {
    groom: {
      name: 'Pieter',
      fullName: 'Pieter Nero Ginting Suka, Amd. Ds',
      photo: '/pria.JPEG',
      father: 'Bapak R. Ginting',
      mother: 'Ibu M. Br Sembiring Milala',
      instagram: '@Pieterneroginting',
      bio: 'Seorang pria yang percaya bahwa cinta sejati adalah perjalanan yang paling indah.',
    },
    bride: {
      name: 'Febry',
      fullName: 'Febriyanti Br. Surbakti, S.Si., M.Si',
      photo: '/wanita.JPEG',
      father: 'Bapak K. Surbakti',
      mother: 'Ibu K. br. Ginting',
      instagram: '@Febriyanti_srbt',
      bio: 'Seorang wanita yang menemukan keindahan hidup dalam setiap momen bersama orang-orang tercinta.',
    },
    weddingDate: '2026-06-15',
    weddingTime: '15:00',
    hashtag: '#PieterFebry2026',
    venue: {
      name: 'GBKP Rg. Simpang Tuntungan',
      address: 'Jl. Jamin Ginting, Ladang Bambu, Kec. Medan Tuntungan, Kota Medan, Sumatera Utara 20138',
      city: 'Medan',
      mapsUrl: 'https://maps.google.com/maps?q=GBKP+Simpang+Tuntungan+Medan',
      date: 'Senin, 15 Juni 2026',
      time: '15.00 WIB',
      dresscode: 'Formal — Putih & Gold',
    },
    reception: {
      name: 'Jambur Gotong Royong Pancurbatu',
      address: 'Jl. Ali Parinduri, Desa Lama, Kec. Pancur Batu, Kabupaten Deli Serdang, Sumatera Utara',
      city: 'Deli Serdang',
      mapsUrl: 'https://maps.google.com/maps?q=Jambur+Gotong+Royong+Pancurbatu+Deli+Serdang',
      date: 'Selasa, 16 Juni 2026',
      time: '08.00 WIB - Selesai',
      dresscode: 'Adat Karo',
    },
    story: [
      {
        date: 'Awal Pertemuan',
        title: 'Pertemuan Pertama',
        description:
          'Dua jiwa yang dipertemukan oleh takdir. Sebuah pertemuan sederhana yang ternyata menjadi awal dari segalanya.',
        image: '/EL_06103.png',
      },
      {
        date: 'Mengenal Lebih Dekat',
        title: 'Semakin Dekat',
        description:
          'Hari demi hari, percakapan demi percakapan — kami semakin mengenal satu sama lain dan menemukan kecocokan yang luar biasa.',
        image: '/EL_06120.png',
      },
      {
        date: 'Resmi Bersama',
        title: 'Menjalin Hubungan',
        description:
          'Dengan restu keluarga dan keyakinan di hati, kami memutuskan untuk melangkah bersama dalam satu ikatan yang tulus.',
        image: '/EL_06253.png',
      },
      {
        date: 'Lamaran',
        title: 'Meminang Hati',
        description:
          'Dengan penuh keberanian dan cinta yang tulus, ia datang melamar. Sebuah momen yang akan selalu dikenang seumur hidup.',
        image: '/EL_06284.png',
      },
      {
        date: '15 Juni 2026',
        title: 'Hari yang Dinantikan',
        description:
          'Hari ini, di hadapan Tuhan, keluarga, dan orang-orang terkasih — kami mengucapkan janji suci untuk selamanya.',
        image: '/EL_06301.png',
      },
    ],
  },
  gallery: [
    {
      id: '1',
      url: '/EL_06103.png',
      caption: 'Pieter & Febry',
      width: 800,
      height: 1200,
    },
    {
      id: '2',
      url: '/EL_06104.png',
      caption: 'Bersama',
      width: 800,
      height: 600,
    },
    {
      id: '3',
      url: '/EL_06122.png',
      caption: 'Momen Indah',
      width: 800,
      height: 1000,
    },
    {
      id: '4',
      url: '/EL_06140.png',
      caption: 'Cinta Kami',
      width: 800,
      height: 800,
    },
    {
      id: '5',
      url: '/EL_06256.png',
      caption: 'Senja Berdua',
      width: 800,
      height: 1100,
    },
    {
      id: '6',
      url: '/IMG_2436.JPEG',
      caption: 'Kenangan',
      width: 800,
      height: 700,
    },
    {
      id: '7',
      url: '/IMG_2437.JPEG',
      caption: 'Kebersamaan',
      width: 800,
      height: 900,
    },
    {
      id: '8',
      url: '/IMG_2438.JPEG',
      caption: 'Bahagia',
      width: 800,
      height: 800,
    },
  ],
  wishes: [],
  gifts: [
    {
      type: 'bank',
      name: 'Bank Mandiri',
      accountName: 'Pieter Nero Ginting',
      accountNumber: '1060019312324',
    },
    {
      type: 'bank',
      name: 'Bank Mandiri',
      accountName: 'Febriyanti',
      accountNumber: '1050020589739',
    },
    {
      type: 'ewallet',
      name: 'Dana',
      accountName: 'Pieter Nero Ginting Suka',
      accountNumber: '083197679315',
    },
  ],
  template: 'classic',
}

// ============================================================
// DEFAULT DATA (legacy / demo)
// ============================================================
export const defaultInvitationData: InvitationData = pieterFebriyantiData

export function getInvitationBySlug(slug: string): InvitationData {
  // Route khusus Pieter & Febriyanti
  if (
    slug === 'pieter-febriyanti' ||
    slug === 'pieter' ||
    slug === 'febriyanti' ||
    slug === 'default'
  ) {
    return {
      ...pieterFebriyantiData,
      slug,
      guestName: 'Tamu Undangan',
    }
  }

  // Personalized: nama tamu dari slug
  return {
    ...pieterFebriyantiData,
    slug,
    guestName: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
  }
}

export const mockWishes: Wish[] = pieterFebriyantiData.wishes

export const weddingDate = new Date('2026-06-15T15:00:00')
