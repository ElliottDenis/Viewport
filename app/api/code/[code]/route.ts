// app/api/code/[code]/route.ts
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../lib/supabaseServer";

export async function GET(req: Request, { params }: { params: { code: string } }) {
  try {
    const svc = createServiceClient();
    const { code } = params;

    // find object row
    const { data: obj, error: objErr } = await svc.from("objects").select("*").eq("code", code).single();
    if (objErr || !obj) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // if PIN protected => client should show PIN UI and call verify route
    if (obj.pin_protected) {
      return NextResponse.json({ error: "pin required", pin_protected: true }, { status: 403 });
    }

    // If recipient_account_id exists => require membership or uploader (must provide bearer token)
    if (obj.recipient_account_id) {
      const authHeader = req.headers.get("authorization") || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : null;
      if (!token) return NextResponse.json({ error: "Authentication required", status: 401 }, { status: 401 });

      // Resolve user from token
      const { data: userData, error: userErr } = await svc.auth.getUser(token);
      if (userErr || !userData?.user) return NextResponse.json({ error: "Invalid token", status: 401 }, { status: 401 });

      const uid = userData.user.id;

      // uploader allowed
      if (obj.uploader_user_id === uid) {
        // ok
      } else {
        // Check membership
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

    // Authorized -> return content: text or signed url for file
    if (obj.kind === "text") {
      return NextResponse.json({ id: obj.id, kind: "text", text: obj.text_content, title: obj.title });
    }

    // create signed url for file
    const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "locker";
    const { data: signed, error: signedErr } = await svc.storage.from(bucket).createSignedUrl(obj.storage_path, 300);
    if (signedErr) return NextResponse.json({ error: signedErr.message }, { status: 500 });

    const signedUrl = (signed as any).signedUrl || (signed as any).signed_url || null;
    return NextResponse.json({ id: obj.id, kind: obj.kind, url: signedUrl, title: obj.title, text_content: obj.text_content ?? null });
  } catch (err: any) {
    console.error("code GET error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}