// components/UploadForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// make display_name and slug optional in the shape
type Account = {
  id: string;
  slug?: string | null;
  name?: string | null;
  display_name?: string | null;
  role?: string | null;
};

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? "locker";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<string>("general");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  // inside your UploadForm component useEffect
useEffect(() => {
  let mounted = true;
  async function loadAccounts() {
    try {
      // no-store ensures we always get the latest from server
      const res = await fetch("/api/accounts", { cache: "no-store" });
      if (!res.ok) {
        console.error("Failed to load accounts:", await res.text());
        return;
      }
      const list = (await res.json()) as any[];
      // defensive filtering
      const valid = (list || []).filter(a => a && a.id && (a.display_name ?? a.name));
      if (mounted) setAccounts(valid);
    } catch (e) {
      console.error("loadAccounts error:", e);
    }
  }
  loadAccounts();
  return () => { mounted = false; };
}, []);

  function sanitizeFilename(name: string) {
    return name.replace(/\s+/g, "_").replace(/[^A-Za-z0-9._-]/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setCode(null);
    setPin(null);

    if (!file && !text.trim()) {
      setStatus("Please attach a file or enter some text to share.");
      return;
    }
    if (file && file.size > MAX_FILE_BYTES) {
      setStatus(`File too large — max ${(MAX_FILE_BYTES / 1024 / 1024).toFixed(1)} MB.`);
      return;
    }

    try {
      setStatus("Creating object metadata on server...");
      const kind = file ? (file.type.startsWith("image/") ? "image" : "doc") : "text";
      const recipient_account_id = (selectedTarget !== "general" && selectedTarget !== "public") ? selectedTarget : null;
      const pin_protected = selectedTarget === "general";

      const createBody: any = {
        kind,
        title: file ? file.name : text.slice(0,80) || "Untitled",
        mime_type: file ? file.type : null,
        bytes: file ? file.size : null,
        text_content: !file ? text : null,
        filename: file ? sanitizeFilename(file.name) : undefined,
        recipient_account_id,
        channel: selectedTarget,
        pin_protected,
        uploader_user_id: currentUserId ?? undefined,
      };

      const createRes = await fetch("/api/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createBody),
      });
      const createText = await createRes.text();
      if (!createRes.ok) {
        setStatus("Failed to create object: " + createText);
        return;
      }
      const createJson = JSON.parse(createText) as { id: string; storage_path: string | null; code: string; pin?: string };
      const { id, storage_path: serverStoragePath, code: returnedCode, pin: returnedPin } = createJson;

      // upload file if present
      if (file) {
        setStatus("Requesting signed upload URL...");
        const path = (serverStoragePath ?? `objects/${id}/${sanitizeFilename(file.name)}`).replace(/^\/+/, "");
        const urlRes = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path }),
        });
        const urlJson = await urlRes.json();
        if (!urlRes.ok) {
          setStatus("Failed to get upload URL: " + JSON.stringify(urlJson));
          return;
        }
        const signedUploadUrl = urlJson.signedUploadUrl || urlJson.signedUrl || urlJson.signed_upload_url;
        if (!signedUploadUrl) {
          setStatus("Server did not return a signed upload URL.");
          return;
        }

        // PUT the binary to the signed URL (don't use anon storage client because RLS/ACL)
        setStatus("Uploading file...");
        const putRes = await fetch(signedUploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type || "application/octet-stream" },
          body: file,
        });
        if (!putRes.ok) {
          const textErr = await putRes.text().catch(()=>String(putRes.status));
          setStatus("Upload failed: " + textErr);
          return;
        }
      }

      setStatus("Confirming upload...");
      const confirmRes = await fetch(`/api/objects/${id}/confirm`, { method: "POST" });
      const confirmText = await confirmRes.text();
      if (!confirmRes.ok) {
        setStatus("Confirm failed: " + confirmText);
        return;
      }

      setCode(returnedCode);
      if (returnedPin) setPin(returnedPin);
      setStatus("Done — code generated.");
    } catch (err: any) {
      console.error("[UploadForm] unexpected error:", err);
      setStatus("Error: " + (err?.message || String(err)));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label>Send to</label>
      <select value={selectedTarget} onChange={(e)=>setSelectedTarget(e.target.value)} className="p-2 rounded bg-[#0b0d11] text-gray-100">
        <option value="general">General (PIN protected)</option>
        <option value="public">Public (no PIN)</option>
        {accounts.map((a) => (
          <option key={a.id} value={a.id}>
            {a.display_name ?? a.name ?? a.slug ?? a.id}
          </option>
        ))}
      </select>

      <label>Text (optional)</label>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="p-2 rounded bg-[#0b0d11] text-gray-100" rows={4} />

      <label>File (optional)</label>
      <input type="file" onChange={(e)=>setFile(e.target.files?.[0] ?? null)} />

      <div className="flex gap-2">
        <button type="submit" className="px-3 py-2 bg-blue-500 rounded text-black">Upload</button>
        <button type="button" onClick={()=>{ setFile(null); setText(""); setSelectedTarget("general"); setStatus(null); setCode(null); setPin(null); }}>
          Reset
        </button>
      </div>

      {status && <div className="text-sm mt-2">{status}</div>}
      {code && (
        <div className="mt-3 p-3 bg-[#071024] rounded">
          <div>Share code:</div>
          <div className="flex gap-2 items-center">
            <div className="font-mono text-lg px-3 py-2 bg-[#0b1220] rounded">{code}</div>
            <button onClick={()=>navigator.clipboard.writeText(code+(pin?` (PIN: ${pin})`:""))} type="button">Copy</button>
          </div>
          {pin && <div className="mt-2 text-sm">PIN (save this): <span className="font-mono">{pin}</span></div>}
        </div>
      )}
    </form>
  );
}