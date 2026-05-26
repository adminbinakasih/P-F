import { NextRequest } from 'next/server'
import { z } from 'zod'

const rsvpSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  attendance: z.enum(['hadir', 'tidak_hadir', 'mungkin']),
  guestCount: z.number().min(1).max(10),
  message: z.string().optional(),
  invitationSlug: z.string(),
})

// In-memory store for demo (replace with DB in production)
const rsvpStore: unknown[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = rsvpSchema.parse(body)

    // In production: save to database
    rsvpStore.push({ ...data, id: Date.now(), createdAt: new Date().toISOString() })

    return Response.json({ success: true, message: 'RSVP received successfully' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ success: false, message: 'Validation error' }, { status: 400 })
    }
    return Response.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return Response.json({ data: rsvpStore, total: rsvpStore.length })
}
