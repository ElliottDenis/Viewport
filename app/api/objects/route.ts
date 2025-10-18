// app/api/objects/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabaseServer";
import crypto from "crypto";

function randomCode(len = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.randomBytes(len);
  let out = "";
  for (let i = 0; i < len; i++) out += chars[bytes[i] % chars.length];
  return out;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const svc = createServiceClient();

    // app/api/objects/route.ts (inside POST handler)
    const { recipient_account_id } = body; // your request body variable

    if (recipient_account_id) {
      const { data: acct, error: acctErr } = await svc
        .from("accounts")
        .select("id, verified")
        .eq("id", recipient_account_id)
        .single();

      if (acctErr || !acct) {
        return NextResponse.json({ error: "Recipient account not found" }, { status: 400 });
      }

      if (!acct.verified) {
        return NextResponse.json({ error: "Recipient account is not available" }, { status: 403 });
      }
    }

    const {
      kind,
      title,
      mime_type,
      bytes,
      text_content,
      filename,
      channel,
      pin_protected: clientPinProtected,
      custom_code,
      view_limit,
      uploader_user_id,
    } = body;

    // Basic validation
    if (!kind || !["text", "image", "video", "doc"].includes(kind)) {
      return NextResponse.json({ error: "Invalid kind" }, { status: 400 });
    }

    // Prepare identifiers
    const id = crypto.randomUUID();
    const code = typeof custom_code === "string" && custom_code.trim().length > 0 ? custom_code.trim() : randomCode(6);
    const filenameSafe = typeof filename === "string" ? filename.replace(/^\/+/, "").replace(/\s+/g, "_") : null;
    const storage_path = filenameSafe ? `objects/${id}/${filenameSafe}` : null;

    // Decide pin protection: client hint or default to channel/general
    let pinProtected = !!clientPinProtected || channel === "general";

    // If recipient is an insight account, we typically don't pin protect
    if (recipient_account_id) {
      const { data: acct } = await svc.from("accounts").select("role").eq("id", recipient_account_id).single();
      if (acct?.role === "insight") pinProtected = false;
    }

    // Generate PIN if needed (one-time plaintext returned). We store hash
    let pinPlain: string | null = null;
    let pinHash: string | null = null;
    if (pinProtected) {
      pinPlain = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
      pinHash = crypto.createHash("sha256").update(pinPlain).digest("hex");
    }

    // Build row to insert (service client bypasses RLS)
    const row: any = {
      id,
      code,
      kind,
      title: title ?? null,
      text_content: text_content ?? null,
      storage_path,
      mime_type: mime_type ?? null,
      bytes: bytes ?? null,
      recipient_account_id: recipient_account_id ?? null,
      channel: channel ?? null,
      pin_protected: !!pinProtected,
      pin_hash: pinHash,
      uploader_user_id: uploader_user_id ?? null,
      custom_code: typeof custom_code === "string" ? custom_code : null,
      view_limit: typeof view_limit === "number" ? view_limit : null,
      views_used: 0,
    };

    const { data, error } = await svc.from("objects").insert(row).select().single();
    if (error) {
      console.error("objects insert error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const resp: any = { id: data.id, storage_path: data.storage_path, code: data.code };
    if (pinPlain) resp.pin = pinPlain; // show one-time PIN to uploader only
    return NextResponse.json(resp, { status: 201 });
  } catch (err: any) {
    console.error("objects POST error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}