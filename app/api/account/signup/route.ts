import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../lib/supabaseServer";
import crypto from "crypto";

function makeSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export async function POST(req: Request) {
  try {
    const { email, password, name, display_name, role = "individual" } = await req.json();

    if (!email || !password)
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });

    const svc = createServiceClient();

    // create auth user
    const { data: userData, error: userErr } = await svc.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, display_name },
    });
    if (userErr) throw userErr;

    const userId = userData.user.id;
    const safeName = name || email.split("@")[0];
    const safeDisplay = display_name || safeName;
    const slug = makeSlug(safeDisplay);

    // insert account row
    const { data: acc, error: accErr } = await svc
      .from("accounts")
      .insert({
        id: userId,
        name: safeName,
        display_name: safeDisplay,
        slug,
        role,
        verified: true,
      })
      .select()
      .single();
    if (accErr) throw accErr;

    // add membership
    await svc.from("accounts_members").insert({
      account_id: userId,
      user_id: userId,
      role: "owner",
    });

    return NextResponse.json({ ok: true, account: acc, userId }, { status: 201 });
  } catch (err: any) {
    console.error("signup error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}