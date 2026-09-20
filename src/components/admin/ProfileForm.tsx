"use client";

import { useFormState, useFormStatus } from "react-dom";
import { saveProfile, uploadAndSaveProfileImage, removeProfileImage } from "@/lib/actions/profile";
import type { Profile } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/crud-helper";

function SaveButton({ label = "Save changes" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-signal disabled:opacity-60">
      {pending ? "Saving…" : label}
    </button>
  );
}

function StatusLine({ state }: { state: ActionResult | null }) {
  if (!state) return null;
  if (state.ok) return <p className="text-sm text-signal">Saved.</p>;
  return <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>;
}

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [textState, textAction] = useFormState<ActionResult | null, FormData>(saveProfile, null);
  const [imageState, imageAction] = useFormState<ActionResult | null, FormData>(uploadAndSaveProfileImage, null);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-sm font-medium text-ink">Profile photo</h2>
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-surface">
            {profile.profile_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.profile_image_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="font-display text-2xl text-signal">FU</span>
            )}
          </div>
          <form action={imageAction} className="flex items-center gap-3">
            <input type="file" name="file" accept="image/png,image/jpeg,image/webp,image/gif" className="text-sm text-muted" required />
            <SaveButton label="Upload" />
          </form>
          {profile.profile_image_url && (
            <form action={removeProfileImage}>
              <button type="submit" className="btn-secondary">Remove</button>
            </form>
          )}
        </div>
        <StatusLine state={imageState} />
      </section>

      <section className="border-t border-line pt-8">
        <h2 className="mb-4 text-sm font-medium text-ink">Profile &amp; About</h2>
        <form action={textAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" defaultValue={profile.name} />
            <Field label="Professional title" name="title" defaultValue={profile.title} />
            <Field label="Email" name="email" type="email" defaultValue={profile.email} />
            <Field label="Location" name="location" defaultValue={profile.location} />
            <Field label="WhatsApp (digits only, with country code)" name="whatsapp" defaultValue={profile.whatsapp} />
            <Field label="GitHub username" name="github" defaultValue={profile.github} />
            <Field label="LinkedIn URL (optional)" name="linkedin" defaultValue={profile.linkedin ?? ""} />
          </div>
          <Field label="Hero heading" name="hero_heading" defaultValue={profile.hero_heading} />
          <TextArea label="Hero supporting text" name="hero_subtext" defaultValue={profile.hero_subtext} rows={3} />
          <TextArea
            label="About paragraphs (one per line)"
            name="about_paragraphs"
            defaultValue={profile.about_paragraphs.join("\n")}
            rows={6}
          />
          <StatusLine state={textState} />
          <SaveButton />
        </form>
      </section>
    </div>
  );
}

function Field({ label, name, defaultValue, type = "text" }: { label: string; name: string; defaultValue: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-ink">{label}</label>
      <input id={name} name={name} type={type} defaultValue={defaultValue} className="field" />
    </div>
  );
}

function TextArea({ label, name, defaultValue, rows }: { label: string; name: string; defaultValue: string; rows: number }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-ink">{label}</label>
      <textarea id={name} name={name} defaultValue={defaultValue} rows={rows} className="field resize-none" />
    </div>
  );
}
