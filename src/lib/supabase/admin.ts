import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function isSupabaseConfigured(url?: string, key?: string): boolean {
  if (!url || !key) return false;
  if (url.includes("your-project") || url.includes("example.com")) return false;
  if (key.includes("your-supabase") || key.includes("your-anon") || key.includes("your-service")) return false;
  return true;
}

/**
 * Service-role client for privileged admin operations (storage uploads,
 * writes that must bypass RLS from a trusted server action). Never import
 * this into client components — the key must stay server-only.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured(url, key)) return null;
  return createSupabaseClient(url!, key!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
