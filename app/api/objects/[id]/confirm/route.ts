import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../../lib/supabaseClient";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const svc = createServiceClient();

  const { data: obj, error } = await svc.from("objects").select().eq("id", id).single();
  if (error || !obj) return NextResponse.json({ error: "not found" }, { status: 404 });

  const bucket = "locker"; // must match your bucket
  const path = obj.storage_path;

  // verify file exists
  const folder = path.split("/").slice(0, -1).join("/");
  const filename = path.split("/").pop()!;
  const { data: files } = await svc.storage.from(bucket).list(folder);
  const found = files?.find((f: any) => f.name === filename);
  const bytes = (found as any)?.size ?? obj.bytes ?? null;

  await svc.from("objects").update({ bytes }).eq("id", id);
  return NextResponse.json({ ok: true, bytes });
}