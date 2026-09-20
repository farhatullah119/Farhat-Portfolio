"use server";

import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow, parseList, type ActionResult } from "./crud-helper";
import { uploadImage } from "./images";

function fieldsFrom(formData: FormData) {
  return {
    name: String(formData.get("name") || ""),
    slug: String(formData.get("slug") || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    category: String(formData.get("category") || "AI"),
    status: String(formData.get("status") || "In Progress"),
    description: String(formData.get("description") || ""),
    technologies: parseList(formData.get("technologies")),
    features: parseList(formData.get("features")),
    github_url: String(formData.get("github_url") || "") || null,
    live_url: String(formData.get("live_url") || "") || null,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    order_index: Number(formData.get("order_index") || 0),
    overview: String(formData.get("overview") || "") || null,
    problem: String(formData.get("problem") || "") || null,
    solution: String(formData.get("solution") || "") || null,
    challenges: String(formData.get("challenges") || "") || null,
    learnings: String(formData.get("learnings") || "") || null,
    future_improvements: String(formData.get("future_improvements") || "") || null,
  };
}

export async function addProject(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await insertRow("projects", fieldsFrom(formData));
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/projects");
  return result;
}

export async function updateProject(id: string, _prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await updateRow("projects", id, fieldsFrom(formData));
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/projects");
  return result;
}

export async function deleteProject(id: string): Promise<void> {
  const result = await deleteRow("projects", id);
  if (result.ok) {
    revalidatePath("/");
    revalidatePath("/admin/projects");
  }
}

export async function setProjectImage(id: string, url: string): Promise<ActionResult> {
  const result = await updateRow("projects", id, { image_url: url });
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/projects");
  return result;
}

export async function uploadAndSetProjectImage(id: string, _prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const uploaded = await uploadImage(formData);
  if (!uploaded.ok) return { ok: false, error: uploaded.error };
  return setProjectImage(id, uploaded.url);
}
