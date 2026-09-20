export type Proficiency = "learning" | "familiar" | "project_experience";

export interface Profile {
  name: string;
  title: string;
  email: string;
  location: string;
  whatsapp: string;
  github: string;
  linkedin: string | null;
  hero_heading: string;
  hero_subtext: string;
  about_paragraphs: string[];
  profile_image_url: string | null;
  resume_url: string | null;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  visible: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: "Data Science" | "Artificial Intelligence" | "Development" | "Cybersecurity & Networking";
  proficiency: Proficiency;
  order_index: number;
}

export type ProjectStatus = "Live" | "In Progress" | "Prototype / Concept" | "Coming Soon";
export type ProjectCategory = "Data Science" | "AI" | "Web Development" | "Cybersecurity" | "Networking" | "Social Impact";

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  description: string;
  technologies: string[];
  features: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  featured: boolean;
  published: boolean;
  order_index: number;
  overview: string | null;
  problem: string | null;
  solution: string | null;
  challenges: string | null;
  learnings: string | null;
  future_improvements: string | null;
}

export interface Experience {
  id: string;
  organization: string;
  position: string;
  location: string | null;
  category: string;
  start_date: string;
  end_date: string | null;
  description: string;
  published: boolean;
  order_index: number;
}

export interface Education {
  id: string;
  institution: string;
  program: string;
  description: string | null;
  start_year: string | null;
  end_year: string | null;
  logo_url: string | null;
  order_index: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  topics: string[];
  issue_date: string | null;
  certificate_url: string | null;
  credential_url: string | null;
  order_index: number;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string | null;
  published: boolean;
  order_index: number;
}

export interface SiteImage {
  id: string;
  url: string;
  filename: string;
  alt: string | null;
  category: string | null;
  created_at: string;
}

export interface Settings {
  site_title: string;
  meta_description: string;
  chatbot_enabled: boolean;
  chatbot_system_prompt: string;
}
