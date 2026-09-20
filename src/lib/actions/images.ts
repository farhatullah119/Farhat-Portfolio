"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";
import { localInsertImage, localDeleteImage } from "@/lib/local-store";

export type UploadResult = { ok: true; url: string } | { ok: false; error: string };

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];
const DOC_TYPES = ["application/pdf"];
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

// ─── Supabase upload (when configured) ───────────────────────────────────────

async function uploadToSupabase(file: File, folder: string, allowedTypes: string[]): Promise<UploadResult> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Supabase not configured." };
  if (!allowedTypes.includes(file.type)) {
    return { ok: false, error: `File type "${file.type || "unknown"}" isn't allowed here.` };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "File is larger than 8MB. Please upload a smaller file." };
  }
  const ext = file.name.split(".").pop() || "bin";
  const filePath = `${folder}/${randomUUID()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error } = await admin.storage.from("portfolio").upload(filePath, bytes, {
    contentType: file.type,
    upsert: false,
  });
  if (error) return { ok: false, error: error.message };
  const { data } = admin.storage.from("portfolio").getPublicUrl(filePath);
  return { ok: true, url: data.publicUrl };
}

// ─── Local filesystem upload (when Supabase not configured) ──────────────────

async function uploadToLocal(file: File, folder: string, allowedTypes: string[]): Promise<UploadResult> {
  if (!allowedTypes.includes(file.type)) {
    return { ok: false, error: `File type "${file.type || "unknown"}" isn't allowed here.` };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "File is larger than 8MB. Please upload a smaller file." };
  }

  const ext = file.name.split(".").pop() || "bin";
  const filename = `${randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  fs.mkdirSync(uploadDir, { recursive: true });

  const bytes = new Uint8Array(await file.arrayBuffer());
  fs.writeFileSync(path.join(uploadDir, filename), bytes);

  return { ok: true, url: `/uploads/${folder}/${filename}` };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function uploadImage(formData: FormData): Promise<UploadResult> {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { ok: false, error: "No file selected." };

  const admin = createAdminClient();
  let result: UploadResult;

  if (admin) {
    result = await uploadToSupabase(file, "images", IMAGE_TYPES);
    if (result.ok) {
      await admin.from("images").insert({
        url: result.url,
        filename: file.name,
        alt: String(formData.get("alt") || ""),
        category: String(formData.get("category") || "general"),
      });
    }
  } else {
    result = await uploadToLocal(file, "images", IMAGE_TYPES);
    if (result.ok) {
      localInsertImage({
        url: result.url,
        filename: file.name,
        alt: String(formData.get("alt") || "") || null,
        category: String(formData.get("category") || "general") || null,
      });
    }
  }

  if (result.ok) revalidatePath("/admin/images");
  return result;
}

export async function deleteImage(id: string, pathOrUrl: string): Promise<void> {
  const admin = createAdminClient();

  if (admin) {
    await admin.storage.from("portfolio").remove([pathOrUrl]);
    await admin.from("images").delete().eq("id", id);
  } else {
    // pathOrUrl is the public URL like /uploads/images/uuid.jpg
    const localUrl = localDeleteImage(id);
    if (localUrl && localUrl.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", localUrl);
      try { fs.unlinkSync(filePath); } catch { /* file may already be gone */ }
    }
  }

  revalidatePath("/admin/images");
}

export async function uploadDocument(formData: FormData, folder: "resumes" | "certificates"): Promise<UploadResult> {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { ok: false, error: "No file selected." };

  const admin = createAdminClient();
  if (admin) return uploadToSupabase(file, folder, DOC_TYPES);
  return uploadToLocal(file, folder, DOC_TYPES);
}
