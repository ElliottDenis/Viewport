// app/account/page.tsx
"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";   // adjust the path if needed

// put at top of your component file (where supabase client is available)
async function callJsonSafe(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  const text = await res.text();
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    // helpful debug: log raw HTML/response so you can inspect server error page
    console.error("Non-JSON response from", url, "status", res.status, "body:", text);
    // throw an Error with a short message so UI doesn't try JSON.parse.
    throw new Error(`Server returned non-JSON response (status ${res.status}). Check server logs.`);
  }
  const json = JSON.parse(text);
  return { res, json };
}

export default function AccountPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"insight" | "influencer">("insight");
  const [status, setStatus] = useState("");
  const [displayName, setDisplayName] = useState("");

  // Replace your handleSubmit with this.
// Ensure you have `mode`, `email`, `password`, `accountType` (or role),
// plus optional `name` and `displayName` state variables available.

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setStatus("Connecting...");
  try {
    if (mode === "signup") {
      // Send signup to server route that creates auth user + accounts row
      const payload = {
        email,
        password,
        // include these if you collect them in the form:
        name: (typeof name !== "undefined" ? name : undefined),
        display_name: (typeof displayName !== "undefined" ? displayName : undefined),
        role: accountType || "individual",
      };

      const { res, json } = await callJsonSafe("/api/account/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(json.error || "Signup failed");

      // Optionally auto-login after signup (recommended UX)
      setStatus("Account created — signing in...");
      const { error: signErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signErr) {
        // account created but auto-login failed; show helpful message
        setStatus("Account created. Please sign in. (auto-login failed: " + signErr.message + ")");
        return;
      }

      setStatus("Account created and signed in.");
      return;
    }

    // MODE === "login"
    // Use Supabase client to sign in (gives you session + token)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setStatus("Logged in");
  } catch (err: any) {
    // surface helpful message
    console.error("handleSubmit error:", err);
    setStatus(err?.message || String(err));
  }
}

  return (
    <main className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-semibold mb-4">{mode === "login" ? "Sign In" : "Create Account"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Account name (public)"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100"
          required
        />

        {/* Only show account type selector on signup */}
        {mode === "signup" && (
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value as "insight" | "influencer")}
            className="p-2 rounded border border-gray-700 bg-[#0b0d11] text-gray-100"
          >
            <option value="insight">Insight account</option>
            <option value="influencer">Influencer account</option>
          </select>
        )}

        <button type="submit" className="px-4 py-2 bg-blue-500 rounded text-black font-semibold">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-4">
        {mode === "login" ? (
          <>
            Don’t have an account?{" "}
            <button onClick={() => setMode("signup")} className="underline">
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => setMode("login")} className="underline">
              Login
            </button>
          </>
        )}
      </p>

      {status && <div className="text-sm mt-3 text-gray-300">{status}</div>}
    </main>
  );
}