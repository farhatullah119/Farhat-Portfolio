"use server";

import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow, type ActionResult } from "./crud-helper";

function fieldsFrom(formData: FormData) {
  return {
    title: String(formData.get("title") || ""),
    category: String(formData.get("category") || "Academic"),
    description: String(formData.get("description") || ""),
    date: String(formData.get("date") || "") || null,
    published: formData.get("published") === "on",
    order_index: Number(formData.get("order_index") || 0),
  };
}

export async function addAchievement(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await insertRow("achievements", fieldsFrom(formData));
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/achievements");
  return result;
}

export async function updateAchievement(id: string, _prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await updateRow("achievements", id, fieldsFrom(formData));
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/achievements");
  return result;
}

export async function deleteAchievement(id: string): Promise<void> {
  const result = await deleteRow("achievements", id);
  if (result.ok) {
    revalidatePath("/");
    revalidatePath("/admin/achievements");
  }
}
