import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../lib/supabaseClient";

export async function GET(_req: Request, { params }: { params: { code: string } }) {
  try {
    const code = params.code;
    const svc = createServiceClient();

    const { data: obj, error } = await svc
      .from("objects")
      .select("id, kind, title, text_content, storage_path, mime_type, bytes, visibility")
      .eq("code", code)
      .single();

    if (error || !obj) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    if (obj.kind === "text") {
      return NextResponse.json({ kind: "text", text: obj.text_content, title: obj.title || null });
    }

    // generate signed URL via service client
    const bucket = "objects";
    const path = obj.storage_path;
    const { data: signed, error: sErr } = await svc.storage.from(bucket).createSignedUrl(path, 60);
    if (sErr) {
      console.error("signed url error", sErr);
      return NextResponse.json({ error: "signed url failed" }, { status: 500 });
    }

    // signed may come back as { signedUrl: string } depending on SDK
    const signedUrl = (signed && (signed as any).signedUrl) || (signed && (signed as any).signedURL) || (signed as any);

    return NextResponse.json({
      kind: obj.kind,
      url: signedUrl,
      mimeType: obj.mime_type || null,
      title: obj.title || null,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
