import type { Metadata } from 'next'
import { getInvitationBySlug } from '@/lib/data'
import InvitationWrapper from '@/components/invitation/InvitationWrapper'

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
    title: `Undangan Pernikahan ${couple.groom.name} & ${couple.bride.name}`,
    description: `Dengan penuh sukacita kami mengundang Anda untuk hadir dalam pernikahan ${couple.groom.fullName} dan ${couple.bride.fullName} pada ${tanggal}.`,
    openGraph: {
      title: `Undangan Pernikahan ${couple.groom.name} & ${couple.bride.name}`,
      description: `${couple.groom.fullName} & ${couple.bride.fullName} — ${tanggal}`,
      images: [
        {
          url: '/EL_06256.png',
          width: 1200,
          height: 630,
          alt: `Pernikahan ${couple.groom.name} & ${couple.bride.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Undangan Pernikahan ${couple.groom.name} & ${couple.bride.name}`,
      description: `${tanggal}`,
    },
  }
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params
  const data = getInvitationBySlug(slug)
  return <InvitationWrapper data={data} />
}
