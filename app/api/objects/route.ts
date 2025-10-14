import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabaseClient";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { kind, title, mimeType, bytes, text_content } = body;

    if (!kind) return NextResponse.json({ error: "kind required" }, { status: 400 });

    const id = crypto.randomUUID();
    const code = (Math.random().toString(36).slice(2, 8)).toUpperCase();

    const filename = kind === "text" ? "content.txt" : (body.title || "upload");
    const sanitized = filename.replace(/\\s+/g, "_").slice(0, 200);
    const storagePath = `objects/${id}/${sanitized}`;

    const svc = createServiceClient();
    const { data, error } = await svc.from("objects").insert({
      id,
      code,
      kind,
      title: title ?? null,
      text_content: text_content ?? null,
      storage_path: storagePath,
      mime_type: mimeType ?? null,
      bytes: bytes ?? null,
    }).select().single();

    if (error) {
      console.error("Insert error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id, code, storage_path: storagePath });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message ?? "unknown" }, { status: 500 });
  }
}
