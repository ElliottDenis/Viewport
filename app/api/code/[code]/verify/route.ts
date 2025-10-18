// app/api/code/[code]/verify/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../../lib/supabaseServer";
import crypto from "crypto";

export async function POST(req: Request, { params }: { params: { code: string } }) {
  try {
    const svc = createServiceClient();
    const { code } = params;
    const { pin } = await req.json().catch(() => ({}));

    if (!pin || !/^\d{4}$/.test(String(pin))) {
      return NextResponse.json({ error: "Pin required" }, { status: 400 });
    }

    const { data: obj, error: objErr } = await svc.from("objects").select("*").eq("code", code).single();
    if (objErr || !obj) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (!obj.pin_protected || !obj.pin_hash) {
      return NextResponse.json({ error: "Not pin protected" }, { status: 400 });
    }

    const pinHash = crypto.createHash("sha256").update(String(pin)).digest("hex");
    if (pinHash !== obj.pin_hash) {
      return NextResponse.json({ error: "Invalid pin", pin_protected: true }, { status: 403 });
    }

    // PIN matches. Now apply same account membership checks as GET.
    if (obj.recipient_account_id) {
      const authHeader = req.headers.get("authorization") || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : null;
      if (!token) return NextResponse.json({ error: "Authentication required", status: 401 }, { status: 401 });

      const { data: userData, error: userErr } = await svc.auth.getUser(token);
      if (userErr || !userData?.user) return NextResponse.json({ error: "Invalid token", status: 401 }, { status: 401 });

      const uid = userData.user.id;
      if (obj.uploader_user_id !== uid) {
        const { data: members, error: memErr } = await svc
          .from("accounts_members")
          .select("*")
          .eq("account_id", obj.recipient_account_id)
          .eq("user_id", uid)
          .limit(1);
        if (memErr) return NextResponse.json({ error: memErr.message }, { status: 500 });
        if (!members || members.length === 0) return NextResponse.json({ error: "Forbidden", status: 403 }, { status: 403 });
      }
    }

    // At this point, allowed. Return content
    if (obj.kind === "text") {
      return NextResponse.json({ id: obj.id, kind: "text", text: obj.text_content, title: obj.title });
    }

    const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "locker";
    const { data: signed, error: signedErr } = await svc.storage.from(bucket).createSignedUrl(obj.storage_path, 300);
    if (signedErr) return NextResponse.json({ error: signedErr.message }, { status: 500 });

    const signedUrl = (signed as any).signedUrl || (signed as any).signed_url || null;

    // optionally increment views_used and enforce view_limit (atomic update)
    if (obj.view_limit && obj.view_limit > 0) {
      const newViews = (obj.views_used || 0) + 1;
      if (newViews > obj.view_limit) {
        return NextResponse.json({ error: "View limit exceeded" }, { status: 403 });
      }
      await svc.from("objects").update({ views_used: newViews }).eq("id", obj.id);
    }

    return NextResponse.json({ id: obj.id, kind: obj.kind, url: signedUrl, title: obj.title, text_content: obj.text_content ?? null });
  } catch (err: any) {
    console.error("verify POST error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}