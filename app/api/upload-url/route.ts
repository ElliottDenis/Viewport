// app/api/upload-url/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = body?.path;
    const expires = body?.expires ?? 120; // seconds

    if (!path) return NextResponse.json({ error: "missing path" }, { status: 400 });

    const svc = createServiceClient();
    const bucket = process.env.STORAGE_BUCKET || "locker";

    const { data, error } = await svc.storage.from(bucket).createSignedUploadUrl(path, expires);

    if (error) {
      console.error("createSignedUploadUrl error", error);
      return NextResponse.json({ error: error.message || "create signed upload url failed" }, { status: 500 });
    }

    // normalize field name for client convenience
    return NextResponse.json({ signedUploadUrl: (data as any)?.signedUploadUrl || (data as any)?.signedUrl || (data as any)?.signedUploadUrl }, { status: 200 });
  } catch (err:any) {
    console.error("upload-url unexpected error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}