// components/AccountForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Role = "individual" | "influencer" | "insight";

async function createAccount(
  email: string,
  password: string,
  name?: string,
  role: Role = "individual",
  display_name?: string
) {
  const res = await fetch("/api/account/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, role, display_name }),
  });

  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();

  if (!contentType.includes("application/json")) {
    console.error("Non-JSON response from /api/account/signup:", text);
    throw new Error("Server returned non-JSON response; check server logs or route path.");
  }

  const json = JSON.parse(text);
  if (!res.ok) throw new Error(json.error || "Signup failed");
  return json;
}

export default function AccountForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<Role>("individual");
  const [status, setStatus] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // fetch current session / user metadata
  useEffect(() => {
    (async () => {
      const u = await supabase.auth.getUser();
      const user = u.data?.user;
      setUserId(user?.id ?? null);
      setUserDisplayName(user?.user_metadata?.display_name ?? null);

      // listen for auth state changes
      supabase.auth.onAuthStateChange((_event, session) => {
        const usr = session?.user ?? null;
        setUserId(usr?.id ?? null);
        setUserDisplayName(usr?.user_metadata?.display_name ?? null);
      });
    })();
  }, []);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      if (!email || !password) {
        setStatus("Email and password are required.");
        return;
      }

      const res = await createAccount(email, password, name || undefined, role, displayName || undefined);
      setStatus("Account created — signing in...");
      const { error: signErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signErr) {
        setStatus("Account created. Please sign in manually: " + signErr.message);
        return;
      }

      const u = await supabase.auth.getUser();
      setUserDisplayName(u.data?.user?.user_metadata?.display_name ?? null);
      setUserId(u.data?.user?.id ?? null);
      setStatus("Account created and signed in.");
      setMode("login");
    } catch (err: any) {
      console.error("Signup error:", err);
      setStatus(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setStatus("Signed in");

      const u = await supabase.auth.getUser();
      setUserDisplayName(u.data?.user?.user_metadata?.display_name ?? null);
      setUserId(u.data?.user?.id ?? null);
    } catch (err: any) {
      console.error("Login error:", err);
      setStatus(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUserId(null);
    setUserDisplayName(null);
    setStatus("Signed out");
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{mode === "signup" ? "Create an account" : "Sign in"}</h2>
        <button
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          className="text-sm underline"
          type="button"
        >
          {mode === "signup" ? "Have an account?" : "Create account"}
        </button>
      </div>

      {mode === "signup" ? (
        <form onSubmit={handleSignup} className="flex flex-col gap-2">
          <label className="text-sm">Account name (public)</label>
          <input
            type="text"
            placeholder="e.g. Vincent's Club"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="p-2 rounded bg-[#0b0d11] text-gray-100 border"
          />

          <label className="text-sm">Internal name (optional)</label>
          <input
            type="text"
            placeholder="Internal name (slug)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-[#0b0d11] text-gray-100 border"
          />

          <label className="text-sm">Account type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="p-2 rounded bg-[#0b0d11] text-gray-100 border"
          >
            <option value="individual">Individual</option>
            <option value="influencer">Influencer</option>
            <option value="insight">Insight (company)</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded bg-[#0b0d11] text-gray-100 border"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 rounded bg-[#0b0d11] text-gray-100 border"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 rounded text-black font-semibold mt-2"
          >
            {loading ? "…" : "Create account"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded bg-[#0b0d11] text-gray-100 border"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 rounded bg-[#0b0d11] text-gray-100 border"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 rounded text-black font-semibold mt-2"
          >
            {loading ? "…" : "Sign in"}
          </button>
        </form>
      )}

      <div className="mt-4">
        {status && <div className="text-sm text-gray-300 mb-2">{status}</div>}

        {userId ? (
          <div className="text-sm bg-[#0b0d11] border border-gray-700 rounded p-3">
            <div>
              ✅ <span className="font-semibold">Signed in as:</span>{" "}
              <span className="text-blue-400">{userDisplayName ?? "Unnamed Account"}</span>
            </div>
            <div className="text-xs mt-1 text-gray-400">
              User ID: <code className="font-mono">{userId}</code>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-3 px-3 py-1 bg-gray-700 rounded text-white text-sm"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="text-xs text-gray-500 mt-2">Not signed in</div>
        )}
      </div>
    </div>
  );
}