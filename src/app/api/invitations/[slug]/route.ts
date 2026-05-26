import { getInvitationBySlug } from '@/lib/data'

export async function GET(_req: Request, ctx: RouteContext<'/api/invitations/[slug]'>) {
  const { slug } = await ctx.params
  const data = getInvitationBySlug(slug)
  return Response.json({ success: true, data })
}
