import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../lib/supabaseClient";

export async function GET(_req: Request, { params }: { params: { code: string } }) {
  const code = params.code;
  const svc = createServiceClient();

  const { data: obj, error } = await svc
    .from("objects")
    .select("kind, title, text_content, storage_path, mime_type")
    .eq("code", code)
    .single();

  if (error || !obj) return NextResponse.json({ error: "not found" }, { status: 404 });

  if (obj.kind === "text") {
    return NextResponse.json({ kind: "text", text: obj.text_content, title: obj.title });
  }

  const bucket = "locker";
  const { data: signed, error: sErr } = await svc.storage
    .from(bucket)
    .createSignedUrl(obj.storage_path, 600);

  if (sErr || !signed?.signedUrl) return NextResponse.json({ error: "file missing" }, { status: 404 });

  return NextResponse.json({
    kind: obj.kind,
    url: signed.signedUrl,
    mimeType: obj.mime_type,
    title: obj.title,
  });
}
