"use server";

import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow, type ActionResult } from "./crud-helper";

function fieldsFrom(formData: FormData) {
  return {
    institution: String(formData.get("institution") || ""),
    program: String(formData.get("program") || ""),
    description: String(formData.get("description") || "") || null,
    start_year: String(formData.get("start_year") || "") || null,
    end_year: String(formData.get("end_year") || "") || null,
    order_index: Number(formData.get("order_index") || 0),
  };
}

export async function addEducation(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await insertRow("education", fieldsFrom(formData));
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/education");
  return result;
}

export async function updateEducation(id: string, _prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await updateRow("education", id, fieldsFrom(formData));
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/education");
  return result;
}

export async function deleteEducation(id: string): Promise<void> {
  const result = await deleteRow("education", id);
  if (result.ok) {
    revalidatePath("/");
    revalidatePath("/admin/education");
  }
}
