// Backup for routes/api/objects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { data: obj, error } = await supabaseService
    .from('objects')
    .select('id, kind, text_content, storage_path, downloads_allowed, expires_at, mime_type')
    .eq('id', params.id)
    .single();

  if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (obj.expires_at && new Date(obj.expires_at) < new Date()) {
    return NextResponse.json({ error: 'Expired' }, { status: 410 });
  }

  if (obj.kind === 'text') {
    return NextResponse.json({ kind: 'text', text: obj.text_content });
  }

  if (!obj.storage_path) {
    return NextResponse.json({ error: 'File not ready' }, { status: 409 });
  }

  const { data: urlData, error: urlErr } = await supabaseService
    .storage.from(process.env.SUPABASE_BUCKET!)
    .createSignedUrl(obj.storage_path, 60); // 60s

  if (urlErr) return NextResponse.json({ error: urlErr.message }, { status: 500 });

  return NextResponse.json({ kind: obj.kind as 'image' | 'video' | 'doc', url: urlData.signedUrl, mimeType: obj.mime_type || undefined });
}
