import { NextRequest } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

const wishSchema = z.object({
  name: z.string().min(2),
  message: z.string().min(5),
  invitationSlug: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = wishSchema.parse(body)

    const { data: inserted, error } = await supabase
      .from('wishes')
      .insert({
        name: data.name,
        message: data.message,
        invitation_slug: data.invitationSlug,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase wishes insert error:', error)
      return Response.json({ success: false, message: 'Gagal menyimpan ucapan' }, { status: 500 })
    }

    return Response.json({
      success: true,
      data: {
        id: inserted.id,
        name: inserted.name,
        message: inserted.message,
        invitationSlug: inserted.invitation_slug,
        createdAt: inserted.created_at,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ success: false, message: 'Data tidak valid' }, { status: 400 })
    }
    console.error('Wishes POST error:', error)
    return Response.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    let query = supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })

    if (slug) {
      query = query.eq('invitation_slug', slug)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase wishes fetch error:', error)
      return Response.json({ data: [], total: 0 })
    }

    const mapped = (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      message: row.message,
      invitationSlug: row.invitation_slug,
      createdAt: row.created_at,
    }))

    return Response.json({ data: mapped, total: mapped.length })
  } catch (error) {
    console.error('Wishes GET error:', error)
    return Response.json({ data: [], total: 0 })
  }
}
