import { createClient } from "@supabase/supabase-js";

export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { persistSession: false } });
}

// // lib/supabaseServer.ts
// import { createClient } from "@supabase/supabase-js";
// export function createServiceClient() {
//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
//   if (!supabaseUrl || !serviceKey) throw new Error("Missing Supabase env vars");
//   return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
// }

// import { createClient } from "@supabase/supabase-js";

// export function createServiceClient() {
//   if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
//     throw new Error("Missing SUPABASE env vars");
//   }
//   return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
//     auth: { persistSession: false },
//   });
// }