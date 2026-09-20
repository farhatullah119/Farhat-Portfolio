"use server";

import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow, type ActionResult } from "./crud-helper";

function fieldsFrom(formData: FormData) {
  return {
    organization: String(formData.get("organization") || ""),
    position: String(formData.get("position") || ""),
    location: String(formData.get("location") || "") || null,
    category: String(formData.get("category") || "Community Outreach"),
    start_date: String(formData.get("start_date") || ""),
    end_date: String(formData.get("end_date") || "") || null,
    description: String(formData.get("description") || ""),
    published: formData.get("published") === "on",
    order_index: Number(formData.get("order_index") || 0),
  };
}

export async function addExperience(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await insertRow("experience", fieldsFrom(formData));
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/experience");
  return result;
}

export async function updateExperience(id: string, _prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await updateRow("experience", id, fieldsFrom(formData));
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/experience");
  return result;
}

export async function deleteExperience(id: string): Promise<void> {
  const result = await deleteRow("experience", id);
  if (result.ok) {
    revalidatePath("/");
    revalidatePath("/admin/experience");
  }
}
