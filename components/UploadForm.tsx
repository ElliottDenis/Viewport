"use client";

import React, { useEffect, useState } from "react";

type Account = { id: string; name: string; slug?: string };

const MAX_FILE_BYTES = 10 * 1024 * 1024;

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<string>("general");

  useEffect(() => {
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
      const pin_protected = selectedTarget === "general";
      const recipient_account_id =
        selectedTarget !== "general" && selectedTarget !== "public" ? selectedTarget : null;

      const createBody = {
        kind,
        title: file ? file.name : text.slice(0, 80) || "Untitled",
        mime_type: file ? file.type : null,
        bytes: file ? file.size : null,
        text_content: !file ? text : null,
        filename: file ? sanitizeFilename(file.name) : undefined,
        recipient_account_id,
        channel: selectedTarget,
        pin_protected,
      };

      const createRes = await fetch("/api/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createBody),
      });

      const createText = await createRes.text();
      console.log("[UploadForm] create:", createRes.status, createText);

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

      if (!id || (!serverStoragePath && file)) {
        console.error("Unexpected create response", createJson);
        setStatus("Server returned unexpected create response.");
        return;
      }

      // upload file via signed URL route
      if (file) {
        setStatus("Requesting signed upload URL...");
        const path = (serverStoragePath ?? `objects/${id}/${sanitizeFilename(file.name)}`).replace(/^\/+/, "");
        const urlRes = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path }),
        });
        const urlJson = await urlRes.json();
        console.log("[UploadForm] upload-url:", urlRes.status, urlJson);
        if (!urlRes.ok) {
          setStatus("Failed to get upload URL: " + JSON.stringify(urlJson));
          return;
        }

        const signedUploadUrl = urlJson.signedUploadUrl || urlJson.signedUrl;
        if (!signedUploadUrl) {
          setStatus("Server did not return a signed upload URL.");
          return;
        }

        setStatus("Uploading file...");
        const putRes = await fetch(signedUploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type || "application/octet-stream" },
          body: file,
        });
        if (!putRes.ok) {
          const txt = await putRes.text().catch(() => String(putRes.status));
          console.error("[UploadForm] PUT failed", putRes.status, txt);
          setStatus("Upload failed: " + txt);
          return;
        }
        console.log("[UploadForm] file uploaded");
      }

      setStatus("Confirming upload...");
      const confirmRes = await fetch(`/api/objects/${id}/confirm`, { method: "POST" });
      const confirmText = await confirmRes.text();
      console.log("[UploadForm] confirm:", confirmRes.status, confirmText);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Unified dropdown: General, Public, then verified accounts */}
      <div>
        <label className="text-sm text-gray-300">Send to</label>
        <select
          value={selectedTarget}
          onChange={(e) => setSelectedTarget(e.target.value)}
          className="w-full mt-1 p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100"
        >
          <option value="general">General (PIN protected)</option>
          <option value="public">Public (no PIN)</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name ?? a.slug ?? a.id}
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
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="text-sm text-gray-100" />

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
            setSelectedTarget("general");
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
              onClick={() => navigator.clipboard.writeText(code + (pin ? ` (PIN: ${pin})` : ""))}
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
              <div className="text-xs text-gray-400 mt-2">
                This PIN will not be shown again — save it now.
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}