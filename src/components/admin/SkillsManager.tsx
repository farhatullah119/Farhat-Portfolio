"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Trash2, Pencil } from "lucide-react";
import { addSkill, updateSkill, deleteSkill } from "@/lib/actions/skills";
import type { Skill } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/crud-helper";

const CATEGORIES: Skill["category"][] = ["Data Science", "Artificial Intelligence", "Development", "Cybersecurity & Networking"];
const PROFICIENCIES: Skill["proficiency"][] = ["learning", "familiar", "project_experience"];

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return <button className="btn-signal" disabled={pending}>{pending ? "Saving…" : label}</button>;
}

function SkillFields({ skill }: { skill?: Skill }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <input name="name" defaultValue={skill?.name} placeholder="Skill name" required className="field" />
      <select name="category" defaultValue={skill?.category ?? CATEGORIES[0]} className="field">
        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <select name="proficiency" defaultValue={skill?.proficiency ?? "learning"} className="field">
        {PROFICIENCIES.map((p) => <option key={p} value={p}>{p.replace("_", " ")}</option>)}
      </select>
      <input name="order_index" type="number" defaultValue={skill?.order_index ?? 0} placeholder="Order" className="field" />
    </div>
  );
}

function EditRow({ skill }: { skill: Skill }) {
  const boundUpdate = updateSkill.bind(null, skill.id);
  const [state, action] = useFormState<ActionResult | null, FormData>(boundUpdate, null);
  return (
    <form action={action} className="space-y-2 rounded-md border border-line bg-paper p-3">
      <SkillFields skill={skill} />
      {state && !state.ok && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      <SaveButton label="Update" />
    </form>
  );
}

export default function SkillsManager({ skills }: { skills: Skill[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addState, addAction] = useFormState<ActionResult | null, FormData>(addSkill, null);

  return (
    <div className="space-y-8">
      <form action={addAction} className="space-y-2 rounded-lg border border-line bg-surface p-4">
        <p className="text-sm font-medium text-ink">Add a skill</p>
        <SkillFields />
        {addState && !addState.ok && <p className="text-sm text-red-600 dark:text-red-400">{addState.error}</p>}
        <SaveButton label="Add skill" />
      </form>

      <div className="space-y-2">
        {skills.map((skill) =>
          editingId === skill.id ? (
            <div key={skill.id}>
              <EditRow skill={skill} />
              <button onClick={() => setEditingId(null)} className="mt-1 text-xs text-muted underline">Cancel</button>
            </div>
          ) : (
            <div key={skill.id} className="flex items-center justify-between rounded-md border border-line px-4 py-2.5">
              <div>
                <span className="text-sm text-ink">{skill.name}</span>
                <span className="ml-2 font-mono text-xs text-muted">{skill.category} · {skill.proficiency.replace("_", " ")}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setEditingId(skill.id)} aria-label="Edit" className="rounded p-1.5 text-muted hover:text-ink">
                  <Pencil size={14} />
                </button>
                <form action={deleteSkill.bind(null, skill.id)}>
                  <button aria-label="Delete" className="rounded p-1.5 text-muted hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </form>
              </div>
            </div>
          )
        )}
        {skills.length === 0 && <p className="text-sm text-muted">No skills yet — add your first one above.</p>}
      </div>
    </div>
  );
}
