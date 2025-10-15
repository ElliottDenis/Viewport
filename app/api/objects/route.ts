// app/api/objects/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabaseServer"; // adjust path if needed
import crypto from "crypto";

type ReqBody = {
  kind?: "image" | "video" | "doc" | "text";
  title?: string | null;
  mime_type?: string | null;
  bytes?: number | null;
  text_content?: string | null;
  recipient_account_id?: string | null;
  filename?: string | null; // original filename (optional)
  channel?: string | null;
  pin_protected?: boolean | null;
};

function randomCode(len = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // exclude ambiguous chars
  const bytes = crypto.randomBytes(len);
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[bytes[i] % chars.length];
  }
  return out;
}

function generatePin() {
  // 4-digit numeric PIN, zero-padded
  const n = Math.floor(Math.random() * 10000);
  return String(n).padStart(4, "0");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;

    // minimal validation
    if (!body.kind) {
      return NextResponse.json({ error: "Missing kind" }, { status: 400 });
    }

    const svc = createServiceClient(); // server-side service client
    // create deterministic id locally so we can build storage_path
    const id = crypto.randomUUID();
    const code = randomCode(6);

    // build storage path if filename present, otherwise null
    // e.g. "objects/{id}/{filename}"
    const filename = body.filename ?? null;
    const storage_path = filename ? `objects/${id}/${filename}` : null;

    // handle optional PIN generation
    let pinPlain: string | null = null;
    let pinHash: string | null = null;
    const pinProtected = !!body.pin_protected;

    if (pinProtected) {
      pinPlain = generatePin();
      // store HASH not plaintext
      pinHash = crypto.createHash("sha256").update(pinPlain).digest("hex");
    }

    // prepare row object matching your objects table columns (adjust field names to your schema)
    const row: any = {
      id,
      code,
      kind: body.kind,
      title: body.title ?? null,
      text_content: body.text_content ?? null,
      storage_path: storage_path,
      mime_type: body.mime_type ?? null,
      bytes: body.bytes ?? null,
      recipient_account_id: body.recipient_account_id ?? null,
      channel: body.channel ?? null,
      pin_protected: pinProtected,
      pin_hash: pinHash,
      // created_at should default to now() in DB; include anything else you need
    };

    // insert using service client so row-level security doesn't block write
    const { data, error } = await svc.from("objects").insert(row).select().single();

    if (error) {
      console.error("Supabase insert error", error);
      return NextResponse.json({ error: error.message ?? "Insert failed" }, { status: 500 });
    }

    // return id, storage_path, code, and PIN (only if created now)
    const resp: any = { id: data.id, storage_path: data.storage_path, code: data.code };
    if (pinPlain) resp.pin = pinPlain;

    return NextResponse.json(resp, { status: 201 });
  } catch (err: any) {
    console.error("objects POST error", err);
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}