// app/api/code/[code]/meta/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../../lib/supabaseClient";

export async function GET(_req: Request, { params }: { params: { code: string } }) {
  const code = params.code;
  const svc = createServiceClient();

  try {
    const { data: obj, error } = await svc
      .from("objects")
      .select("id, kind, title, pin_protected")
      .eq("code", code)
      .single();

    if (error || !obj) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: obj.id,
      kind: obj.kind,
      title: obj.title ?? null,
      pin_protected: !!obj.pin_protected,
    });
  } catch (err: any) {
    console.error("meta route error:", err);
    return NextResponse.json({ error: err?.message ?? "internal" }, { status: 500 });
  }
}