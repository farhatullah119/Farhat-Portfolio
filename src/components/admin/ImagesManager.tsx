"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";
import { uploadImage, deleteImage } from "@/lib/actions/images";
import type { SiteImage } from "@/lib/types";
import type { UploadResult } from "@/lib/actions/images";

function SaveButton() {
  const { pending } = useFormStatus();
  return <button className="btn-signal" disabled={pending}>{pending ? "Uploading…" : "Upload"}</button>;
}

async function uploadWrapper(_prev: UploadResult | null, formData: FormData) {
  return uploadImage(formData);
}

export default function ImagesManager({ images }: { images: SiteImage[] }) {
  const [state, action] = useFormState<UploadResult | null, FormData>(uploadWrapper, null);

  function pathFromUrl(url: string) {
    const marker = "/object/public/portfolio/";
    const idx = url.indexOf(marker);
    return idx >= 0 ? url.slice(idx + marker.length) : url;
  }

  return (
    <div className="space-y-8">
      <form action={action} className="space-y-3 rounded-lg border border-line bg-surface p-4">
        <p className="text-sm font-medium text-ink">Upload an image</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <input type="file" name="file" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" required className="field" />
          <input name="category" placeholder="Category (e.g. project, certificate, about)" className="field" />
        </div>
        <input name="alt" placeholder="Alt text (for accessibility)" className="field" />
        {state && !state.ok && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
        <SaveButton />
      </form>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-md border border-line bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.alt ?? ""} className="aspect-square w-full object-cover" />
            <form action={deleteImage.bind(null, img.id, pathFromUrl(img.url))} className="absolute right-2 top-2">
              <button
                aria-label="Delete image"
                onClick={(e) => {
                  if (!confirm("Delete this image permanently?")) e.preventDefault();
                }}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-ink/80 text-paper opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 size={13} />
              </button>
            </form>
            <p className="truncate px-2 py-1.5 font-mono text-xs text-muted">{img.filename}</p>
          </div>
        ))}
        {images.length === 0 && <p className="col-span-full text-sm text-muted">No images uploaded yet.</p>}
      </div>
    </div>
  );
}
