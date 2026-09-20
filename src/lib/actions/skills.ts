"use server";

import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow, type ActionResult } from "./crud-helper";

export async function addSkill(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await insertRow("skills", {
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || "Data Science"),
    proficiency: String(formData.get("proficiency") || "learning"),
    order_index: Number(formData.get("order_index") || 0),
  });
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/skills");
  return result;
}

export async function updateSkill(id: string, _prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await updateRow("skills", id, {
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || "Data Science"),
    proficiency: String(formData.get("proficiency") || "learning"),
    order_index: Number(formData.get("order_index") || 0),
  });
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/skills");
  return result;
}

export async function deleteSkill(id: string): Promise<void> {
  const result = await deleteRow("skills", id);
  if (result.ok) {
    revalidatePath("/");
    revalidatePath("/admin/skills");
  }
}
