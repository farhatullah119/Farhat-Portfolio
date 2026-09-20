"use client";

import { useFormState, useFormStatus } from "react-dom";
import { uploadAndSaveResume, removeResume } from "@/lib/actions/profile";
import type { ActionResult } from "@/lib/actions/crud-helper";

function SaveButton() {
  const { pending } = useFormStatus();
  return <button className="btn-signal" disabled={pending}>{pending ? "Uploading…" : "Upload / Replace"}</button>;
}

export default function ResumeManager({ resumeUrl }: { resumeUrl: string | null }) {
  const [state, action] = useFormState<ActionResult | null, FormData>(uploadAndSaveResume, null);

  return (
    <div className="space-y-4">
      {resumeUrl ? (
        <div className="flex items-center justify-between rounded-md border border-line px-4 py-3">
          <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-sm text-signal underline">View current resume</a>
          <form action={removeResume}>
            <button className="btn-secondary">Remove</button>
          </form>
        </div>
      ) : (
        <p className="text-sm text-muted">No resume uploaded yet.</p>
      )}

      <form action={action} className="flex items-center gap-3">
        <input type="file" name="file" accept="application/pdf" className="text-sm text-muted" required />
        <SaveButton />
      </form>
      {state && !state.ok && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
    </div>
  );
}
