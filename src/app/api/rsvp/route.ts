import { NextRequest } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

const rsvpSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  attendance: z.enum(['hadir', 'tidak_hadir', 'mungkin']),
  guestCount: z.number().min(1).max(10),
  message: z.string().optional(),
  invitationSlug: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = rsvpSchema.parse(body)

    const { error } = await supabase.from('rsvp').insert({
      name: data.name,
      phone: data.phone ?? null,
      attendance: data.attendance,
      guest_count: data.guestCount,
      message: data.message ?? null,
      invitation_slug: data.invitationSlug,
    })

    if (error) {
      console.error('Supabase RSVP insert error:', error)
      return Response.json({ success: false, message: 'Gagal menyimpan RSVP' }, { status: 500 })
    }

    return Response.json({ success: true, message: 'RSVP berhasil dikirim' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ success: false, message: 'Data tidak valid' }, { status: 400 })
    }
    console.error('RSVP POST error:', error)
    return Response.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('rsvp')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase RSVP fetch error:', error)
      return Response.json({ data: [], total: 0 })
    }

    // Map snake_case DB columns → camelCase untuk frontend
    const mapped = (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      attendance: row.attendance,
      guestCount: row.guest_count,
      message: row.message,
      invitationSlug: row.invitation_slug,
      createdAt: row.created_at,
    }))

    return Response.json({ data: mapped, total: mapped.length })
  } catch (error) {
    console.error('RSVP GET error:', error)
    return Response.json({ data: [], total: 0 })
  }
}
