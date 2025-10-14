// app/api/objects/[id]/delete/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../../lib/supabaseClient";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const svc = createServiceClient();
  const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? "locker";

  const { data: obj, error } = await svc.from("objects").select("storage_path").eq("id", id).single();
  if (error || !obj) return NextResponse.json({ error: "not found" }, { status: 404 });

  try {
    await svc.storage.from(bucket).remove([obj.storage_path]);
  } catch (remErr) {
    console.warn("storage removal error", remErr);
  }

  try {
    await svc.from("objects").delete().eq("id", id);
  } catch (delErr) {
    console.warn("db delete error", delErr);
  }

  return NextResponse.json({ ok: true });
}