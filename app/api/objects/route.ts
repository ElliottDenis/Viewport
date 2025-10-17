import crypto from "crypto";
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabaseServer";

function randomCode(len = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.randomBytes(len);
  let out = "";
  for (let i = 0; i < len; i++) out += chars[bytes[i] % chars.length];
  return out;
}

function generatePin() {
  return String(Math.floor(Math.random() * 10000)).padStart(4, "0");
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const svc = createServiceClient();

  const id = crypto.randomUUID();
  const code = randomCode(6);
  const filename = body.filename ? String(body.filename).replace(/\s+/g, "_") : null;
  const storage_path = filename ? `objects/${id}/${filename}` : null;

  // decide whether to pin-protect
  const pin_protected = !!body.pin_protected;
  let pinPlain: string | null = null;
  let pinHash: string | null = null;
  if (pin_protected) {
    pinPlain = generatePin(); // e.g. "0042"
    pinHash = crypto.createHash("sha256").update(pinPlain).digest("hex");
  }

  const row: any = {
    id,
    code,
    kind: body.kind,
    title: body.title ?? null,
    text_content: body.text_content ?? null,
    storage_path,
    mime_type: body.mime_type ?? null,
    bytes: body.bytes ?? null,
    recipient_account_id: body.recipient_account_id ?? null,
    channel: body.channel ?? null,
    pin_protected,
    pin_hash: pinHash,
  };

  const { data, error } = await svc.from("objects").insert(row).select().single();
  if (error) {
    console.error("insert error", error);
    return NextResponse.json({ error: error.message ?? "Insert failed" }, { status: 500 });
  }

  const resp: any = { id: data.id, storage_path: data.storage_path, code: data.code };
  if (pinPlain) resp.pin = pinPlain; // return plaintext once
  return NextResponse.json(resp, { status: 201 });
}