"use client";
import React, { useState, useEffect } from "react";



/**
 * ViewPage: PIN-protected-by-default viewer
 * - defaultPinProtected: true => show PIN field by default
 * - If pin required, the component calls POST /api/code/:code/verify with { pin }
 * - If not using PIN, it calls GET /api/code/:code
 */

export default function ViewPage() {
  const [codeInput, setCodeInput] = useState("");
  const [pin, setPin] = useState("");
  const [resp, setResp] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  // PIN protection UI default: ON
  const [requirePin, setRequirePin] = useState(true);

  useEffect(() => {
    console.log("ViewPage mounted — requirePin =", requirePin);
  }, [requirePin]);

  function errToMsg(e: unknown) {
    if (typeof e === "string") return e;
    if (e instanceof Error) return e.message;
    try { return JSON.stringify(e); } catch { return String(e); }
  }

  // Lookup: either verify with PIN (if requirePin true) or GET directly.
  async function handleLookup(e?: React.FormEvent) {
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
      if (requirePin) {
        if (!/^\d{4}$/.test(pin)) {
          setError("Enter a 4-digit PIN.");
          return;
        }

        // call verify route which returns content when PIN is correct
        const res = await fetch(`/api/code/${encodeURIComponent(code)}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin }),
        });

        const json = await res.json().catch(() => ({}));
        // server might respond { pin_protected: true, error: "pin required" } for missing pin — handle gracefully
        if (!res.ok || json?.error) {
          // if server indicates still pin_protected, show helpful message
          if (json?.pin_protected) {
            setError(json.error || "PIN required.");
          } else {
            setError(json?.error || "Invalid PIN or failed to fetch content.");
          }
          return;
        }

        // success: set response (text or file)
        setResp(json);
        // attempt delete after view if id present
        if (json?.id) fetch(`/api/objects/${json.id}/delete`, { method: "POST" }).catch(console.warn);
      } else {
        // no PIN required: GET content
        const res = await fetch(`/api/code/${encodeURIComponent(code)}`);
        const text = await res.text();
        let json: any;
        try { json = JSON.parse(text); } catch { json = { _raw: text }; }

        // If server returns pin_protected true in body (403 case), show PIN UI
        if (json?.pin_protected) {
          setError("This item is PIN-protected. Please enable PIN and enter the 4-digit PIN.");
          setResp(null);
          setLoading(false);
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
      console.error("lookup error:", err);
      setError(errToMsg(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center text-center min-h-screen py-12">
      <h1 className="text-2xl font-semibold mb-4">Open / View</h1>

      <form onSubmit={handleLookup} className="mb-4 flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="Enter code"
            className="p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100 text-center w-56"
          />

          <label className="flex items-center gap-2 ml-2 text-sm">
            <input
              type="checkbox"
              checked={requirePin}
              onChange={(e) => setRequirePin(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Require PIN</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="ml-2 px-4 py-2 bg-blue-500 rounded text-black font-semibold"
          >
            {loading ? "..." : "Open"}
          </button>
        </div>

        {/* PIN field always visible when requirePin is true */}
        {requirePin && (
          <div className="mt-2">
            <input
            id="viewport-pin-input"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="4-digit PIN"
            maxLength={4}
            className="p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100 text-center w-32"
            />
            <div className="text-xs text-gray-400 mt-1">PIN is required for general channel items (default).</div>
          </div>
        )}
      </form>

      {error && <div className="text-red-400 mb-3">{error}</div>}

      {/* Display content */}
      {resp && resp.kind === "text" && (
        <div className="bg-[#0f1117] border border-gray-700 rounded p-4 w-full max-w-xl text-left">
          {resp.title && <h2 className="text-lg font-semibold mb-2">{resp.title}</h2>}
          <pre className="whitespace-pre-wrap text-gray-100">{resp.text}</pre>
        </div>
      )}

      {resp && resp.kind && resp.kind !== "text" && (
        <div className="w-full max-w-xl">
          <h2 className="text-lg font-semibold mb-2">{resp.title ?? "Shared File"}</h2>
          {resp.kind === "image" && <img src={resp.url} alt={resp.title ?? "image"} className="max-w-full rounded" />}
          {resp.kind === "video" && <video src={resp.url} controls className="w-full rounded" />}
          {resp.kind === "doc" && <a href={resp.url} target="_blank" rel="noreferrer" className="text-blue-400 underline">Open Document</a>}
        </div>
      )}
    </main>
  );
}