// app/api/account/signup/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { email, password, name, role = "individual", slug } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Missing email/password" }, { status: 400 });

    const svc = createServiceClient();

    // create auth user (service role)
    const { data: createRes, error: createErr } = await svc.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true,
    });
    if (createErr) return NextResponse.json({ error: createErr.message }, { status: 500 });

    const userId = createRes.user.id;

    // create accounts row (id = auth user id) for company/insight account
    const { data: acc, error: accErr } = await svc
      .from("accounts")
      .insert({ id: userId, name: name ?? null, slug: slug ?? null, role, verified: true })
      .select()
      .single();

    if (accErr) return NextResponse.json({ error: accErr.message }, { status: 500 });

    // add membership row so the creator is a member
    const { error: memErr } = await svc.from("accounts_members").insert({
      account_id: acc.id,
      user_id: userId,
      role: "owner",
    });
    if (memErr) console.warn("membership insert failed", memErr);

    return NextResponse.json({ ok: true, account: acc, userId }, { status: 201 });
  } catch (err: any) {
    console.error("signup error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}