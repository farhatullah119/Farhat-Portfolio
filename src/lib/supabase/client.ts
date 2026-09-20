"use client";

import { createBrowserClient } from "@supabase/ssr";

function isSupabaseConfigured(url?: string, key?: string): boolean {
  if (!url || !key) return false;
  if (url.includes("your-project") || url.includes("example.com")) return false;
  if (key.includes("your-supabase") || key.includes("your-anon") || key.includes("your-service")) return false;
  return true;
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!isSupabaseConfigured(url, key)) return null;
  return createBrowserClient(url!, key!);
}
