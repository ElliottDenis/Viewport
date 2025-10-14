"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function errToMsg(e: unknown): string {
  if (typeof e === "string") return e;
  if (e instanceof Error) return e.message;
  try { return JSON.stringify(e); } catch { return String(e); }
}

type Account = { id: string; slug: string; name: string };

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB limit (change as needed)
// const BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? "locker"; // change default if your bucket is named differently
const BUCKET = "locker"; // change default if your bucket is named differently

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  // accounts dropdown
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [recipientId, setRecipientId] = useState<string | "">("");

  useEffect(() => {
    async function loadAccounts() {
      try {
        const res = await fetch("/api/accounts");
        if (!res.ok) return;
        const list = await res.json();
        setAccounts(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error("Failed to load accounts", e);
        
      }
    }
    loadAccounts();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setCode(null);

    // simple validation
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
      const body = {
        kind,
        title: file ? file.name : text.slice(0, 80) || "Untitled",
        mimeType: file ? file.type : null,
        bytes: file ? file.size : null,
        text_content: !file ? text : null,
        recipient_account_id: recipientId || null,
        filename: file ? file.name : undefined, // helpful to server for storage_path
      };

      const res = await fetch("/api/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const textResp = await res.text();
      if (!res.ok) {
        console.error("Create metadata failed:", res.status, textResp);
        setStatus("Failed to create object: " + textResp);
        return;
      }

      const json = JSON.parse(textResp) as { id: string; storage_path: string; code: string };
      const { id, storage_path: storagePath, code: returnedCode } = json;
      setStatus("Uploading file to storage...");

      // after you get storagePath and id from /api/objects
      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("storagePath", storagePath);

        const r = await fetch("/api/upload", { method: "POST", body: fd });
        const jr = await r.json();
        if (!r.ok || jr.error) {
          console.error("server upload failed", jr);
          setStatus("Upload failed: " + (jr.error || r.statusText));
          return;
        }
        console.log("Server upload success", jr);
      }

      setStatus("Confirming upload...");
      const confirmRes = await fetch(`/api/objects/${id}/confirm`, { method: "POST" });
      const confirmText = await confirmRes.text();
      if (!confirmRes.ok) {
        console.error("Confirm failed", confirmRes.status, confirmText);
        setStatus("Confirm failed: " + confirmText);
        return;
      }

      setCode(returnedCode);
      setStatus("Done — code generated.");
    } catch (err: any) {
      console.error("Unexpected error in upload flow", err);
      setStatus(errToMsg(err));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="text-sm text-gray-300">Send to (optional)</label>
      <select
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        className="w-full max-w-md rounded-md p-2 bg-[#0b0d11] text-gray-100 border border-gray-700"
      >
        <option value="">Public / General channel</option>
        {accounts.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      <label className="text-sm text-gray-300">Text (optional)</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write text (optional)"
        className="p-2 rounded bg-[#0b0d11] border border-gray-700 text-gray-100"
        rows={4}
      />

      <label className="text-sm text-gray-300">File (optional)</label>
      <input
        type="file"
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null;
          setFile(f);
        }}
        className="text-sm text-gray-100"
      />

      <p className="hint text-xs text-gray-400">
        Max {(MAX_FILE_BYTES / 1024 / 1024).toFixed(1)} MB.
      </p>

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 rounded text-black font-semibold">
          Upload
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-700 rounded text-white"
          onClick={() => {
            setFile(null);
            setText("");
            setRecipientId("");
            setStatus(null);
            setCode(null);
          }}
        >
          Reset
        </button>
      </div>

      {status && <div className="text-sm mt-2 text-gray-300">{status}</div>}

      {code && (
        <div className="mt-3 p-3 bg-[#071024] rounded">
          <div className="mb-2 text-sm text-gray-200">Share code:</div>
          <div className="flex gap-2 items-center">
            <div className="font-mono text-lg bg-[#0b1220] px-3 py-2 rounded text-gray-100">{code}</div>
            <button
              className="px-3 py-1 bg-gray-600 rounded text-white"
              onClick={() => {
                navigator.clipboard.writeText(code);
              }}
              type="button"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </form>
  );
}