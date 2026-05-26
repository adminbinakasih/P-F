import type { Metadata } from 'next'
import LandingPage from '@/components/landing/LandingPage'

export const metadata: Metadata = {
  title: 'Eternal Vows — Luxury Digital Wedding Invitations',
  description:
    'Create breathtaking digital wedding invitations that feel like a million-dollar experience. Elegant, cinematic, and unforgettable.',
}

export default function HomePage() {
  return <LandingPage />
}
