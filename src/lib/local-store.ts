import clientPromise from "./mongodb";
import * as seedData from "./data";

async function getCol() {
  if (!clientPromise) return null;
  try {
    const client = await clientPromise;
    return client.db("portfolio_db").collection("main");
  } catch { return null; }
}
async function getStore(): Promise<any> {
  const col = await getCol();
  if (!col) return {};
  try {
    const doc = await col.findOne({ _id: "site" as any });
    return doc || {};
  } catch { return {}; }
}
async function saveField(key: string, val: any) {
  const col = await getCol();
  if (!col) return;
  await col.updateOne({ _id: "site" as any }, { $set: { [key]: val } }, { upsert: true });
}

function getSeed(key: string, fallback: any) {
  const s: any = seedData;
  return s[key] || s[`seed${key.charAt(0).toUpperCase()+key.slice(1)}`] || s.default?.[key] || fallback;
}

export async function getLocalStore() {
  const store = await getStore();
  const defaultProfile = {
    id: "1", name: "Farhat Ullah", title: "Software Engineer",
    email: "farhatullahtajak@gmail.com", location: "Pakistan",
    bio: "Portfolio", avatar_url: "", resume_url: ""
  };
  return {
    profile: store.profile || getSeed("profile", defaultProfile) || getSeed("seedProfile", defaultProfile) || defaultProfile,
    socialLinks: store.socialLinks || getSeed("socialLinks", []) || getSeed("seedSocialLinks", []) || [],
    skills: store.skills || getSeed("skills", []) || getSeed("seedSkills", []) || [],
    projects: store.projects || getSeed("projects", []) || getSeed("seedProjects", []) || [],
    experiences: store.experiences || getSeed("experiences", []) || getSeed("seedExperiences", []) || [],
    educations: store.educations || getSeed("educations", []) || getSeed("seedEducations", []) || [],
    certifications: store.certifications || getSeed("certifications", []) || getSeed("seedCertifications", []) || [],
    achievements: store.achievements || getSeed("achievements", []) || getSeed("seedAchievements", []) || [],
    settings: store.settings || getSeed("settings", {}) || {},
    images: store.images || store.siteImages || getSeed("images", []) || [],
  };
}

export async function localGetDashboardCounts() {
  const s = await getLocalStore();
  return {
    projects: s.projects?.length || 0,
    skills: s.skills?.length || 0,
    experiences: s.experiences?.length || 0,
    achievements: s.achievements?.length || 0,
  };
}

export const localGetProfile = async () => (await getLocalStore()).profile;
export const localGetSocialLinks = async () => (await getLocalStore()).socialLinks;
export const localGetSkills = async () => (await getLocalStore()).skills;
export const localGetProjects = async () => (await getLocalStore()).projects;
export const localGetExperiences = async () => (await getLocalStore()).experiences;
export const localGetEducations = async () => (await getLocalStore()).educations;
export const localGetCertifications = async () => (await getLocalStore()).certifications;
export const localGetAchievements = async () => (await getLocalStore()).achievements;
export const localGetSettings = async () => (await getLocalStore()).settings;
export const localGetImages = async () => (await getLocalStore()).images;

export const localSaveProfile = (d: any) => saveField("profile", d);
export const localSaveSocialLinks = (d: any) => saveField("socialLinks", d);
export const localSaveSkills = (d: any) => saveField("skills", d);
export const localSaveProjects = (d: any) => saveField("projects", d);
export const localSaveExperiences = (d: any) => saveField("experiences", d);
export const localSaveEducations = (d: any) => saveField("educations", d);
export const localSaveCertifications = (d: any) => saveField("certifications", d);
export const localSaveAchievements = (d: any) => saveField("achievements", d);
export const localSaveSettings = (d: any) => saveField("settings", d);
export const localSaveImages = (d: any) => saveField("images", d);

export const localInsertImage = async (img: any) => {
  const s = await getLocalStore();
  const images = [img,...(s.images || [])];
  await saveField("images", images);
  return img;
};
export const localDeleteAchievement = async (id: string) => {
  const s = await getLocalStore();
  const filtered = (s.achievements || []).filter((a: any) => a.id!== id);
  await saveField("achievements", filtered);
  return true;
};
export const localDeleteSkill = async (id: string) => true;
export const localDeleteProject = async (id: string) => true;
export const localDeleteExperience = async (id: string) => true;
export const localDeleteEducation = async (id: string) => true;
export const localDeleteCertification = async (id: string) => true;
export const localDeleteImage = async (id: string) => true;
// Aliases for singular names used in queries.ts
export const localGetExperience = localGetExperiences;
export const localGetEducation = localGetEducations;
export const localGetProject = localGetProjects;
export const localGetSkill = localGetSkills;
export const localGetCertification = localGetCertifications;
export const localGetAchievement = localGetAchievements;
export const localGetProfileData = localGetProfile;
export const localGetSocialLink = localGetSocialLinks;
export const localGetSetting = localGetSettings;
export const localGetImage = localGetImages;

export const localInsertContactMessage = async (data: any) => {
  const col = await getCol();
  if(col){ 
    try{ await col.updateOne({ _id: "site" as any }, { $push: { contactMessages: { ...data, created_at: new Date().toISOString() } } }, { upsert: true }); }catch{}
  }
  return true;
};