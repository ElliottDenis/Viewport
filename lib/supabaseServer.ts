// lib/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client using the SERVICE_ROLE key.
 * Use only on the server side (never expose service key to the browser).
 */
export function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}