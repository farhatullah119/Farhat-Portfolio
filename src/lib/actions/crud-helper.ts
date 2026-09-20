import { createClient } from "@/lib/supabase/server";
import {
  localInsertSkill, localUpdateSkill, localDeleteSkill,
  localInsertProject, localUpdateProject, localDeleteProject,
  localInsertExperience, localUpdateExperience, localDeleteExperience,
  localInsertEducation, localUpdateEducation, localDeleteEducation,
  localInsertCertification, localUpdateCertification, localDeleteCertification,
  localInsertAchievement, localUpdateAchievement, localDeleteAchievement,
  localSaveProfile, localSaveSettings,
} from "@/lib/local-store";

export type ActionResult = { ok: true } | { ok: false; error: string };

/** Maps table name to local store insert/update/delete functions */
const LOCAL_HANDLERS: Record<string, {
  insert?: (data: Record<string, unknown>) => unknown;
  update?: (id: string, data: Record<string, unknown>) => boolean;
  delete?: (id: string) => boolean;
  upsert?: (data: Record<string, unknown>) => void;
}> = {
  skills: {
    insert: (d) => localInsertSkill(d as Parameters<typeof localInsertSkill>[0]),
    update: (id, d) => localUpdateSkill(id, d as Parameters<typeof localUpdateSkill>[1]),
    delete: (id) => localDeleteSkill(id),
  },
  projects: {
    insert: (d) => localInsertProject(d as Parameters<typeof localInsertProject>[0]),
    update: (id, d) => localUpdateProject(id, d as Parameters<typeof localUpdateProject>[1]),
    delete: (id) => localDeleteProject(id),
  },
  experience: {
    insert: (d) => localInsertExperience(d as Parameters<typeof localInsertExperience>[0]),
    update: (id, d) => localUpdateExperience(id, d as Parameters<typeof localUpdateExperience>[1]),
    delete: (id) => localDeleteExperience(id),
  },
  education: {
    insert: (d) => localInsertEducation(d as Parameters<typeof localInsertEducation>[0]),
    update: (id, d) => localUpdateEducation(id, d as Parameters<typeof localUpdateEducation>[1]),
    delete: (id) => localDeleteEducation(id),
  },
  certifications: {
    insert: (d) => localInsertCertification(d as Parameters<typeof localInsertCertification>[0]),
    update: (id, d) => localUpdateCertification(id, d as Parameters<typeof localUpdateCertification>[1]),
    delete: (id) => localDeleteCertification(id),
  },
  achievements: {
    insert: (d) => localInsertAchievement(d as Parameters<typeof localInsertAchievement>[0]),
    update: (id, d) => localUpdateAchievement(id, d as Parameters<typeof localUpdateAchievement>[1]),
    delete: (id) => localDeleteAchievement(id),
  },
  profile: {
    upsert: (d) => localSaveProfile(d as Parameters<typeof localSaveProfile>[0]),
  },
  settings: {
    upsert: (d) => localSaveSettings(d as Parameters<typeof localSaveSettings>[0]),
  },
};

export async function insertRow(table: string, values: Record<string, unknown>): Promise<ActionResult> {
  const supabase = createClient();
  if (supabase) {
    const { error } = await supabase.from(table).insert(values);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }
  // Local fallback
  const handler = LOCAL_HANDLERS[table];
  if (handler?.insert) {
    try { handler.insert(values); return { ok: true }; }
    catch (e) { return { ok: false, error: String(e) }; }
  }
  return { ok: false, error: `No local handler for table "${table}".` };
}

export async function updateRow(table: string, id: string, values: Record<string, unknown>): Promise<ActionResult> {
  const supabase = createClient();
  if (supabase) {
    const { error } = await supabase.from(table).update(values).eq("id", id);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }
  // Local fallback
  const handler = LOCAL_HANDLERS[table];
  if (handler?.update) {
    try { handler.update(id, values); return { ok: true }; }
    catch (e) { return { ok: false, error: String(e) }; }
  }
  return { ok: false, error: `No local handler for table "${table}".` };
}

export async function deleteRow(table: string, id: string): Promise<ActionResult> {
  const supabase = createClient();
  if (supabase) {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }
  // Local fallback
  const handler = LOCAL_HANDLERS[table];
  if (handler?.delete) {
    try { handler.delete(id); return { ok: true }; }
    catch (e) { return { ok: false, error: String(e) }; }
  }
  return { ok: false, error: `No local handler for table "${table}".` };
}

export async function upsertSingleton(table: string, values: Record<string, unknown>): Promise<ActionResult> {
  const supabase = createClient();
  if (supabase) {
    const { error } = await supabase.from(table).upsert({ id: 1, ...values });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }
  // Local fallback
  const handler = LOCAL_HANDLERS[table];
  if (handler?.upsert) {
    try { handler.upsert(values); return { ok: true }; }
    catch (e) { return { ok: false, error: String(e) }; }
  }
  return { ok: false, error: `No local handler for singleton table "${table}".` };
}

/** Parses a comma-separated form field into a trimmed string array. */
export function parseList(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
