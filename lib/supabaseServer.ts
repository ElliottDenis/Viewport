// lib/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";
export function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) throw new Error("Missing Supabase env vars");
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}