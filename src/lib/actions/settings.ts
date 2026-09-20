"use server";

import { revalidatePath } from "next/cache";
import { upsertSingleton, type ActionResult } from "./crud-helper";

export async function saveSettings(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await upsertSingleton("settings", {
    site_title: String(formData.get("site_title") || ""),
    meta_description: String(formData.get("meta_description") || ""),
    chatbot_enabled: formData.get("chatbot_enabled") === "on",
    chatbot_system_prompt: String(formData.get("chatbot_system_prompt") || ""),
  });
  if (result.ok) {
    revalidatePath("/");
    revalidatePath("/admin/settings");
  }
  return result;
}
