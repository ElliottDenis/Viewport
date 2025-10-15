"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Account = { id: string; slug: string; name: string };

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const BUCKET = "locker";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);

  // NEW: channel selection: 'general' is PIN-protected; 'public' is not
  const [channel, setChannel] = useState<"general" | "public">("general");

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [recipientId, setRecipientId] = useState<string | "">("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/accounts");
        if (!res.ok) return;
        const list = await res.json();
        setAccounts(Array.isArray(list) ? list : []);
      } catch (e) {
        console.warn("Failed to load accounts", e);
      }
    })();
  }, []);

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
      setStatus("Creating object metadata...");

      const kind = file ? (file.type.startsWith("image/") ? "image" : "doc") : "text";

      // decide whether this upload should be PIN-protected
      // - general channel: PIN required
      // - public channel: no PIN
      const pin_protected = channel === "general";

      const body: any = {
        kind,
        title: file ? file.name : text.slice(0, 80) || "Untitled",
        mime_type: file ? file.type : null,
        bytes: file ? file.size : null,
        text_content: !file ? text : null,
        recipient_account_id: recipientId || null,
        filename: file ? file.name : undefined,
        channel, // NEW: tell server which channel
        pin_protected, // NEW: explicit flag for server to decide whether to generate a PIN
      };

      const createRes = await fetch("/api/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const createText = await createRes.text();
      if (!createRes.ok) {
        setStatus("Failed to create object: " + createText);
        return;
      }

      const createJson = JSON.parse(createText) as {
        id: string;
        storage_path: string;
        code: string;
        pin?: string;
      };

      const { id, storage_path: storagePath, code: returnedCode, pin: returnedPin } = createJson;

      // upload file if present
      if (file) {
        setStatus("Uploading file to storage...");
        const uploadResult = await supabase.storage.from(BUCKET).upload(storagePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

        if (uploadResult.error) {
          setStatus("Upload failed: " + uploadResult.error.message);
          return;
        }
      }

      // confirm
      setStatus("Confirming upload...");
      const confirmRes = await fetch(`/api/objects/${id}/confirm`, { method: "POST" });
      const confirmText = await confirmRes.text();
      if (!confirmRes.ok) {
        setStatus("Confirm failed: " + confirmText);
        return;
      }

      // show code and PIN (if server returned one)
      setCode(returnedCode);
      if (returnedPin) setPin(returnedPin);
      setStatus("Done — code generated.");
    } catch (err: any) {
      console.error(err);
      setStatus("Error: " + (err?.message || String(err)));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* CHANNEL SELECTOR */}
      <label className="text-sm text-gray-300">Channel</label>
      <select
        value={channel}
        onChange={(e) => setChannel(e.target.value as "general" | "public")}
        className="w-full max-w-md p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100"
      >
        <option value="general">General (PIN protected)</option>
        <option value="public">Public (no PIN)</option>
      </select>

      {/* recipient dropdown (optional) */}
      {/* <label className="text-sm text-gray-300">Send to (optional)</label>
      <select
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        className="w-full max-w-md rounded-md p-2 bg-[#0b0d11] text-gray-100 border border-gray-700"
      >
        <option value="">General / Public</option>
        {accounts.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select> */}

      {/* text & file inputs (unchanged) */}
      <label className="text-sm text-gray-300">Text (optional)</label>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write text (optional)"
        className="p-2 rounded bg-[#0b0d11] border border-gray-700 text-gray-100" rows={4} />

      <label className="text-sm text-gray-300">File (optional)</label>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="text-sm text-gray-100" />

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 rounded">Upload</button>
        <button type="button" className="px-4 py-2 bg-gray-700 rounded text-white"
          onClick={() => { setFile(null); setText(""); setRecipientId(""); setCode(null); setPin(null); setStatus(null); }}>
          Reset
        </button>
      </div>

      {status && <div className="text-sm mt-2 text-gray-300">{status}</div>}

      {code && (
        <div className="mt-3 p-3 bg-[#071024] rounded">
          <div className="mb-2 text-sm text-gray-200">Share code:</div>
          <div className="flex gap-2 items-center">
            <div className="font-mono text-lg bg-[#0b1220] px-3 py-2 rounded text-gray-100">{code}</div>
            <button className="px-3 py-1 bg-gray-600 rounded text-white" onClick={() => navigator.clipboard.writeText(code)} type="button">
              Copy
            </button>
          </div>

          {pin && (
            <div className="mt-3 text-sm text-gray-200">
              <div className="mb-1">PIN (save this — shown once):</div>
              <div className="flex items-center gap-2">
                <div className="font-mono bg-[#0b1220] px-3 py-2 rounded">{pin}</div>
                <button className="px-2 py-1 bg-gray-600 rounded text-white" onClick={() => navigator.clipboard.writeText(pin)} type="button">Copy PIN</button>
              </div>
              <div className="text-xs text-gray-400 mt-2">This PIN will not be shown again — save it now.</div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}