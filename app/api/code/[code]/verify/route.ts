// app/api/code/[code]/verify/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../../lib/supabaseServer";
import crypto from "crypto";

export async function POST(req: Request, { params }: { params: { code: string } }) {
  const code = params.code;
  const svc = createServiceClient();

  try {
    const body = await req.json().catch(() => ({}));
    const providedPin = (body && body.pin) ? String(body.pin).trim() : "";

    console.log("[verify] code=", code, "providedPin=", providedPin ? "<REDACTED>" : "<empty>");

    // find object by code
    const { data: objRow, error: findErr } = await svc
      .from("objects")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    if (findErr) {
      console.error("[verify] DB lookup error", findErr);
      return NextResponse.json({ error: "db_error" }, { status: 500 });
    }
    if (!objRow) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    if (!objRow.pin_protected) {
      // not protected — return content directly (or instruct client to GET)
      return NextResponse.json({ error: "not_pin_protected", pin_protected: false }, { status: 400 });
    }

    if (!providedPin || providedPin.length !== 4) {
      return NextResponse.json({ error: "pin_required", pin_protected: true }, { status: 403 });
    }

    // compute SHA-256 of provided PIN (same as creation)
    const providedHash = crypto.createHash("sha256").update(providedPin).digest("hex");

    // compare with stored hash
    if (!objRow.pin_hash || providedHash !== objRow.pin_hash) {
      console.warn("[verify] pin mismatch for code=", code, { providedHash, storedExists: !!objRow.pin_hash });
      return NextResponse.json({ error: "invalid_pin", pin_protected: true }, { status: 403 });
    }

    // PIN OK -> return full content (for text or file, similar to confirm)
    if (objRow.kind === "text" || !objRow.storage_path) {
      return NextResponse.json({
        id: objRow.id,
        kind: "text",
        title: objRow.title ?? null,
        text: objRow.text_content ?? "",
      });
    }

    // file -> create signed URL
    const BUCKET = process.env.STORAGE_BUCKET ?? "locker";
    const { data: signedData, error: signedErr } = await svc.storage.from(BUCKET).createSignedUrl(objRow.storage_path, 60);
    if (signedErr) {
      console.error("[verify] createSignedUrl error", signedErr);
      return NextResponse.json({ error: "failed_to_create_signed_url" }, { status: 500 });
    }
    const signedUrl = (signedData as any)?.signedUrl;
    return NextResponse.json({
      id: objRow.id,
      kind: objRow.kind,
      title: objRow.title ?? null,
      url: signedUrl,
      mimeType: objRow.mime_type ?? null,
    });
  } catch (err: any) {
    console.error("[verify] unexpected error:", err);
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}