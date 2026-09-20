"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Trash2, Pencil } from "lucide-react";
import { addCertification, updateCertification, deleteCertification, uploadAndSetCertificate } from "@/lib/actions/certifications";
import type { Certification } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/crud-helper";

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return <button className="btn-signal" disabled={pending}>{pending ? "Saving…" : label}</button>;
}

function Fields({ item }: { item?: Certification }) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" defaultValue={item?.name} placeholder="Certification name" required className="field" />
        <input name="issuer" defaultValue={item?.issuer} placeholder="Issuer" required className="field" />
      </div>
      <input name="topics" defaultValue={item?.topics.join(", ")} placeholder="Topics covered (comma-separated)" className="field" />
      <div className="grid gap-3 sm:grid-cols-3">
        <input name="issue_date" type="date" defaultValue={item?.issue_date ?? ""} className="field" />
        <input name="credential_url" defaultValue={item?.credential_url ?? ""} placeholder="Credential URL (optional)" className="field" />
        <input name="order_index" type="number" defaultValue={item?.order_index ?? 0} placeholder="Order" className="field" />
      </div>
    </div>
  );
}

function CertificateUpload({ item }: { item: Certification }) {
  const bound = uploadAndSetCertificate.bind(null, item.id);
  const [state, action] = useFormState<ActionResult | null, FormData>(bound, null);
  return (
    <form action={action} className="mt-3 flex items-center gap-3">
      <input type="file" name="file" accept="application/pdf" className="text-sm text-muted" required />
      <SaveButton label={item.certificate_url ? "Replace certificate" : "Upload certificate"} />
      {state && !state.ok && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
    </form>
  );
}

export default function CertificationsManager({ items }: { items: Certification[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addState, addAction] = useFormState<ActionResult | null, FormData>(addCertification, null);

  return (
    <div className="space-y-8">
      <form action={addAction} className="space-y-3 rounded-lg border border-line bg-surface p-4">
        <p className="text-sm font-medium text-ink">Add certification</p>
        <Fields />
        {addState && !addState.ok && <p className="text-sm text-red-600 dark:text-red-400">{addState.error}</p>}
        <SaveButton label="Add" />
      </form>

      <div className="space-y-3">
        {items.map((item) => {
          if (editingId === item.id) {
            const bound = updateCertification.bind(null, item.id);
            return (
              <div key={item.id}>
                <EditForm item={item} action={bound} />
                <CertificateUpload item={item} />
                <button onClick={() => setEditingId(null)} className="mt-1 text-xs text-muted underline">Close</button>
              </div>
            );
          }
          return (
            <div key={item.id} className="flex items-center justify-between rounded-md border border-line px-4 py-3">
              <div>
                <p className="text-sm font-medium text-ink">{item.name}</p>
                <p className="font-mono text-xs text-muted">{item.issuer}{item.certificate_url ? " · certificate on file" : ""}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setEditingId(item.id)} aria-label="Edit" className="rounded p-1.5 text-muted hover:text-ink"><Pencil size={14} /></button>
                <form action={deleteCertification.bind(null, item.id)}>
                  <button aria-label="Delete" className="rounded p-1.5 text-muted hover:text-red-600"><Trash2 size={14} /></button>
                </form>
              </div>
            </div>
          );
        })}
        {items.length === 0 && <p className="text-sm text-muted">No certifications yet.</p>}
      </div>
    </div>
  );
}

function EditForm({ item, action }: { item: Certification; action: (prev: ActionResult | null, fd: FormData) => Promise<ActionResult> }) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(action, null);
  return (
    <form action={formAction} className="space-y-3 rounded-md border border-line bg-paper p-4">
      <Fields item={item} />
      {state && !state.ok && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      <SaveButton label="Update" />
    </form>
  );
}
