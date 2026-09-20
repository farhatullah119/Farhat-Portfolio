"use client";

import { useFormState, useFormStatus } from "react-dom";
import { saveSocialLink } from "@/lib/actions/social";
import type { SocialLink } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/crud-helper";

function SaveButton() {
  const { pending } = useFormStatus();
  return <button className="btn-secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</button>;
}

function Row({ link }: { link: SocialLink }) {
  const bound = saveSocialLink.bind(null, link.id);
  const [state, action] = useFormState<ActionResult | null, FormData>(bound, null);
  return (
    <form action={action} className="flex flex-col gap-2 rounded-md border border-line px-4 py-3 sm:flex-row sm:items-center">
      <input type="hidden" name="platform" value={link.platform} />
      <span className="w-28 shrink-0 text-sm text-ink">{link.platform}</span>
      <input name="url" defaultValue={link.url} placeholder="https://…  (leave blank to hide)" className="field" />
      <SaveButton />
      {state && !state.ok && <p className="text-xs text-red-600 dark:text-red-400">{state.error}</p>}
    </form>
  );
}

export default function SocialLinksManager({ links }: { links: SocialLink[] }) {
  return (
    <div className="space-y-3">
      {links.map((link) => <Row key={link.id} link={link} />)}
      <p className="text-xs text-muted">An icon only appears on the public site once a URL is set here — nothing is invented.</p>
    </div>
  );
}
