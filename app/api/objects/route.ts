import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabaseClient";
import crypto from "crypto";

const svc = createServiceClient();

export async function POST(req: Request) {

  console.log("SERVICE KEY PRESENT?", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  const svc = createServiceClient();
  console.log("USING SVC CLIENT for insert", !!svc);
  const body = await req.json();

  const id = crypto.randomUUID();
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  const filename = (body.filename || "upload").replace(/\s+/g, "_").slice(0, 200);
  const storage_path = `objects/${id}/${filename}`;

  const { data, error } = await svc.from("objects").insert({
    id,
    code,
    kind: body.kind,
    title: body.title ?? null,
    text_content: body.text_content ?? null,
    storage_path,
    mime_type: body.mimeType ?? null,
    bytes: body.bytes ?? null,
    recipient_account_id: body.recipient_account_id ?? null,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id, code, storage_path });
}
