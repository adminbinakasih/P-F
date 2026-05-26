import { getInvitationBySlug } from '@/lib/data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function GET(_req: Request, { params }: Props) {
  const { slug } = await params
  const data = getInvitationBySlug(slug)
  return Response.json({ success: true, data })
}
