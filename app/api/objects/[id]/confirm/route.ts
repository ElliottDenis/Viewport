// app/api/objects/[id]/confirm/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../../lib/supabaseServer";

const BUCKET = process.env.STORAGE_BUCKET ?? "locker";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const svc = createServiceClient();

  try {
    console.log("[confirm] called for id=", id);

    // 1) fetch the object row (use service client to avoid RLS)
    const { data: objRow, error: findErr } = await svc
      .from("objects")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (findErr) {
      console.error("[confirm] DB lookup error", findErr);
      return NextResponse.json({ error: findErr.message ?? "DB lookup failed" }, { status: 500 });
    }
    if (!objRow) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    console.log("[confirm] objRow:", { id: objRow.id, storage_path: objRow.storage_path, kind: objRow.kind });

    // 2) If this is text-only, nothing to check in storage — return success payload
    if (objRow.kind === "text" || !objRow.storage_path) {
      // return the text content and metadata
      return NextResponse.json({
        id: objRow.id,
        kind: "text",
        title: objRow.title ?? null,
        text: objRow.text_content ?? "",
      });
    }

    // 3) For file types, ensure file exists and generate a signed URL
    const storagePath = objRow.storage_path as string;
    if (!storagePath) {
      console.error("[confirm] missing storage_path for non-text object", objRow);
      return NextResponse.json({ error: "missing_storage_path" }, { status: 500 });
    }

    // create signed URL (short-lived)
    const { data: signedData, error: signedErr } = await svc.storage
      .from(BUCKET)
      .createSignedUrl(storagePath, 60); // 60s valid

    if (signedErr) {
      console.error("[confirm] createSignedUrl error", signedErr);
      // If the file was not found, signedErr.message may hint that
      return NextResponse.json(
        { error: signedErr.message ?? "failed_to_create_signed_url" },
        { status: 500 }
      );
    }

    // signedData contains signedUrl (note name signedUrl)
    const signedUrl = (signedData as any)?.signedUrl;
    if (!signedUrl) {
      console.error("[confirm] no signed URL returned", signedData);
      return NextResponse.json({ error: "no_signed_url" }, { status: 500 });
    }

    // 4) Return file response (kind + url + mime)
    return NextResponse.json({
      id: objRow.id,
      kind: objRow.kind,
      title: objRow.title ?? null,
      url: signedUrl,
      mimeType: objRow.mime_type ?? null,
    });
  } catch (err: any) {
    console.error("[confirm] unexpected error:", err);
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}