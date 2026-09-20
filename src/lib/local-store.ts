/**
 * Local JSON-file data store.
 *
 * When Supabase is NOT configured, all admin edits persist to
 *   /farhat-portfolio/local-data.json
 * which is git-ignored. The public site reads from this file before
 * falling back to the static seed data in data.ts.
 *
 * This module is Node.js/server only — never imported by client components.
 */

import fs from "fs";
import path from "path";
import type {
  Profile, SocialLink, Skill, Project, Experience,
  Education, Certification, Achievement, Settings, SiteImage,
} from "./types";
import {
  seedProfile, seedSocialLinks, seedSkills, seedProjects,
  seedExperience, seedEducation, seedCertifications, seedAchievements, seedSettings,
} from "./data";

const STORE_PATH = path.join(process.cwd(), "local-data.json");

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
  read: boolean;
}

export interface LocalStore {
  profile?: Partial<Profile>;
  social_links?: SocialLink[];
  skills?: Skill[];
  projects?: Project[];
  experience?: Experience[];
  education?: Education[];
  certifications?: Certification[];
  achievements?: Achievement[];
  settings?: Partial<Settings>;
  images?: SiteImage[];
  contact_messages?: ContactMessage[];
}

function readStore(): LocalStore {
  try {
    if (!fs.existsSync(STORE_PATH)) return {};
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as LocalStore;
  } catch {
    return {};
  }
}

function writeStore(store: LocalStore): void {
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

// ─── Readers ────────────────────────────────────────────────────────────────

export function localGetProfile(): Profile {
  const store = readStore();
  return store.profile ? { ...seedProfile, ...store.profile } : seedProfile;
}

export function localGetSocialLinks(): SocialLink[] {
  const store = readStore();
  return store.social_links ?? seedSocialLinks;
}

export function localGetSkills(): Skill[] {
  const store = readStore();
  return store.skills ?? seedSkills;
}

export function localGetProjects(publishedOnly = true): Project[] {
  const store = readStore();
  const all = store.projects ?? seedProjects;
  return publishedOnly ? all.filter((p) => p.published) : all;
}

export function localGetExperience(): Experience[] {
  const store = readStore();
  const all = store.experience ?? seedExperience;
  return all.filter((e) => e.published);
}

export function localGetEducation(): Education[] {
  const store = readStore();
  return store.education ?? seedEducation;
}

export function localGetCertifications(): Certification[] {
  const store = readStore();
  return store.certifications ?? seedCertifications;
}

export function localGetAchievements(): Achievement[] {
  const store = readStore();
  const all = store.achievements ?? seedAchievements;
  return all.filter((a) => a.published);
}

export function localGetSettings(): Settings {
  const store = readStore();
  return store.settings ? { ...seedSettings, ...store.settings } : seedSettings;
}

export function localGetImages(): SiteImage[] {
  const store = readStore();
  return store.images ?? [];
}

export function localGetDashboardCounts() {
  return {
    projects: localGetProjects(false).length,
    skills: localGetSkills().length,
    certifications: localGetCertifications().length,
    experience: (readStore().experience ?? seedExperience).length,
    education: localGetEducation().length,
    images: localGetImages().length,
  };
}

// ─── Writers ─────────────────────────────────────────────────────────────────

export function localSaveProfile(data: Partial<Profile>): void {
  const store = readStore();
  store.profile = { ...(store.profile ?? {}), ...data };
  writeStore(store);
}

export function localSaveSocialLink(link: SocialLink): void {
  const store = readStore();
  const links = store.social_links ?? [...seedSocialLinks];
  const idx = links.findIndex((l) => l.id === link.id);
  if (idx >= 0) links[idx] = link; else links.push(link);
  store.social_links = links;
  writeStore(store);
}

export function localInsertSkill(skill: Omit<Skill, "id">): Skill {
  const store = readStore();
  const skills = store.skills ?? [...seedSkills];
  const newSkill: Skill = { id: `ls_${Date.now()}`, ...skill };
  skills.push(newSkill);
  store.skills = skills;
  writeStore(store);
  return newSkill;
}

export function localUpdateSkill(id: string, data: Partial<Skill>): boolean {
  const store = readStore();
  const skills = store.skills ?? [...seedSkills];
  const idx = skills.findIndex((s) => s.id === id);
  if (idx < 0) return false;
  skills[idx] = { ...skills[idx], ...data };
  store.skills = skills;
  writeStore(store);
  return true;
}

export function localDeleteSkill(id: string): boolean {
  const store = readStore();
  const skills = store.skills ?? [...seedSkills];
  const filtered = skills.filter((s) => s.id !== id);
  if (filtered.length === skills.length) return false;
  store.skills = filtered;
  writeStore(store);
  return true;
}

export function localInsertProject(project: Omit<Project, "id">): Project {
  const store = readStore();
  const projects = store.projects ?? [...seedProjects];
  const newProject: Project = { id: `lp_${Date.now()}`, ...project };
  projects.push(newProject);
  store.projects = projects;
  writeStore(store);
  return newProject;
}

export function localUpdateProject(id: string, data: Partial<Project>): boolean {
  const store = readStore();
  const projects = store.projects ?? [...seedProjects];
  const idx = projects.findIndex((p) => p.id === id);
  if (idx < 0) return false;
  projects[idx] = { ...projects[idx], ...data };
  store.projects = projects;
  writeStore(store);
  return true;
}

export function localDeleteProject(id: string): boolean {
  const store = readStore();
  const projects = store.projects ?? [...seedProjects];
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  store.projects = filtered;
  writeStore(store);
  return true;
}

export function localInsertExperience(exp: Omit<Experience, "id">): Experience {
  const store = readStore();
  const list = store.experience ?? [...seedExperience];
  const item: Experience = { id: `le_${Date.now()}`, ...exp };
  list.push(item);
  store.experience = list;
  writeStore(store);
  return item;
}

export function localUpdateExperience(id: string, data: Partial<Experience>): boolean {
  const store = readStore();
  const list = store.experience ?? [...seedExperience];
  const idx = list.findIndex((e) => e.id === id);
  if (idx < 0) return false;
  list[idx] = { ...list[idx], ...data };
  store.experience = list;
  writeStore(store);
  return true;
}

export function localDeleteExperience(id: string): boolean {
  const store = readStore();
  const list = store.experience ?? [...seedExperience];
  const filtered = list.filter((e) => e.id !== id);
  if (filtered.length === list.length) return false;
  store.experience = filtered;
  writeStore(store);
  return true;
}

export function localInsertEducation(edu: Omit<Education, "id">): Education {
  const store = readStore();
  const list = store.education ?? [...seedEducation];
  const item: Education = { id: `led_${Date.now()}`, ...edu };
  list.push(item);
  store.education = list;
  writeStore(store);
  return item;
}

export function localUpdateEducation(id: string, data: Partial<Education>): boolean {
  const store = readStore();
  const list = store.education ?? [...seedEducation];
  const idx = list.findIndex((e) => e.id === id);
  if (idx < 0) return false;
  list[idx] = { ...list[idx], ...data };
  store.education = list;
  writeStore(store);
  return true;
}

export function localDeleteEducation(id: string): boolean {
  const store = readStore();
  const list = store.education ?? [...seedEducation];
  const filtered = list.filter((e) => e.id !== id);
  if (filtered.length === list.length) return false;
  store.education = filtered;
  writeStore(store);
  return true;
}

export function localInsertCertification(cert: Omit<Certification, "id">): Certification {
  const store = readStore();
  const list = store.certifications ?? [...seedCertifications];
  const item: Certification = { id: `lc_${Date.now()}`, ...cert };
  list.push(item);
  store.certifications = list;
  writeStore(store);
  return item;
}

export function localUpdateCertification(id: string, data: Partial<Certification>): boolean {
  const store = readStore();
  const list = store.certifications ?? [...seedCertifications];
  const idx = list.findIndex((c) => c.id === id);
  if (idx < 0) return false;
  list[idx] = { ...list[idx], ...data };
  store.certifications = list;
  writeStore(store);
  return true;
}

export function localDeleteCertification(id: string): boolean {
  const store = readStore();
  const list = store.certifications ?? [...seedCertifications];
  const filtered = list.filter((c) => c.id !== id);
  if (filtered.length === list.length) return false;
  store.certifications = filtered;
  writeStore(store);
  return true;
}

export function localInsertAchievement(ach: Omit<Achievement, "id">): Achievement {
  const store = readStore();
  const list = store.achievements ?? [...seedAchievements];
  const item: Achievement = { id: `la_${Date.now()}`, ...ach };
  list.push(item);
  store.achievements = list;
  writeStore(store);
  return item;
}

export function localUpdateAchievement(id: string, data: Partial<Achievement>): boolean {
  const store = readStore();
  const list = store.achievements ?? [...seedAchievements];
  const idx = list.findIndex((a) => a.id === id);
  if (idx < 0) return false;
  list[idx] = { ...list[idx], ...data };
  store.achievements = list;
  writeStore(store);
  return true;
}

export function localDeleteAchievement(id: string): boolean {
  const store = readStore();
  const list = store.achievements ?? [...seedAchievements];
  const filtered = list.filter((a) => a.id !== id);
  if (filtered.length === list.length) return false;
  store.achievements = filtered;
  writeStore(store);
  return true;
}

export function localSaveSettings(data: Partial<Settings>): void {
  const store = readStore();
  store.settings = { ...(store.settings ?? {}), ...data };
  writeStore(store);
}

export function localInsertImage(image: Omit<SiteImage, "id" | "created_at">): SiteImage {
  const store = readStore();
  const images = store.images ?? [];
  const newImage: SiteImage = {
    id: `li_${Date.now()}`,
    created_at: new Date().toISOString(),
    ...image,
  };
  images.unshift(newImage);
  store.images = images;
  writeStore(store);
  return newImage;
}

export function localDeleteImage(id: string): string | null {
  const store = readStore();
  const images = store.images ?? [];
  const img = images.find((i) => i.id === id);
  if (!img) return null;
  store.images = images.filter((i) => i.id !== id);
  writeStore(store);
  return img.url;
}

export function localInsertContactMessage(msg: Omit<ContactMessage, "id" | "created_at" | "read">): ContactMessage {
  const store = readStore();
  const messages = store.contact_messages ?? [];
  const newMsg: ContactMessage = {
    id: `lm_${Date.now()}`,
    created_at: new Date().toISOString(),
    read: false,
    ...msg,
  };
  messages.unshift(newMsg);
  store.contact_messages = messages;
  writeStore(store);
  return newMsg;
}

export function localGetContactMessages(): ContactMessage[] {
  const store = readStore();
  return store.contact_messages ?? [];
}

export function localDeleteContactMessage(id: string): boolean {
  const store = readStore();
  const messages = store.contact_messages ?? [];
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length === messages.length) return false;
  store.contact_messages = filtered;
  writeStore(store);
  return true;
}
