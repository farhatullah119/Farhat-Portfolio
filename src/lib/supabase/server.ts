import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

function isSupabaseConfigured(url?: string, key?: string): boolean {
  if (!url || !key) return false;
  if (url.includes("your-project") || url.includes("example.com")) return false;
  if (key.includes("your-supabase") || key.includes("your-anon") || key.includes("your-service")) return false;
  return true;
}

/**
 * Server-side Supabase client, scoped to the current request's cookies.
 * Returns null when Supabase env vars are not configured or when called
 * outside of a request scope (e.g. during static build).
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!isSupabaseConfigured(url, key)) return null;

  try {
    const cookieStore = cookies();
    return createServerClient(url!, key!, {
      cookies: {
        getAll() {
          try {
            return cookieStore.getAll();
          } catch {
            return [];
          }
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component with no writable cookies — safe to ignore
          }
        },
      },
    });
  } catch {
    return null;
  }
}
