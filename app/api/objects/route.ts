import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';
import { makeCode } from '@/lib/code';

export async function POST(req: NextRequest) {
  const { kind, title, downloadsAllowed = true, expiresInHours, textContent, filename, mimeType } = await req.json();

  if (!['image','video','doc','text'].includes(kind)) {
    return NextResponse.json({ error: 'invalid kind' }, { status: 400 });
  }

  const code = makeCode();
  const expires_at = expiresInHours ? new Date(Date.now() + expiresInHours*3600*1000).toISOString() : null;

  const { data, error } = await supabaseService
    .from('objects')
    .insert([{
      code,
      kind,
      title: title || null,
      downloads_allowed: !!downloadsAllowed,
      expires_at,
      text_content: kind === 'text' ? (textContent || '') : null,
      mime_type: kind === 'text' ? 'text/plain' : (mimeType || null),
      bytes: null,
      storage_path: null
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ id: data.id, code });
}
