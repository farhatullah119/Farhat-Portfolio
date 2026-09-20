"use server";

import { revalidatePath } from "next/cache";
import { upsertSingleton, type ActionResult } from "./crud-helper";
import { uploadImage, uploadDocument } from "./images";

export async function saveProfile(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await upsertSingleton("profile", {
    name: String(formData.get("name") || ""),
    title: String(formData.get("title") || ""),
    email: String(formData.get("email") || ""),
    location: String(formData.get("location") || ""),
    whatsapp: String(formData.get("whatsapp") || "").replace(/\D/g, ""),
    github: String(formData.get("github") || ""),
    linkedin: String(formData.get("linkedin") || "") || null,
    hero_heading: String(formData.get("hero_heading") || ""),
    hero_subtext: String(formData.get("hero_subtext") || ""),
    about_paragraphs: String(formData.get("about_paragraphs") || "")
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean),
  });
  if (result.ok) {
    revalidatePath("/");
    revalidatePath("/admin/profile");
  }
  return result;
}

export async function saveProfileImage(url: string): Promise<ActionResult> {
  const result = await upsertSingleton("profile", { profile_image_url: url });
  if (result.ok) revalidatePath("/");
  return result;
}

export async function removeProfileImage(): Promise<void> {
  const result = await upsertSingleton("profile", { profile_image_url: null });
  if (result.ok) revalidatePath("/");
}

export async function saveResume(url: string): Promise<ActionResult> {
  const result = await upsertSingleton("profile", { resume_url: url });
  if (result.ok) revalidatePath("/");
  return result;
}

export async function removeResume(): Promise<void> {
  const result = await upsertSingleton("profile", { resume_url: null });
  if (result.ok) revalidatePath("/");
}

export async function uploadAndSaveProfileImage(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const uploaded = await uploadImage(formData);
  if (!uploaded.ok) return { ok: false, error: uploaded.error };
  return saveProfileImage(uploaded.url);
}

export async function uploadAndSaveResume(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const uploaded = await uploadDocument(formData, "resumes");
  if (!uploaded.ok) return { ok: false, error: uploaded.error };
  return saveResume(uploaded.url);
}
