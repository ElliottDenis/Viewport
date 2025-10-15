import bcrypt from "bcryptjs";
import crypto from "crypto";
import { createServiceClient } from "../../../lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const svc = createServiceClient();
  const body = await req.json();

  // determine recipient: null => general channel
  const recipient = body.recipient_account_id ?? null;

  const id = crypto.randomUUID();
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  const filename = (body.filename || "upload").replace(/\s+/g, "_").slice(0,200);
  const storage_path = `objects/${id}/${filename}`;

  // if general channel, generate 4-digit PIN (string)
  let pinPlain: string | null = null;
  let pinHash: string | null = null;
  let pinProtected = false;
  let pinExpiresAt: string | null = null;

  if (recipient === null) {
    pinPlain = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
    pinHash = await bcrypt.hash(pinPlain, 10);
    pinProtected = true;
    // optional TTL: 24 hours
    pinExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  }

  const insertPayload: any = {
    id,
    code,
    kind: body.kind,
    title: body.title ?? null,
    text_content: body.text_content ?? null,
    storage_path,
    mime_type: body.mimeType ?? null,
    bytes: body.bytes ?? null,
    recipient_account_id: recipient,
    pin_protected: pinProtected,
    pin_hash: pinHash,
    pin_expires_at: pinExpiresAt,
    uploader_user_id: body.uploader_user_id ?? null
  };

  const { data, error } = await svc.from("objects").insert(insertPayload).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // return id, storage_path, code and (only once) the plain PIN if set
  const resp: any = { id: data.id, storage_path: data.storage_path, code: data.code };
  if (pinPlain) resp.pin = pinPlain; // send PIN one time to uploader

  return NextResponse.json(resp);
}