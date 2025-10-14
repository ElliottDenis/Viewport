import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabaseService
    .from('objects')
    .select('id, title, kind, downloads_allowed, expires_at, mime_type, bytes')
    .eq('id', params.id)
    .single();

  if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}
