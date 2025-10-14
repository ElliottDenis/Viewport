// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(URL, ANON);

export function createServiceClient() {
  const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!SERVICE) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return createClient(URL, SERVICE, { auth: { persistSession: false } });
}
