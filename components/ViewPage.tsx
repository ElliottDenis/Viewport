// components/ViewPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type SuccessRespText = { id: string; kind: "text"; text: string; title?: string | null };
type SuccessRespFile = {
  id: string;
  kind: "image" | "video" | "doc";
  url: string;
  mimeType?: string | null;
  title?: string | null;
  text_content?: string | null;
};
type CodeResp = { error: string; pin_protected?: boolean } | SuccessRespText | SuccessRespFile;

export default function ViewPage() {
  const [codeInput, setCodeInput] = useState("");
  const [pin, setPin] = useState("");
  const [resp, setResp] = useState<CodeResp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [needPin, setNeedPin] = useState(false);

  useEffect(() => {
    (async () => {
      const s = await supabase.auth.getSession();
      setAccessToken(s.data?.session?.access_token ?? null);
      // optional subscription to auth changes:
      supabase.auth.onAuthStateChange((_event, session) => {
        setAccessToken(session?.access_token ?? null);
      });
    })();
  }, []);

  function errToMsg(e: unknown) {
    if (typeof e === "string") return e;
    if (e instanceof Error) return e.message;
    try { return JSON.stringify(e); } catch { return String(e); }
  }

  // Try GET first. If server returns pin_protected (403) then we show PIN UI.
  async function handleCheck(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setResp(null);
    setNeedPin(false);

    const code = codeInput.trim();
    if (!code) {
      setError("Please enter a code.");
      return;
    }

    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

      const res = await fetch(`/api/code/${encodeURIComponent(code)}`, { headers });
      const text = await res.text();

      let json: any;
      try { json = JSON.parse(text); } catch { json = { _raw: text }; }

      if (res.status === 403 && json?.pin_protected) {
        // server is telling us this code is PIN-protected
        setNeedPin(true);
        setError("This code is PIN-protected. Enter the 4-digit PIN to view.");
        return;
      }

      if (!res.ok) {
        setError(json?.error || "Failed to fetch code.");
        return;
      }

      // success; display
      setResp(json as CodeResp);
    } catch (err) {
      setError(errToMsg(err));
    } finally {
      setLoading(false);
    }
  }

  // Verify PIN endpoint: returns content on success (requires auth if target is account)
  async function handleVerifyPin(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setResp(null);

    const code = codeInput.trim();
    if (!code) { setError("Please enter a code."); return; }
    if (!/^\d{4}$/.test(pin)) { setError("Enter a 4-digit PIN."); return; }

    setLoading(true);
    try {
      const body = JSON.stringify({ pin });
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

      const res = await fetch(`/api/code/${encodeURIComponent(code)}/verify`, { method: "POST", headers, body });
      const json = await res.json().catch(()=>({ error: "Invalid server response" }));
      if (!res.ok) {
        setError(json?.error || "Invalid PIN or not authorized.");
        return;
      }

      setResp(json as CodeResp);
    } catch (err) {
      setError(errToMsg(err));
    } finally {
      setLoading(false);
    }
  }

  // helper to render success response
  function RenderContent({ r }: { r: SuccessRespText | SuccessRespFile }) {
    if (r.kind === "text") {
      return (
        <div className="bg-[#0f1117] p-4 rounded text-left">
          {r.title && <h3 className="font-semibold mb-2">{r.title}</h3>}
          <pre className="whitespace-pre-wrap">{(r as SuccessRespText).text}</pre>
        </div>
      );
    }

    // file (image/video/doc)
    return (
      <div className="text-left">
        {r.title && <h3 className="font-semibold mb-2">{r.title}</h3>}
        {(r as SuccessRespFile).text_content ? (
          <div className="mb-3 p-3 rounded bg-[#08101a]"><pre className="whitespace-pre-wrap">{(r as SuccessRespFile).text_content}</pre></div>
        ) : null}

        {r.kind === "image" && <img src={r.url} alt={r.title ?? "image"} style={{ maxWidth: "100%", borderRadius: 8 }} />}
        {r.kind === "video" && <video src={r.url} controls style={{ width: "100%", borderRadius: 8 }} />}
        {r.kind === "doc" && <a href={r.url} target="_blank" rel="noreferrer" className="text-blue-400 underline">Open document</a>}
      </div>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <form onSubmit={handleCheck} className="flex gap-2 items-center mb-4">
        <input
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Enter code"
          className="p-2 rounded bg-[#0b0d11] text-gray-100"
        />
        <button type="submit" disabled={loading} className="px-3 py-2 bg-blue-500 rounded text-black">
          {loading ? "…" : "Open"}
        </button>
      </form>

      {error && <div className="text-red-400 mb-3">{error}</div>}

      {needPin && (
        <form onSubmit={handleVerifyPin} className="mb-4 flex items-center gap-2">
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="4-digit PIN"
            className="p-2 rounded bg-[#0b0d11] text-gray-100 w-32"
            maxLength={4}
          />
          <button type="submit" disabled={loading} className="px-3 py-2 bg-green-500 rounded text-black">
            {loading ? "…" : "Verify"}
          </button>
        </form>
      )}

      {resp && !("error" in resp) && (
        <div className="mt-4">
          <RenderContent r={resp as SuccessRespText | SuccessRespFile} />
        </div>
      )}
    </main>
  );
}