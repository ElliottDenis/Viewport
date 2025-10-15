// app/api/code/[code]/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../lib/supabaseClient";

export async function GET(_req: Request, { params }: { params: { code: string } }) {
  const code = params.code;
  const svc = createServiceClient();

  // fetch object and include id
  const { data: obj, error: objErr } = await svc
    .from("objects")
    .select("id, kind, title, text_content, storage_path, mime_type, pin_protected")
    .eq("code", code)
    .single();

  if (objErr || !obj) return NextResponse.json({ error: "not found" }, { status: 404 });

  // if pin protected, instruct client to call /meta or /verify instead
  if (obj.pin_protected) {
    return NextResponse.json({ error: "pin required", pin_protected: true }, { status: 403 });
  }

  // text case
  if (obj.kind === "text") {
    return NextResponse.json({
      id: obj.id,
      kind: "text",
      text: obj.text_content,
      title: obj.title ?? null,
    });
  }

  // file case — return signed URL
  const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? "locker";
  const { data: signed, error: sErr } = await svc.storage.from(bucket).createSignedUrl(obj.storage_path, 600);

  if (sErr || !(signed as any)?.signedUrl) {
    return NextResponse.json({ error: "file missing" }, { status: 404 });
  }

  return NextResponse.json({
    id: obj.id,
    kind: obj.kind,
    url: (signed as any).signedUrl,
    mimeType: obj.mime_type,
    title: obj.title ?? null,
  });
}
