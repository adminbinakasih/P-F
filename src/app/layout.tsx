import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Poppins, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  ),
  title: {
    default: 'Eternal Vows — Undangan Pernikahan Digital Premium',
    template: '%s | Eternal Vows',
  },
  description:
    'Platform undangan pernikahan digital premium. Elegan, sinematik, dan tak terlupakan. Buat undangan pernikahan Anda yang memukau.',
  keywords: [
    'undangan pernikahan digital',
    'undangan online',
    'wedding invitation',
    'undangan nikah',
    'RSVP online',
    'undangan digital premium',
  ],
  authors: [{ name: 'Eternal Vows' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'Eternal Vows',
    title: 'Eternal Vows — Undangan Pernikahan Digital Premium',
    description:
      'Platform undangan pernikahan digital premium. Elegan, sinematik, dan tak terlupakan.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Eternal Vows — Undangan Pernikahan Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eternal Vows — Undangan Pernikahan Digital Premium',
    description: 'Platform undangan pernikahan digital premium.',
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${cormorant.variable} ${poppins.variable} ${inter.variable}`}
    >
      <body className="bg-[#F5F0E8] text-[#1A1410] font-body antialiased">
        {children}
      </body>
    </html>
  )
}
