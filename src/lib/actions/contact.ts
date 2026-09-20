"use server";

import { createClient } from "@/lib/supabase/server";
import { localInsertContactMessage } from "@/lib/local-store";

export type ContactState = { ok: boolean; error?: string } | null;

/** Public contact-form submission. Stores the message in Supabase or local-data.json. */
export async function submitContactForm(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in your name, email, and message." };
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const supabase = createClient();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({ name, email, subject, message });
    if (error) return { ok: false, error: "Something went wrong sending your message. Please try again." };
  } else {
    localInsertContactMessage({ name, email, subject: subject || null, message });
  }

  return { ok: true };
}
