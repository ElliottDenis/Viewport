"use client";

import { useState } from "react";
import UploadForm from "../components/UploadForm";

type SuccessRespText = { kind: "text"; text: string; title?: string | null };
type SuccessRespFile = { kind: "image" | "video" | "doc"; url: string; mimeType?: string; title?: string | null };
type CodeResp = { error: string } | SuccessRespText | SuccessRespFile;

export default function HomePage() {
  const [tab, setTab] = useState<"send" | "view">("send");
  const [codeInput, setCodeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<CodeResp | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleView(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError(null);
    setResp(null);

    const code = codeInput.trim();
    if (!code) {
      setError("Please enter a code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/code/${encodeURIComponent(code)}`);
      const text = await res.text();

      // try parse JSON; if not JSON show helpful console output
      try {
        const json = JSON.parse(text) as CodeResp;
        if ("error" in json) {
          setError(json.error);
          setResp(null);
        } else {
          setResp(json);
        }
      } catch {
        setError("Unexpected response from server. See console for details.");
        console.error("Non-JSON response:", text);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  function clearViewer() {
    setResp(null);
    setError(null);
    setCodeInput("");
  }

  // type narrowing helpers (optional, but clear)
  const isSuccessWithKind = (r: CodeResp | null): r is SuccessRespText | SuccessRespFile =>
    r !== null && "kind" in r;

  return (
    <div className="flex flex-col items-center text-center min-h-screen py-12">
      {/* Top logo */}
      {/* <img src="/logo.png" alt="Viewport logo" className="w-28 h-28 mb-6" /> */}

      {/* Card */}
      <div className="w-full max-w-xl bg-[#0f1117] border border-gray-800 rounded-2xl p-6 shadow-md">
        {/* Tabs */}
        <div className="mb-4">
          <nav className="inline-flex rounded-xl bg-[#0b0d11] p-1">
            <button
              onClick={() => setTab("send")}
              className={`px-5 py-2 rounded-lg text-sm font-medium ${
                tab === "send"
                  ? "bg-gradient-to-b from-white/8 to-white/4 text-white shadow-inner"
                  : "text-gray-300 hover:text-white"
              }`}
              aria-pressed={tab === "send"}
            >
              Send
            </button>

            <button
              onClick={() => setTab("view")}
              className={`ml-1 px-5 py-2 rounded-lg text-sm font-medium ${
                tab === "view"
                  ? "bg-gradient-to-b from-white/8 to-white/4 text-white shadow-inner"
                  : "text-gray-300 hover:text-white"
              }`}
              aria-pressed={tab === "view"}
            >
              View
            </button>
          </nav>
        </div>

        {/* Tab content */}
        <div>
          {tab === "send" ? (
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-white">Share your view</h2>
              <UploadForm />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-white">View an item</h2>

              <form onSubmit={handleView} className="flex flex-col gap-3 items-center">
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g. ABC123)"
                  className="w-full max-w-md rounded-md p-3 bg-[#0b0d11] text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black font-semibold rounded-lg disabled:opacity-50"
                  >
                    {loading ? "Loading…" : "Open"}
                  </button>

                  <button
                    type="button"
                    onClick={clearViewer}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg"
                  >
                    Clear
                  </button>
                </div>

                <p className="text-sm text-gray-400 mt-3">
                  Paste a sharing code and click Open to view the shared item.
                </p>
              </form>

              {/* Viewer area */}
              <div className="mt-6">
                {error && <div className="text-sm text-rose-300">{error}</div>}

                {resp && "error" in resp && (
                  <div className="text-sm text-rose-300">{resp.error}</div>
                )}

                {/* Text */}
                {isSuccessWithKind(resp) && resp.kind === "text" && (
                  <div className="mt-4 text-left bg-[#0b0d11] border border-gray-700 rounded p-4">
                    {resp.title && <div className="font-semibold mb-2">{resp.title}</div>}
                    <pre style={{ whiteSpace: "pre-wrap" }} className="text-sm">{resp.text}</pre>
                  </div>
                )}

                {/* Image */}
                {isSuccessWithKind(resp) && resp.kind === "image" && (
                  <div className="mt-4">
                    {resp.title && <div className="font-semibold mb-2">{resp.title}</div>}
                    <img src={resp.url} alt={resp.title ?? "Shared image"} className="max-w-full rounded" />
                  </div>
                )}

                {/* Video */}
                {isSuccessWithKind(resp) && resp.kind === "video" && (
                  <div className="mt-4">
                    {resp.title && <div className="font-semibold mb-2">{resp.title}</div>}
                    <video src={resp.url} controls className="w-full rounded" />
                  </div>
                )}

                {/* Doc */}
                {isSuccessWithKind(resp) && resp.kind === "doc" && (
                  <div className="mt-4">
                    {resp.title && <div className="font-semibold mb-2">{resp.title}</div>}
                    <a className="btn px-4 py-2 bg-gray-600 rounded text-white" href={resp.url} target="_blank" rel="noreferrer">
                      Open file
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}