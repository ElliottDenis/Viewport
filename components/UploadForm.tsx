// components/UploadForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

type Account = { id: string; slug: string; name: string };

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const BUCKET = "locker"; // change if your bucket is named differently

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [recipientId, setRecipientId] = useState<string | "">("");

  useEffect(() => {
    // fetch accounts for recipient dropdown if you have an endpoint
    ;(async () => {
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

    // validation
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
      // determine kind
      const kind = file ? (file.type.startsWith("image/") ? "image" : "doc") : "text";
      const body: any = {
        kind,
        title: file ? file.name : text.slice(0, 80) || "Untitled",
        mime_type: file ? file.type : null,
        bytes: file ? file.size : null,
        text_content: !file ? text : null,
        recipient_account_id: recipientId || null,
        filename: file ? file.name : undefined,
      };

      const createRes = await fetch("/api/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const createText = await createRes.text();
      if (!createRes.ok) {
        console.error("Create metadata failed:", createRes.status, createText);
        setStatus("Failed to create object: " + createText);
        return;
      }

      // parse JSON safely (server should return id, storage_path, code and maybe pin)
      const createJson = JSON.parse(createText) as {
        id: string;
        storage_path: string;
        code: string;
        pin?: string;
      };

      const { id, storage_path: storagePath, code: returnedCode, pin: returnedPin } = createJson;
      if (!id || !storagePath || !returnedCode) {
        setStatus("Create returned unexpected response.");
        console.error("Unexpected create response:", createJson);
        return;
      }

      setStatus("Uploading file to storage...");
      // if there's a file, upload to Supabase storage
      if (file) {
        const uploadResult = await supabase.storage.from(BUCKET).upload(storagePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

        if (uploadResult.error) {
          console.error("Upload failed", uploadResult.error);
          // Optionally: call a server endpoint to delete the DB row (cleanup)
          setStatus("Upload failed: " + uploadResult.error.message);
          return;
        }
      } else {
        // text-only: nothing to upload to storage (we keep text in DB)
        console.log("Text-only upload, no storage step required.");
      }

      setStatus("Confirming upload...");
      const confirmRes = await fetch(`/api/objects/${id}/confirm`, { method: "POST" });
      const confirmText = await confirmRes.text();
      if (!confirmRes.ok) {
        console.error("Confirm failed", confirmRes.status, confirmText);
        setStatus("Confirm failed: " + confirmText);
        return;
      }

      // success: show returned code and optional PIN
      setCode(returnedCode);
      if (returnedPin) setPin(returnedPin);
      setStatus("Done — code generated.");
    } catch (err: any) {
      console.error("Unexpected error in upload flow", err);
      setStatus("Error: " + (err?.message || String(err)));
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
        <option value="">General / Public</option>
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
            setPin(null);
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
                navigator.clipboard.writeText(code + (pin ? ` (PIN: ${pin})` : ""));
              }}
              type="button"
            >
              Copy
            </button>
          </div>

          {/* Inline PIN display (shown if server returned one) */}
          {pin && (
            <div className="mt-3 text-sm text-gray-200">
              <div className="mb-1">PIN (save this — shown once):</div>
              <div className="flex items-center gap-2">
                <div className="font-mono bg-[#0b1220] px-3 py-2 rounded">{pin}</div>
                <button
                  className="px-2 py-1 bg-gray-600 rounded text-white"
                  onClick={() => navigator.clipboard.writeText(pin)}
                  type="button"
                >
                  Copy PIN
                </button>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                This PIN will not be shown again — save it now to share with viewers.
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}