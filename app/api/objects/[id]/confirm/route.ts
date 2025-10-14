import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';
import { MAX_FILE_BYTES } from '@/lib/limits';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { storagePath, mimeType } = await req.json();
  if (!storagePath) return NextResponse.json({ error: 'storagePath required' }, { status: 400 });

  // DERIVE folder + basename
  const parts = String(storagePath).split('/');
  const baseName = parts.pop()!;
  const dir = parts.join('/'); // e.g. "objects/<id>"

  // Ask storage for file list in this folder and find our file entry
  const { data: list, error: listErr } = await supabaseService
    .storage.from(process.env.SUPABASE_BUCKET!)
    .list(dir.replace(/^\/+/, ''), { limit: 1000 });

  if (listErr) return NextResponse.json({ error: listErr.message }, { status: 500 });

  const entry = list?.find((f) => f.name === baseName);
  const size = entry?.metadata?.size; // size field depending on SDK version

  if (typeof size === 'number' && size > MAX_FILE_BYTES) {
    // delete the oversized file and reject
    await supabaseService.storage.from(process.env.SUPABASE_BUCKET!).remove([storagePath]);
    return NextResponse.json(
      { error: `File too large after upload (>${MAX_FILE_BYTES} bytes). File removed.` },
      { status: 413 }
    );
  }

  // OK — update DB with metadata
  const { error } = await supabaseService
    .from('objects')
    .update({ storage_path: storagePath, mime_type: mimeType || null, bytes: size ?? null })
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
