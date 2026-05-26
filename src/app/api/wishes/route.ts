import { NextRequest } from 'next/server'
import { z } from 'zod'

const wishSchema = z.object({
  name: z.string().min(2),
  message: z.string().min(5),
  invitationSlug: z.string(),
})

// In-memory store for demo
const wishStore: unknown[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = wishSchema.parse(body)

    const wish = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    }

    wishStore.unshift(wish)

    return Response.json({ success: true, data: wish })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ success: false, message: 'Validation error' }, { status: 400 })
    }
    return Response.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  const filtered = slug
    ? wishStore.filter((w: any) => w.invitationSlug === slug)
    : wishStore

  return Response.json({ data: filtered, total: filtered.length })
}
