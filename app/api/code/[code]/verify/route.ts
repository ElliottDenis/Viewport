// app/api/code/[code]/verify/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createServiceClient } from "../../../../../lib/supabaseClient";

export async function POST(req: Request, { params }: { params: { code: string } }) {
  const code = params.code;
  const svc = createServiceClient();

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const pin = String(body?.pin ?? "");

  if (!pin) return NextResponse.json({ error: "pin required" }, { status: 400 });

  try {
    const { data: obj, error: objErr } = await svc
      .from("objects")
      .select("id, kind, title, text_content, storage_path, mime_type, pin_protected, pin_hash, pin_expires_at")
      .eq("code", code)
      .single();

    if (objErr || !obj) return NextResponse.json({ error: "not found" }, { status: 404 });

    // if not pin-protected, return content (so client can call verify route as fallback)
    if (!obj.pin_protected) {
      if (obj.kind === "text") {
        return NextResponse.json({ id: obj.id, kind: "text", text: obj.text_content, title: obj.title ?? null });
      }

      const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? "locker";
      const { data: signed, error: sErr } = await svc.storage.from(bucket).createSignedUrl(obj.storage_path, 600);
      if (sErr || !(signed as any)?.signedUrl) return NextResponse.json({ error: "file missing" }, { status: 404 });

      return NextResponse.json({
        id: obj.id,
        kind: obj.kind,
        url: (signed as any).signedUrl,
        mimeType: obj.mime_type,
        title: obj.title ?? null,
      });
    }

    // PIN protected: check expiry
    if (obj.pin_expires_at && new Date(obj.pin_expires_at) < new Date()) {
      return NextResponse.json({ error: "pin expired" }, { status: 403 });
    }

    const match = await bcrypt.compare(pin, obj.pin_hash ?? "");
    if (!match) {
      return NextResponse.json({ error: "invalid pin" }, { status: 403 });
    }

    // PIN OK → return content
    if (obj.kind === "text") {
      return NextResponse.json({ id: obj.id, kind: "text", text: obj.text_content, title: obj.title ?? null });
    }

    const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? "locker";
    const { data: signed, error: sErr2 } = await svc.storage.from(bucket).createSignedUrl(obj.storage_path, 600);
    if (sErr2 || !(signed as any)?.signedUrl) return NextResponse.json({ error: "file missing" }, { status: 404 });

    return NextResponse.json({
      id: obj.id,
      kind: obj.kind,
      url: (signed as any).signedUrl,
      mimeType: obj.mime_type,
      title: obj.title ?? null,
    });
  } catch (err: any) {
    console.error("verify route error:", err);
    return NextResponse.json({ error: err?.message ?? "internal" }, { status: 500 });
  }
}