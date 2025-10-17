// components/UploadForm.tsx
"use client";

import React, { useEffect, useState } from "react";

type Account = { id: string; slug?: string; name: string };

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [recipientId, setRecipientId] = useState<string | "">("");
  const [channel, setChannel] = useState<"general" | "public">("general");

  useEffect(() => {
    // optional: load accounts for recipient dropdown
    (async () => {
      try {
        const res = await fetch("/api/accounts");
        if (!res.ok) return;
        const json = await res.json();
        setAccounts(Array.isArray(json) ? json : []);
      } catch (e) {
        console.warn("Failed to load accounts", e);
      }
    })();
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

      // Tell server whether to pin-protect this object. 'general' -> pin_protected true
      const pin_protected = channel === "general";

      const createBody: any = {
        kind,
        title: file ? file.name : text.slice(0, 80) || "Untitled",
        mime_type: file ? file.type : null,
        bytes: file ? file.size : null,
        text_content: !file ? text : null,
        filename: file ? sanitizeFilename(file.name) : undefined,
        recipient_account_id: recipientId || null,
        channel,
        pin_protected,
      };

      // 1) Create DB metadata on server (server must use service key to insert)
      const createRes = await fetch("/api/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createBody),
      });

      const createText = await createRes.text();
      console.log("[UploadForm] createRes status:", createRes.status, "body:", createText);

      if (!createRes.ok) {
        setStatus("Failed to create object: " + createText);
        return;
      }

      const createJson = JSON.parse(createText) as {
        id: string;
        storage_path: string | null;
        code: string;
        pin?: string;
      };

      const { id, storage_path: serverStoragePath, code: returnedCode, pin: returnedPin } = createJson;

      // Basic sanity
      if (!id || (!serverStoragePath && file)) {
        // server should return a storage_path when a file will be uploaded
        console.error("Server returned unexpected createJson:", createJson);
        setStatus("Server returned unexpected create response.");
        return;
      }

      // 2) If there is a file, upload via signed PUT URL (private bucket-friendly)
      if (file) {
        setStatus("Requesting signed upload URL from server...");
        // path sent to server should be the storage path (server should have provided it)
        let storagePath = serverStoragePath ?? `objects/${id}/${sanitizeFilename(file.name)}`;
        storagePath = storagePath.replace(/^\/+/, ""); // strip leading slash if any

        const urlRes = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: storagePath }),
        });

        const urlJson = await urlRes.json();
        console.log("[UploadForm] upload-url response:", urlRes.status, urlJson);

        if (!urlRes.ok) {
          setStatus("Failed to get upload URL: " + JSON.stringify(urlJson));
          return;
        }

        const signedUploadUrl = urlJson.signedUploadUrl || urlJson.signedUrl || urlJson.signed_upload_url;
        if (!signedUploadUrl) {
          setStatus("Server did not return a signed upload URL.");
          return;
        }

        // ensure file is present (TypeScript guard)
        if (!file) {
          setStatus("No file selected.");
          return;
        }

        setStatus("Uploading file to storage (signed URL)...");
        const putRes = await fetch(signedUploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type || "application/octet-stream" },
          body: file,
        });

        if (!putRes.ok) {
          const textErr = await putRes.text().catch(() => String(putRes.status));
          console.error("[UploadForm] PUT to signed URL failed", putRes.status, textErr);
          setStatus("Upload failed: " + textErr);
          return;
        }
        console.log("[UploadForm] file uploaded via signed URL");
      } else {
        console.log("[UploadForm] text-only item, no storage upload required");
      }

      // 3) Confirm with server (server can validate storage existence and return final info)
      setStatus("Confirming upload with server...");
      const confirmRes = await fetch(`/api/objects/${id}/confirm`, { method: "POST" });
      const confirmText = await confirmRes.text();
      console.log("[UploadForm] confirmRes:", confirmRes.status, confirmText);
      if (!confirmRes.ok) {
        setStatus("Confirm failed: " + confirmText);
        return;
      }

      // 4) show code and optional PIN
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
      <div className="flex gap-2 items-center">
        <label className="text-sm text-gray-300">Channel:</label>
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value as "general" | "public")}
          className="p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100"
        >
          <option value="general">General (PIN protected)</option>
          <option value="public">Public (no PIN)</option>
        </select>

        <label className="text-sm text-gray-300 ml-4">Send to (optional):</label>
        <select
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100"
        >
          <option value="">General / Public</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

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

      <p className="hint text-xs text-gray-400">Max {(MAX_FILE_BYTES / 1024 / 1024).toFixed(1)} MB.</p>

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
              <div className="text-xs text-gray-400 mt-2">This PIN will not be shown again — save it now.</div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}