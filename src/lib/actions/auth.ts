"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signLocalIn, signLocalOut } from "@/lib/local-auth";

export async function signIn(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  // 1. Try Supabase auth if configured
  const supabase = createClient();
  if (supabase) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) redirect("/admin");
    // Supabase returned an error — fall through to local auth
  }

  // 2. Try local credential auth
  const localError = await signLocalIn(email, password);
  if (!localError) redirect("/admin");

  // 3. Both failed — return error
  return { error: localError };
}

export async function signOut() {
  // Sign out from Supabase if configured
  const supabase = createClient();
  if (supabase) await supabase.auth.signOut();

  // Always clear local session cookie
  await signLocalOut();

  redirect("/admin/login");
}
