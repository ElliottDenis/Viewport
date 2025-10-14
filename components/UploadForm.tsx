"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  // accounts for dropdown
  const [accounts, setAccounts] = useState<{ id: string; slug: string; name: string }[]>([]);
  const [recipientId, setRecipientId] = useState<string | null>(null);

  useEffect(() => {
    // fetch accounts list from server
    async function load() {
      try {
        const res = await fetch("/api/accounts");
        if (!res.ok) return;
        const list = await res.json();
        setAccounts(list || []);
      } catch (e) {
        console.error("accounts fetch error", e);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Creating object...");
    try {
      const kind = file ? (file.type.startsWith("image/") ? "image" : "doc") : "text";

      const res = await fetch("/api/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          title: file?.name ?? (text ? text.slice(0, 60) : "Untitled"),
          mimeType: file?.type,
          bytes: file?.size,
          text_content: text || null,
          recipient_account_id: recipientId, // include recipient
        }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error("Create failed: " + res.status + " " + t);
      }
      const body = await res.json();
      const id = body.id as string;
      const objectStoragePath = body.storage_path as string;
      const codeFromServer = body.code as string;

      setStatus("Uploading file...");
      if (file) {
        const { error } = await supabase.storage
          .from("objects")
          .upload(objectStoragePath, file, { cacheControl: "3600", upsert: false });
        if (error) throw error;
      }

      setStatus("Confirming upload...");
      const confirmRes = await fetch(`/api/objects/${id}/confirm`, { method: "POST" });
      if (!confirmRes.ok) {
        const t = await confirmRes.text();
        throw new Error("Confirm failed: " + t);
      }

      setCode(codeFromServer);
      setStatus("Done! Code generated.");
    } catch (err: any) {
      console.error(err);
      setStatus("Error: " + (err.message || String(err)));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <select
        value={recipientId ?? ""}
        onChange={(e) => setRecipientId(e.target.value || null)}
        className="w-full max-w-md rounded-md p-2 bg-[#0b0d11] text-gray-100 border border-gray-700"
      >
        <option value="">Send to public / general channel</option>
        {accounts.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write text (optional)"
        className="p-2 rounded bg-[#0b0d11] border border-gray-700"
        rows={4}
      />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 rounded">Upload</button>
      </div>

      {status && <div className="text-sm mt-2 text-gray-300">{status}</div>}
      {code && (
        <div className="mt-3 p-3 bg-[#071024] rounded">
          <div className="mb-2">Share code:</div>
          <div className="flex gap-2 items-center">
            <div className="font-mono text-lg bg-[#0b1220] px-3 py-2 rounded">{code}</div>
            <button
              className="px-3 py-1 bg-gray-600 rounded"
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
