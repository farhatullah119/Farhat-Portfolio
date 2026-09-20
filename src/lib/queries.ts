import { createClient } from "./supabase/server";
import type {
  Profile, SocialLink, Skill, Project, Experience, Education, Certification, Achievement, Settings, SiteImage,
} from "./types";
import {
  localGetProfile, localGetSocialLinks, localGetSkills, localGetProjects,
  localGetExperience, localGetEducation, localGetCertifications, localGetAchievements,
  localGetSettings, localGetImages, localGetDashboardCounts,
} from "./local-store";

/**
 * Every getX() below tries Supabase first and falls back to:
 *   1. Local JSON store (local-data.json) — populated by admin edits
 *   2. Static seed content (data.ts) — original fallback
 *
 * This lets the admin panel work fully offline without Supabase.
 */

export async function getProfile(): Promise<Profile> {
  const supabase = createClient();
  if (!supabase) return localGetProfile();
  const { data } = await supabase.from("profile").select("*").eq("id", 1).maybeSingle();
  if (!data) return localGetProfile();
  const local = localGetProfile();
  return {
    name: data.name ?? local.name,
    title: data.title ?? local.title,
    email: data.email ?? local.email,
    location: data.location ?? local.location,
    whatsapp: data.whatsapp ?? local.whatsapp,
    github: data.github ?? local.github,
    linkedin: data.linkedin ?? null,
    hero_heading: data.hero_heading ?? local.hero_heading,
    hero_subtext: data.hero_subtext ?? local.hero_subtext,
    about_paragraphs: data.about_paragraphs ?? local.about_paragraphs,
    profile_image_url: data.profile_image_url ?? null,
    resume_url: data.resume_url ?? null,
  };
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const supabase = createClient();
  if (!supabase) return localGetSocialLinks();
  const { data } = await supabase.from("social_links").select("*").order("platform");
  return data && data.length ? (data as SocialLink[]) : localGetSocialLinks();
}

export async function getSkills(): Promise<Skill[]> {
  const supabase = createClient();
  if (!supabase) return localGetSkills();
  const { data } = await supabase.from("skills").select("*").order("order_index");
  return data && data.length ? (data as Skill[]) : localGetSkills();
}

export async function getProjects(opts?: { publishedOnly?: boolean }): Promise<Project[]> {
  const publishedOnly = opts?.publishedOnly !== false;
  const supabase = createClient();
  if (!supabase) return localGetProjects(publishedOnly);
  let query = supabase.from("projects").select("*").order("order_index");
  if (publishedOnly) query = query.eq("published", true);
  const { data } = await query;
  if (data && data.length) return data as Project[];
  return localGetProjects(publishedOnly);
}

export async function getExperience(): Promise<Experience[]> {
  const supabase = createClient();
  if (!supabase) return localGetExperience();
  const { data } = await supabase.from("experience").select("*").eq("published", true).order("order_index");
  return data && data.length ? (data as Experience[]) : localGetExperience();
}

export async function getEducation(): Promise<Education[]> {
  const supabase = createClient();
  if (!supabase) return localGetEducation();
  const { data } = await supabase.from("education").select("*").order("order_index");
  return data && data.length ? (data as Education[]) : localGetEducation();
}

export async function getCertifications(): Promise<Certification[]> {
  const supabase = createClient();
  if (!supabase) return localGetCertifications();
  const { data } = await supabase.from("certifications").select("*").order("order_index");
  return data && data.length ? (data as Certification[]) : localGetCertifications();
}

export async function getAchievements(): Promise<Achievement[]> {
  const supabase = createClient();
  if (!supabase) return localGetAchievements();
  const { data } = await supabase.from("achievements").select("*").eq("published", true).order("order_index");
  return data && data.length ? (data as Achievement[]) : localGetAchievements();
}

export async function getSettings(): Promise<Settings> {
  const supabase = createClient();
  if (!supabase) return localGetSettings();
  const { data } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();
  if (!data) return localGetSettings();
  const local = localGetSettings();
  return {
    site_title: data.site_title ?? local.site_title,
    meta_description: data.meta_description ?? local.meta_description,
    chatbot_enabled: data.chatbot_enabled ?? true,
    chatbot_system_prompt: data.chatbot_system_prompt ?? local.chatbot_system_prompt,
  };
}

export async function getImages(): Promise<SiteImage[]> {
  const supabase = createClient();
  if (!supabase) return localGetImages();
  const { data } = await supabase.from("images").select("*").order("created_at", { ascending: false });
  return (data as SiteImage[]) ?? localGetImages();
}

export async function getDashboardCounts() {
  const supabase = createClient();
  if (!supabase) return localGetDashboardCounts();
  const [projects, skills, certifications, experience, education, images] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("skills").select("id", { count: "exact", head: true }),
    supabase.from("certifications").select("id", { count: "exact", head: true }),
    supabase.from("experience").select("id", { count: "exact", head: true }),
    supabase.from("education").select("id", { count: "exact", head: true }),
    supabase.from("images").select("id", { count: "exact", head: true }),
  ]);
  return {
    projects: projects.count ?? 0, skills: skills.count ?? 0,
    certifications: certifications.count ?? 0, experience: experience.count ?? 0,
    education: education.count ?? 0, images: images.count ?? 0,
  };
}
