"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";   // add this import at the top of the file


export default function AccountStatus() {
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getUser();
        const user = data?.user ?? null;
        if (!mounted) return;
        setUserId(user?.id ?? null);
        setDisplayName(
          (user as any)?.user_metadata?.display_name ??
          (user as any)?.user_metadata?.name ??
          null
        );
      } catch (err) {
        console.error("AccountStatus load error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    // listen for auth changes so UI updates across pages
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUserId(u?.id ?? null);
      setDisplayName((u as any)?.user_metadata?.display_name ?? (u as any)?.user_metadata?.name ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      // supabase.onAuthStateChange will update the UI; you can also clear local state:
      setUserId(null);
      setDisplayName(null);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  }

  // Loading state or not-signed-in
  if (loading) return <div className="text-sm text-gray-400">...</div>;

  if (!userId) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/account"   // 👈 adjust if your login page is /account/login
          className="text-sm bg-blue-500 hover:bg-blue-400 text-black font-semibold px-3 py-1 rounded"
        >
          Sign in
        </Link>
      </div>
    );
  }

  // Signed in view
  return (
    <div className="flex items-center gap-3">
      {/* small avatar / icon placeholder */}
      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold text-white">
        {displayName ? displayName[0].toUpperCase() : "U"}
      </div>

      <div className="text-sm text-gray-100 text-left">
        <div className="font-semibold">{displayName ?? "Account"}</div>
        <div className="text-xs text-gray-400">ID: <span className="font-mono">{userId.slice(0, 8)}</span></div>
      </div>

      <button
        onClick={handleSignOut}
        className="ml-3 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-white"
        title="Sign out"
      >
        Sign out
      </button>
    </div>
  );
}