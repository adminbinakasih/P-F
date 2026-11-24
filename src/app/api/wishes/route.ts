import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug') || 'elianser-esra';

    // Fetch wishes from Supabase, only those with messages
    const { data, error } = await supabase
      .from('rsvp')
      .select('*')
      .eq('invitation_slug', slug)
      .not('message', 'is', null)
      .neq('message', '')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch wishes' },
        { status: 500 }
      );
    }

    // Transform data to match Wish type
    const wishes = data.map(item => ({
      id: item.id,
      name: item.name,
      message: item.message,
      attendance: item.attendance,
      createdAt: item.created_at,
    }));

    return NextResponse.json({
      success: true,
      wishes,
      count: wishes.length
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
