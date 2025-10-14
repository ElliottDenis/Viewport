import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';

export async function GET(_: Request, { params }: { params: { code: string } }) {
  const code = params.code.toUpperCase();
  const { data, error } = await supabaseService
    .from('objects')
    .select('id, kind, title, downloads_allowed, expires_at, mime_type, bytes')
    .eq('code', code)
    .single();

  if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ error: 'Expired' }, { status: 410 });
  }

  const { id, ...rest } = data;
  return NextResponse.json({ id, ...rest }); 
}
