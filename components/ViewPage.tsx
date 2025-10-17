// components/ViewPage.tsx
"use client";

import React, { useState } from "react";

/* ----- Types ----- */
type SuccessRespText = { id: string; kind: "text"; text: string; title?: string | null };
type SuccessRespFile = {
  id: string;
  kind: "image" | "video" | "doc";
  url: string;
  mimeType?: string | null;
  title?: string | null;
};
type ErrorResp = { error: string; pin_protected?: boolean };

type CodeResp = ErrorResp | SuccessRespText | SuccessRespFile;

/* Type guard */
function isSuccessResp(r: CodeResp | null): r is SuccessRespText | SuccessRespFile {
  return r !== null && typeof (r as any).kind === "string";
}

/* ----- Component ----- */
export default function ViewPage() {
  const [codeInput, setCodeInput] = useState("");
  const [pin, setPin] = useState("");
  const [resp, setResp] = useState<CodeResp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Try a bunch of possible url field names
  const normalizeUrl = (obj: any): string | null => {
    if (!obj) return null;
    return obj.url || obj.signedUrl || obj.signed_url || obj.signed_upload_url || null;
  };

  async function handleOpen(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setResp(null);

    const code = codeInput.trim();
    if (!code) {
      setError("Please enter a code.");
      return;
    }

    setLoading(true);
    try {
      // Try GET first (server may respond with pin_protected + 403)
      const res = await fetch(`/api/code/${encodeURIComponent(code)}`);
      const text = await res.text();
      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        json = { _raw: text };
      }
      console.log("[ViewPage] GET /api/code response:", res.status, json);

      // If server indicates pin protection (often via 403 + { pin_protected: true })
      if (res.status === 403 && json?.pin_protected) {
        if (!/^\d{4}$/.test(pin)) {
          setError("This item is PIN-protected. Enter the 4-digit PIN and try Open again.");
          setLoading(false);
          return;
        }

        // verify with PIN
        const vres = await fetch(`/api/code/${encodeURIComponent(code)}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin }),
        });
        const vjson = await vres.json().catch(() => ({}));
        console.log("[ViewPage] POST verify response:", vres.status, vjson);

        if (!vres.ok) {
          setError(vjson?.error || "PIN invalid or verification failed.");
          setLoading(false);
          return;
        }

        // vjson might be a success shape — normalize url if needed
        if (isSuccessResp(vjson)) {
          if ((vjson as any).kind !== "text") {
            (vjson as any).url = normalizeUrl(vjson) ?? (vjson as any).url;
          }
        }

        setResp(vjson);
        setLoading(false);
        return;
      }

      // If GET failed (non-403), show error
      if (!res.ok) {
        setError(json?.error || "Failed to fetch code.");
        setLoading(false);
        return;
      }

      // On success, json may be either ErrorResp or SuccessResp*
      // Normalize url for file-like shapes before narrowing
      if (json && typeof json === "object") {
        // If it looks like a file response but url field named differently, normalise it
        const possibleKind = (json as any).kind;
        if (possibleKind && possibleKind !== "text") {
          (json as any).url = normalizeUrl(json) ?? (json as any).url;
        }
      }

      // Now narrow safely
      if (isSuccessResp(json)) {
        setResp(json);
      } else {
        // Could be ErrorResp or unexpected shape
        setResp(json);
      }
    } catch (err: any) {
      console.error("[ViewPage] unexpected error:", err);
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[60vh] p-6 max-w-3xl mx-auto">
      <form onSubmit={handleOpen} className="flex flex-col gap-3 mb-6">
        <div className="flex gap-2 items-center">
          <input
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="Enter code"
            className="p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100 flex-1"
          />
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="PIN (if required)"
            className="p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100 w-28 text-center"
          />
          <button
            type="submit"
            disabled={loading}
            className="ml-2 px-4 py-2 bg-blue-500 rounded text-black font-semibold"
          >
            {loading ? "..." : "Open"}
          </button>
        </div>
        <div className="text-xs text-gray-400">If item is PIN-protected enter PIN above (4 digits).</div>
      </form>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      {/* Error/notice */}
      {resp && !isSuccessResp(resp) && (
        <div className="bg-[#0b0d11] border border-gray-700 rounded p-4 text-left">
          <div className="font-semibold text-sm mb-1">Notice</div>
          <div className="text-sm">{(resp as ErrorResp).error}</div>
          {((resp as ErrorResp).pin_protected) && (
            <div className="text-xs text-gray-400 mt-2">This item requires a PIN.</div>
          )}
        </div>
      )}

      {/* Text success */}
      {isSuccessResp(resp) && resp.kind === "text" && (
        <div className="bg-[#0f1117] border border-gray-700 rounded p-4 text-left">
          {resp.title && <h2 className="text-lg font-semibold mb-2">{resp.title}</h2>}
          <pre className="whitespace-pre-wrap text-gray-100">{(resp as SuccessRespText).text}</pre>
        </div>
      )}

      {/* File success */}
      {isSuccessResp(resp) && resp.kind !== "text" && (
        <div className="bg-transparent">
          <h2 className="text-lg font-semibold mb-2">{resp.title ?? "Shared file"}</h2>

          {resp.kind === "image" && (
            <div>
              <a href={(resp as SuccessRespFile).url} target="_blank" rel="noreferrer">
                <img
                  src={(resp as SuccessRespFile).url}
                  alt={resp.title ?? "image"}
                  style={{ maxWidth: "100%", borderRadius: 8 }}
                />
              </a>
            </div>
          )}

          {resp.kind === "video" && (
            <div>
              <video src={(resp as SuccessRespFile).url} controls style={{ width: "100%", borderRadius: 8 }} />
            </div>
          )}

          {resp.kind === "doc" && (
            <div>
              <a href={(resp as SuccessRespFile).url} target="_blank" rel="noreferrer" className="text-blue-400 underline">
                Open document
              </a>
            </div>
          )}
        </div>
      )}
    </main>
  );
}