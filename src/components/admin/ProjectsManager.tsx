"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Trash2, Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { addProject, updateProject, deleteProject, uploadAndSetProjectImage } from "@/lib/actions/projects";
import type { Project, ProjectCategory, ProjectStatus } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/crud-helper";

const CATEGORIES: ProjectCategory[] = ["Data Science", "AI", "Web Development", "Cybersecurity", "Networking", "Social Impact"];
const STATUSES: ProjectStatus[] = ["Live", "In Progress", "Prototype / Concept", "Coming Soon"];

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return <button className="btn-signal" disabled={pending}>{pending ? "Saving…" : label}</button>;
}

function ProjectFields({ project }: { project?: Project }) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" defaultValue={project?.name} placeholder="Project name" required className="field" />
        <input name="slug" defaultValue={project?.slug} placeholder="url-slug (auto if left blank)" className="field" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <select name="category" defaultValue={project?.category ?? CATEGORIES[0]} className="field">
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select name="status" defaultValue={project?.status ?? "In Progress"} className="field">
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input name="order_index" type="number" defaultValue={project?.order_index ?? 0} placeholder="Order" className="field" />
      </div>
      <textarea name="description" defaultValue={project?.description} placeholder="Short description" required rows={2} className="field resize-none" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="technologies" defaultValue={project?.technologies.join(", ")} placeholder="Technologies (comma-separated)" className="field" />
        <input name="features" defaultValue={project?.features.join(", ")} placeholder="Features (comma-separated)" className="field" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="github_url" defaultValue={project?.github_url ?? ""} placeholder="GitHub URL" className="field" />
        <input name="live_url" defaultValue={project?.live_url ?? ""} placeholder="Live demo URL" className="field" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="featured" defaultChecked={project?.featured ?? true} /> Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="published" defaultChecked={project?.published ?? true} /> Published
        </label>
      </div>
      <details className="rounded-md border border-line p-3">
        <summary className="cursor-pointer text-sm text-ink">Project detail page (optional)</summary>
        <div className="mt-3 space-y-3">
          <textarea name="overview" defaultValue={project?.overview ?? ""} placeholder="Overview" rows={2} className="field resize-none" />
          <textarea name="problem" defaultValue={project?.problem ?? ""} placeholder="Problem" rows={2} className="field resize-none" />
          <textarea name="solution" defaultValue={project?.solution ?? ""} placeholder="Solution" rows={2} className="field resize-none" />
          <textarea name="challenges" defaultValue={project?.challenges ?? ""} placeholder="Challenges" rows={2} className="field resize-none" />
          <textarea name="learnings" defaultValue={project?.learnings ?? ""} placeholder="What I learned" rows={2} className="field resize-none" />
          <textarea name="future_improvements" defaultValue={project?.future_improvements ?? ""} placeholder="Future improvements" rows={2} className="field resize-none" />
        </div>
      </details>
    </div>
  );
}

function ImageUploadRow({ project }: { project: Project }) {
  const bound = uploadAndSetProjectImage.bind(null, project.id);
  const [state, action] = useFormState<ActionResult | null, FormData>(bound, null);
  return (
    <form action={action} className="mt-3 flex items-center gap-3">
      <input type="file" name="file" accept="image/png,image/jpeg,image/webp,image/gif" className="text-sm text-muted" required />
      <SaveButton label="Upload image" />
      {state && !state.ok && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
    </form>
  );
}

function EditPanel({ project }: { project: Project }) {
  const bound = updateProject.bind(null, project.id);
  const [state, action] = useFormState<ActionResult | null, FormData>(bound, null);
  return (
    <div className="space-y-3 rounded-md border border-line bg-paper p-4">
      <form action={action} className="space-y-3">
        <ProjectFields project={project} />
        {state && !state.ok && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
        <SaveButton label="Update project" />
      </form>
      <ImageUploadRow project={project} />
    </div>
  );
}

export default function ProjectsManager({ projects }: { projects: Project[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addState, addAction] = useFormState<ActionResult | null, FormData>(addProject, null);

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-line bg-surface p-4">
        <button onClick={() => setShowAdd((v) => !v)} className="flex w-full items-center justify-between text-sm font-medium text-ink">
          Add a project {showAdd ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showAdd && (
          <form action={addAction} className="mt-4 space-y-3">
            <ProjectFields />
            {addState && !addState.ok && <p className="text-sm text-red-600 dark:text-red-400">{addState.error}</p>}
            <SaveButton label="Add project" />
          </form>
        )}
      </div>

      <div className="space-y-3">
        {projects.map((project) =>
          editingId === project.id ? (
            <div key={project.id}>
              <EditPanel project={project} />
              <button onClick={() => setEditingId(null)} className="mt-1 text-xs text-muted underline">Close</button>
            </div>
          ) : (
            <div key={project.id} className="flex items-center justify-between rounded-md border border-line px-4 py-3">
              <div>
                <p className="text-sm font-medium text-ink">{project.name}</p>
                <p className="font-mono text-xs text-muted">
                  {project.category} · {project.status} · {project.published ? "Published" : "Hidden"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setEditingId(project.id)} aria-label="Edit" className="rounded p-1.5 text-muted hover:text-ink">
                  <Pencil size={14} />
                </button>
                <form action={deleteProject.bind(null, project.id)}>
                  <button aria-label="Delete" className="rounded p-1.5 text-muted hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </form>
              </div>
            </div>
          )
        )}
        {projects.length === 0 && <p className="text-sm text-muted">No projects yet.</p>}
      </div>
    </div>
  );
}
