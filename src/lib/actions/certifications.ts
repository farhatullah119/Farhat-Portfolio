"use server";

import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow, parseList, type ActionResult } from "./crud-helper";
import { uploadDocument } from "./images";

function fieldsFrom(formData: FormData) {
  return {
    name: String(formData.get("name") || ""),
    issuer: String(formData.get("issuer") || ""),
    topics: parseList(formData.get("topics")),
    issue_date: String(formData.get("issue_date") || "") || null,
    credential_url: String(formData.get("credential_url") || "") || null,
    order_index: Number(formData.get("order_index") || 0),
  };
}

export async function addCertification(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await insertRow("certifications", fieldsFrom(formData));
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/certifications");
  return result;
}

export async function updateCertification(id: string, _prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const result = await updateRow("certifications", id, fieldsFrom(formData));
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/certifications");
  return result;
}

export async function deleteCertification(id: string): Promise<void> {
  const result = await deleteRow("certifications", id);
  if (result.ok) {
    revalidatePath("/");
    revalidatePath("/admin/certifications");
  }
}

export async function setCertificateFile(id: string, url: string): Promise<ActionResult> {
  const result = await updateRow("certifications", id, { certificate_url: url });
  if (result.ok) revalidatePath("/"), revalidatePath("/admin/certifications");
  return result;
}

export async function uploadAndSetCertificate(id: string, _prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const uploaded = await uploadDocument(formData, "certificates");
  if (!uploaded.ok) return { ok: false, error: uploaded.error };
  return setCertificateFile(id, uploaded.url);
}
