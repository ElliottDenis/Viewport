// app/api/objects/[id]/confirm/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../../lib/supabaseClient";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const svc = createServiceClient();

    // fetch object row
    const { data: obj, error: fetchErr } = await svc.from("objects").select().eq("id", id).single();
    if (fetchErr || !obj) {
      console.error("object fetch error", fetchErr);
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    if (!obj.storage_path) {
      return NextResponse.json({ error: "no storage path" }, { status: 400 });
    }

    const bucket = "objects"; // change to "locker" if your Supabase bucket is named locker
    const path = obj.storage_path; // e.g. "objects/<id>/filename.ext"

    // derive folder and filename from path
    const parts = path.split("/").filter(Boolean);
    const fileName = parts.pop()!;
    const folder = parts.join("/"); // may be "objects/<id>"

    let bytes: number | null = obj.bytes ?? null;

    try {
      // list files in the folder and find the file entry to read metadata.size
      const { data: files, error: listErr } = await svc.storage.from(bucket).list(folder || "", {
        limit: 100,
        offset: 0,
        // older SDKs had 'search' filter — using list + find is more robust across versions
      });

      if (listErr) {
        console.warn("storage list error (confirm):", listErr);
      } else if (Array.isArray(files)) {
        const found = files.find((f: any) => f.name === fileName);
        if (found) {
          // some SDK versions put size on found.size or found.metadata.size
          bytes = (found as any).size ?? (found as any).metadata?.size ?? bytes;
        } else {
          // file not found in list — leave bytes as-is (maybe text object or already recorded)
          console.warn("file not found in storage list for path:", path);
        }
      }
    } catch (e) {
      console.warn("error while checking storage metadata:", e);
    }

    // update the object row with bytes if we have a value
    const updatePayload: any = {};
    if (bytes !== null) updatePayload.bytes = bytes;

    const { error: updErr } = await svc.from("objects").update(updatePayload).eq("id", id);
    if (updErr) {
      console.error("update error", updErr);
      return NextResponse.json({ error: updErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, bytes });
  } catch (err: any) {
    console.error("confirm route error", err);
    return NextResponse.json({ error: err?.message ?? "internal" }, { status: 500 });
  }
}