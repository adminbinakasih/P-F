import type { Metadata } from 'next'
import { getInvitationBySlug } from '@/lib/data'
import InvitationWrapper from '@/components/invitation/InvitationWrapper'

export async function generateMetadata(
  props: PageProps<'/invite/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
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
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
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

export default async function InvitePage(props: PageProps<'/invite/[slug]'>) {
  const { slug } = await props.params
  const data = getInvitationBySlug(slug)
  return <InvitationWrapper data={data} />
}
