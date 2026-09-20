import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { hasLocalSession } from "./local-auth";

/**
 * Call at the top of any admin Server Component to enforce auth.
 * Checks Supabase session first (if configured), then falls back
 * to the local cookie session (for when Supabase isn't set up yet).
 */
export async function requireAdminSession() {
  // 1. Try Supabase auth if it's configured
  const supabase = createClient();
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (data?.user) return data.user;
    // Supabase is configured but no session — check local auth too
  }

  // 2. Fall back to local cookie session
  if (hasLocalSession()) {
    return { id: "local", email: process.env.ADMIN_EMAIL ?? "admin" };
  }

  // 3. No valid session — redirect to login
  redirect("/admin/login");
}
