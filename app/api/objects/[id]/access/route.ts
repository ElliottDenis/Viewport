import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  // 1. Fetch object
  const { data: obj, error } = await supabaseService
    .from('objects')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (obj.expires_at && new Date(obj.expires_at) < new Date()) {
    return NextResponse.json({ error: 'Expired' }, { status: 410 });
  }

  // 2. Prepare response (text or signed URL)
  let response: any;
  if (obj.kind === 'text') {
    response = { kind: 'text', text: obj.text_content };
  } else {
    if (!obj.storage_path) {
      return NextResponse.json({ error: 'File not ready' }, { status: 409 });
    }
    const { data: urlData, error: urlErr } = await supabaseService
      .storage.from(process.env.SUPABASE_BUCKET!)
      .createSignedUrl(obj.storage_path, 60); // valid 60s

    if (urlErr) return NextResponse.json({ error: urlErr.message }, { status: 500 });
    response = { kind: obj.kind, url: urlData.signedUrl, mimeType: obj.mime_type || undefined };
  }

  // 3. Delete the DB row
  await supabaseService.from('objects').delete().eq('id', params.id);

  // 4. If it had a file, delete from storage too
  if (obj.storage_path) {
    await supabaseService.storage.from(process.env.SUPABASE_BUCKET!).remove([obj.storage_path]);
  }

  return NextResponse.json(response);
}