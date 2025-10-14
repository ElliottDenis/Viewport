import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';
import { randomUUID } from 'crypto';
import { MAX_FILE_BYTES } from '@/lib/limits';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { filename, mimeType, size } = await req.json();

  if (!filename) return NextResponse.json({ error: 'filename required' }, { status: 400 });
  if (typeof size !== 'number') {
    return NextResponse.json({ error: 'size (bytes) required' }, { status: 400 });
  }
  if (size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: `File too large (>${MAX_FILE_BYTES} bytes)` }, { status: 413 });
  }

  const key = `objects/${params.id}/${encodeURIComponent(randomUUID())}-${encodeURIComponent(filename)}`;

  const { data: signed, error } = await supabaseService
    .storage.from(process.env.SUPABASE_BUCKET!)
    .createSignedUploadUrl(key);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ uploadUrl: signed.signedUrl, storagePath: key, mimeType });
}


