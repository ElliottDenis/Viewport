// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabaseClient";

// export const runtime = "node";

export async function POST(req: Request) {
  try {
    const svc = createServiceClient(); // uses SUPABASE_SERVICE_ROLE_KEY
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const storagePath = String(form.get("storagePath") || "");
    const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "locker";

    if (!file || !storagePath) return NextResponse.json({ error: "missing" }, { status: 400 });

    const buf = Buffer.from(await (file as File).arrayBuffer());

    const { data, error } = await svc.storage.from(bucket).upload(storagePath, buf, {
      cacheControl: "3600",
      upsert: true,
    });

    if (error) {
      console.error("server upload error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    console.error("upload route error", err);
    return NextResponse.json({ error: err?.message || "internal" }, { status: 500 });
  }
}