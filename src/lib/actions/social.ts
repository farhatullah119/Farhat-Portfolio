"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { localSaveSocialLink } from "@/lib/local-store";
import type { ActionResult } from "./crud-helper";

export async function saveSocialLink(id: string, _prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const url = String(formData.get("url") || "");
  const platform = String(formData.get("platform") || id);
  const visible = url.length > 0;

  const supabase = createClient();
  if (supabase) {
    const { error } = await supabase.from("social_links").upsert({ id, platform, url, visible });
    if (error) return { ok: false, error: error.message };
  } else {
    localSaveSocialLink({ id, platform, url, visible });
  }

  revalidatePath("/");
  revalidatePath("/admin/social");
  return { ok: true };
}
