// components/ViewPage.tsx
"use client";
import React, { useState } from "react";

export default function ViewPage() {
  const [channel, setChannel] = useState<string>("general"); // dropdown value
  const [codeInput, setCodeInput] = useState("");
  const [pin, setPin] = useState("");
  const [resp, setResp] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // treat 'general' channel as PIN-protected by default
  const channelRequiresPin = (ch: string) => ch === "general";

  function errToMsg(e: unknown) {
    if (typeof e === "string") return e;
    if (e instanceof Error) return e.message;
    try { return JSON.stringify(e); } catch { return String(e); }
  }

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
      if (channelRequiresPin(channel)) {
        if (!/^\d{4}$/.test(pin)) {
          setError("Enter a 4-digit PIN.");
          return;
        }

        const res = await fetch(`/api/code/${encodeURIComponent(code)}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin }),
        });

        const json = await res.json().catch(() => ({}));
        if (!res.ok || json?.error) {
          if (json?.pin_protected) setError(json.error || "PIN required.");
          else setError(json?.error || "Invalid PIN or failed to fetch content.");
          return;
        }

        setResp(json);
        if (json?.id) fetch(`/api/objects/${json.id}/delete`, { method: "POST" }).catch(console.warn);
      } else {
        // channel doesn't require PIN — do a GET
        const res = await fetch(`/api/code/${encodeURIComponent(code)}`);
        const text = await res.text();
        let json: any;
        try { json = JSON.parse(text); } catch { json = { _raw: text }; }

        if (json?.pin_protected) {
          // server says it's protected — instruct user to use PIN
          setError("This item is PIN-protected. Select General channel and enter the PIN to open.");
          return;
        }

        if (!res.ok || json?.error) {
          setError(json?.error || "Failed to fetch content.");
          return;
        }

        setResp(json);
        if (json?.id) fetch(`/api/objects/${json.id}/delete`, { method: "POST" }).catch(console.warn);
      }
    } catch (err) {
      console.error("open error:", err);
      setError(errToMsg(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center text-center min-h-screen py-12">
      <h1 className="text-2xl font-semibold mb-4">Open / View</h1>

      <form onSubmit={handleOpen} className="mb-4 flex flex-col items-center gap-3 w-full max-w-xl">
        {/* Channel dropdown */}
        <div className="w-full flex flex-col items-start">
          <label className="text-sm text-gray-300 mb-1">Channel</label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="w-full max-w-md p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100"
            aria-label="Select channel"
          >
            <option value="general">General channel (requires PIN)</option>
            {/* future channels can be added here */}
            <option value="public">Public (no PIN)</option>
          </select>
        </div>

        {/* Code input */}
        <div className="w-full flex flex-col items-start">
          <label className="text-sm text-gray-300 mb-1">Code</label>
          <input
            type="text"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="Enter code"
            className="w-full max-w-md p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100"
          />
        </div>
        {/* PIN input, only if channel requires it */}
        {channelRequiresPin(channel) && (
          <div className="w-full flex flex-col items-start">
            <label className="text-sm text-gray-300 mb-1">PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter 4-digit PIN"
              className="w-full max-w-md p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100"
              maxLength={4}
            />
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 rounded text-black font-semibold disabled:opacity-50"
          disabled={loading}
        >
            {loading ? "Opening..." : "Open"}
        </button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {resp && (
          <div className="w-full max-w-2xl p-4 border border-gray-700 rounded bg-[#0b0d11] text-left">
            <h2 className="text-xl font-semibold mb-2">Content</h2>
            {resp.text && <p className="mb-2 whitespace-pre-wrap">{resp.text}</p>}
            {resp.file_url && (
              <div className="mb-2">
                <a
                  href={resp.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  Download File
                </a>
              </div>
            )}
            {resp._raw && (
              <div className="mb-2">
                <h3 className="font-semibold">Raw Response:</h3>
                <pre className="bg-gray-800 p-2 rounded overflow-x-auto text-sm">
                  {JSON.stringify(resp._raw, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
    </main>
    );
}        