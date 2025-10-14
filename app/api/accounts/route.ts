// app/api/accounts/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabaseClient";


export async function GET() {
  try {
    const svc = createServiceClient(); // server-side
    const { data, error } = await svc.from("accounts").select("id,slug,name");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "unknown" }, { status: 500 });
  }
}