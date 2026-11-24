import type { Metadata } from 'next'
import { getInvitationBySlug } from '@/lib/data'
import { BoardingPassInvitation } from '@/components/invitation-boardingpass'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getInvitationBySlug(slug)
  const { couple } = data

  const tanggal = new Date(couple.weddingDate).toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return {
    title: `Undangan Pernikahan ${couple.groom.fullName} & ${couple.bride.fullName}`,
    description: `Dengan penuh sukacita kami mengundang Anda untuk hadir dalam pernikahan ${couple.groom.fullName} dan ${couple.bride.fullName} pada ${tanggal}.`,
    openGraph: {
      title: `Undangan Pernikahan ${couple.groom.fullName} & ${couple.bride.fullName}`,
      description: `${couple.groom.fullName} & ${couple.bride.fullName} — ${tanggal}`,
      images: [
        {
          url: '/prawedd/IMG_4362b.JPG',
          width: 1200,
          height: 630,
          alt: `Pernikahan ${couple.groom.fullName} & ${couple.bride.fullName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Undangan Pernikahan ${couple.groom.fullName} & ${couple.bride.fullName}`,
      description: `${tanggal}`,
    },
  }
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params
  const data = getInvitationBySlug(slug)
  return <BoardingPassInvitation data={data} guestName={data.guestName} />
}
