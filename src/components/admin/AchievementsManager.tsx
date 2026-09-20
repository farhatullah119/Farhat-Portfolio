"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Trash2, Pencil } from "lucide-react";
import { addAchievement, updateAchievement, deleteAchievement } from "@/lib/actions/achievements";
import type { Achievement } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/crud-helper";

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return <button className="btn-signal" disabled={pending}>{pending ? "Saving…" : label}</button>;
}

function Fields({ item }: { item?: Achievement }) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="title" defaultValue={item?.title} placeholder="Achievement title" required className="field" />
        <input name="category" defaultValue={item?.category} placeholder="Category" className="field" />
      </div>
      <textarea name="description" defaultValue={item?.description} placeholder="Description" required rows={2} className="field resize-none" />
      <div className="grid gap-3 sm:grid-cols-3">
        <input name="date" type="date" defaultValue={item?.date ?? ""} className="field" />
        <input name="order_index" type="number" defaultValue={item?.order_index ?? 0} placeholder="Order" className="field" />
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="published" defaultChecked={item?.published ?? true} /> Published
        </label>
      </div>
    </div>
  );
}

export default function AchievementsManager({ items }: { items: Achievement[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addState, addAction] = useFormState<ActionResult | null, FormData>(addAchievement, null);

  return (
    <div className="space-y-8">
      <form action={addAction} className="space-y-3 rounded-lg border border-line bg-surface p-4">
        <p className="text-sm font-medium text-ink">Add achievement</p>
        <Fields />
        {addState && !addState.ok && <p className="text-sm text-red-600 dark:text-red-400">{addState.error}</p>}
        <SaveButton label="Add" />
      </form>

      <div className="space-y-3">
        {items.map((item) => {
          if (editingId === item.id) {
            return <EditForm key={item.id} item={item} action={updateAchievement.bind(null, item.id)} onClose={() => setEditingId(null)} />;
          }
          return (
            <div key={item.id} className="flex items-center justify-between rounded-md border border-line px-4 py-3">
              <div>
                <p className="text-sm font-medium text-ink">{item.title}</p>
                <p className="font-mono text-xs text-muted">{item.category}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setEditingId(item.id)} aria-label="Edit" className="rounded p-1.5 text-muted hover:text-ink"><Pencil size={14} /></button>
                <form action={deleteAchievement.bind(null, item.id)}>
                  <button aria-label="Delete" className="rounded p-1.5 text-muted hover:text-red-600"><Trash2 size={14} /></button>
                </form>
              </div>
            </div>
          );
        })}
        {items.length === 0 && <p className="text-sm text-muted">No achievements yet.</p>}
      </div>
    </div>
  );
}

function EditForm({ item, action, onClose }: { item: Achievement; action: (prev: ActionResult | null, fd: FormData) => Promise<ActionResult>; onClose: () => void }) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(action, null);
  return (
    <div>
      <form action={formAction} className="space-y-3 rounded-md border border-line bg-paper p-4">
        <Fields item={item} />
        {state && !state.ok && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
        <SaveButton label="Update" />
      </form>
      <button onClick={onClose} className="mt-1 text-xs text-muted underline">Close</button>
    </div>
  );
}
