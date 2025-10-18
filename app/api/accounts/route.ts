// app/api/accounts/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabaseServer";

export async function GET() {
  try {
    const svc = createServiceClient();
    const { data, error } = await svc
      .from("accounts")
      .select("id, display_name, name, slug, role, verified")
      .eq("verified", true)
      .order("display_name", { ascending: true });

    if (error) {
      console.error("GET /api/accounts error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}