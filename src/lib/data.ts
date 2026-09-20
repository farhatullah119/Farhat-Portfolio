import type {
  Profile, Skill, Project, Experience, Education, Certification, Achievement, Settings, SocialLink,
} from "./types";

/**
 * Fallback / seed content. This is what the public site renders when Supabase
 * is not yet configured (fresh checkout), and it's also what supabase/seed.sql
 * inserts into the database on first setup. Every admin-editable field here can
 * be changed later from /admin — nothing below is hard-coded into the UI.
 */

export const seedProfile: Profile = {
  name: "Farhat Ullah",
  title: "Data Science Student | AI Developer | Technology Enthusiast",
  email: "farhatullahtajak@gmail.com",
  location: "Peshawar, KP, Pakistan",
  whatsapp: "923437741941",
  github: "farhatullah119",
  linkedin: null,
  hero_heading: "Hi, I'm Farhat Ullah.",
  hero_subtext:
    "I am a Data Science student and technology enthusiast interested in artificial intelligence, data analysis, software development, cybersecurity, networking, and building practical digital solutions for real-world problems.",
  about_paragraphs: [
    "I am a Data Science student and technology enthusiast with a growing interest in Artificial Intelligence, data analysis, software development, cybersecurity, and networking.",
    "I enjoy learning by building practical projects and exploring how data and intelligent technologies can be used to solve real-world problems.",
    "My goal is to continuously strengthen my technical skills and create useful, accessible, and meaningful technology solutions.",
  ],
  profile_image_url: null,
  resume_url: null,
};

export const seedSocialLinks: SocialLink[] = [
  { id: "github", platform: "GitHub", url: "https://github.com/farhatullah119", visible: true },
  { id: "linkedin", platform: "LinkedIn", url: "", visible: false },
  { id: "facebook", platform: "Facebook", url: "", visible: false },
  { id: "instagram", platform: "Instagram", url: "", visible: false },
  { id: "x", platform: "X", url: "", visible: false },
  { id: "youtube", platform: "YouTube", url: "", visible: false },
];

export const seedSkills: Skill[] = [
  { id: "s1", name: "Python", category: "Data Science", proficiency: "project_experience", order_index: 1 },
  { id: "s2", name: "Data Analysis", category: "Data Science", proficiency: "project_experience", order_index: 2 },
  { id: "s3", name: "Data Cleaning", category: "Data Science", proficiency: "project_experience", order_index: 3 },
  { id: "s4", name: "Exploratory Data Analysis", category: "Data Science", proficiency: "familiar", order_index: 4 },
  { id: "s5", name: "Statistics", category: "Data Science", proficiency: "familiar", order_index: 5 },
  { id: "s6", name: "Data Visualization", category: "Data Science", proficiency: "familiar", order_index: 6 },
  { id: "s7", name: "Machine Learning", category: "Data Science", proficiency: "learning", order_index: 7 },
  { id: "s8", name: "Artificial Intelligence", category: "Artificial Intelligence", proficiency: "project_experience", order_index: 8 },
  { id: "s9", name: "Generative AI", category: "Artificial Intelligence", proficiency: "project_experience", order_index: 9 },
  { id: "s10", name: "Prompt Engineering", category: "Artificial Intelligence", proficiency: "project_experience", order_index: 10 },
  { id: "s11", name: "AI Tools", category: "Artificial Intelligence", proficiency: "familiar", order_index: 11 },
  { id: "s12", name: "Agentic AI", category: "Artificial Intelligence", proficiency: "learning", order_index: 12 },
  { id: "s13", name: "HTML", category: "Development", proficiency: "project_experience", order_index: 13 },
  { id: "s14", name: "CSS", category: "Development", proficiency: "project_experience", order_index: 14 },
  { id: "s15", name: "JavaScript", category: "Development", proficiency: "familiar", order_index: 15 },
  { id: "s16", name: "React", category: "Development", proficiency: "familiar", order_index: 16 },
  { id: "s17", name: "TypeScript", category: "Development", proficiency: "learning", order_index: 17 },
  { id: "s18", name: "Git", category: "Development", proficiency: "project_experience", order_index: 18 },
  { id: "s19", name: "GitHub", category: "Development", proficiency: "project_experience", order_index: 19 },
  { id: "s20", name: "Cybersecurity Fundamentals", category: "Cybersecurity & Networking", proficiency: "familiar", order_index: 20 },
  { id: "s21", name: "Networking Fundamentals", category: "Cybersecurity & Networking", proficiency: "familiar", order_index: 21 },
  { id: "s22", name: "Web Security Fundamentals", category: "Cybersecurity & Networking", proficiency: "learning", order_index: 22 },
];

export const seedProjects: Project[] = [
  {
    id: "p1", slug: "hope-reach-ai", name: "HopeReach AI", category: "AI",
    status: "In Progress",
    description: "An AI-focused project exploring how intelligent digital tools can help users access useful information and support.",
    technologies: ["Python", "AI"], features: [],
    github_url: "https://github.com/farhatullah119/hope-reach-ai", live_url: null,
    image_url: null, featured: true, published: true, order_index: 1,
    overview: "An AI-focused project exploring how intelligent digital tools can help users access useful information and support.",
    problem: null, solution: null, challenges: null, learnings: null, future_improvements: null,
  },
  {
    id: "p2", slug: "isf-health-hub", name: "ISF Health Hub", category: "Social Impact",
    status: "Prototype / Concept",
    description: "A digital platform concept focused on improving access to health information, educational resources, and clinic-related services for underserved communities.",
    technologies: [], features: [],
    github_url: null, live_url: null, image_url: null, featured: true, published: true, order_index: 2,
    overview: "A digital platform concept focused on improving access to health information, educational resources, and clinic-related services for underserved communities. This is a concept-stage project — not a production healthcare system.",
    problem: null, solution: null, challenges: null, learnings: null, future_improvements: null,
  },
  {
    id: "p3", slug: "ai-skillbridge", name: "AI SkillBridge", category: "AI",
    status: "In Progress",
    description: "An AI-focused learning and productivity project exploring AI foundations, generative AI, agentic AI, modern AI tools, and AI-assisted workflows.",
    technologies: [], features: ["AI Foundations", "Generative AI", "Agentic AI", "AI Tools & Productivity", "Freelancing with AI"],
    github_url: null, live_url: null, image_url: null, featured: true, published: true, order_index: 3,
    overview: "An AI-focused learning and productivity project exploring AI foundations, generative AI, agentic AI, modern AI tools, and AI-assisted workflows.",
    problem: null, solution: null, challenges: null, learnings: null, future_improvements: null,
  },
  {
    id: "p4", slug: "securenet", name: "SecureNet", category: "Cybersecurity",
    status: "Coming Soon",
    description: "A proposed network security monitoring concept designed to help users understand network activity and improve basic cybersecurity awareness.",
    technologies: [], features: [],
    github_url: null, live_url: null, image_url: null, featured: false, published: true, order_index: 4,
    overview: "A proposed network security monitoring concept — future project, not yet built.",
    problem: null, solution: null, challenges: null, learnings: null, future_improvements: null,
  },
];

export const seedExperience: Experience[] = [
  {
    id: "e1", organization: "Commissionerate for Afghan Refugees (CAR), KP", position: "Community Outreach",
    location: "Peshawar, KP, Pakistan", category: "Community Outreach",
    start_date: "", end_date: null,
    description: "Community outreach, information dissemination, referrals, community engagement, and supporting access to services.",
    published: true, order_index: 1,
  },
  {
    id: "e2", organization: "Teaching / Education Experience", position: "Student Support & Mentoring",
    location: null, category: "Teaching",
    start_date: "", end_date: null,
    description: "Student support, classroom communication, education, mentoring, and community learning.",
    published: true, order_index: 2,
  },
  {
    id: "e3", organization: "Pakistan Polio Eradication Program", position: "Volunteer",
    location: null, category: "Volunteer",
    start_date: "", end_date: null,
    description: "Community outreach and volunteer activities supporting the Polio Eradication Program, plus youth and environmental volunteer initiatives.",
    published: true, order_index: 3,
  },
];

export const seedEducation: Education[] = [
  { id: "ed1", institution: "University of Malakand", program: "Data Science", description: null, start_year: null, end_year: null, logo_url: null, order_index: 1 },
  { id: "ed2", institution: "University of the People", program: "Study Program", description: null, start_year: null, end_year: null, logo_url: null, order_index: 2 },
];

export const seedCertifications: Certification[] = [
  {
    id: "c1", name: "ACT AI National AI Training Programme", issuer: "University of Malakand",
    topics: ["AI Foundations", "Generative AI", "Agentic AI", "AI Tools & Productivity", "Freelancing with AI"],
    issue_date: "2026-07-29", certificate_url: null, credential_url: null, order_index: 1,
  },
  { id: "c2", name: "Aspire Leaders Program", issuer: "Aspire Leaders Program", topics: [], issue_date: null, certificate_url: null, credential_url: null, order_index: 2 },
  { id: "c3", name: "UNICEF Youth Foresight Circle", issuer: "UNICEF", topics: [], issue_date: null, certificate_url: null, credential_url: null, order_index: 3 },
  { id: "c4", name: "Pakistan Polio Eradication Program", issuer: "Pakistan Polio Eradication Program", topics: [], issue_date: null, certificate_url: null, credential_url: null, order_index: 4 },
  { id: "c5", name: "Tree Plantation Drive", issuer: "Musharaf Iqbal Foundation", topics: [], issue_date: "2024-09-02", certificate_url: null, credential_url: null, order_index: 5 },
];

export const seedAchievements: Achievement[] = [
  { id: "a1", title: "ACT AI National AI Training Programme completion", category: "AI Training", description: "Completed AI Foundations, Generative AI, Agentic AI, AI Tools & Productivity, and Freelancing with AI.", date: "2026-07-29", published: true, order_index: 1 },
  { id: "a2", title: "Aspire Leaders Program", category: "Professional Development", description: "Participated in the Aspire Leaders Program.", date: null, published: true, order_index: 2 },
  { id: "a3", title: "UNICEF Youth Foresight Circle", category: "Community Service", description: "Participated in the UNICEF Youth Foresight Circle.", date: null, published: true, order_index: 3 },
  { id: "a4", title: "Polio Eradication Program volunteer", category: "Volunteer Work", description: "Volunteered with the Pakistan Polio Eradication Program.", date: null, published: true, order_index: 4 },
  { id: "a5", title: "Tree Plantation Drive", category: "Community Service", description: "Musharaf Iqbal Foundation tree plantation drive.", date: "2024-09-02", published: true, order_index: 5 },
];

export const seedSettings: Settings = {
  site_title: "Farhat Ullah | Data Science Student & AI Developer",
  meta_description:
    "Farhat Ullah is a Data Science student and AI developer interested in data science, artificial intelligence, software development, cybersecurity, networking, and practical technology solutions.",
  chatbot_enabled: true,
  chatbot_system_prompt:
    "You are Farhat's AI portfolio assistant. Answer only using the portfolio context provided to you. If you don't know something, say: \"I don't have that information in Farhat's portfolio yet.\" Never invent personal information.",
};

export const journeySteps = [
  "Programming", "Data", "Visualization", "Statistics", "Machine Learning", "Artificial Intelligence", "Real-World Solutions",
];

export const roadmapSteps = [
  "Foundation", "Programming", "Data Science", "Artificial Intelligence", "Cybersecurity & Networking", "Real-World Projects", "Future Professional Growth",
];
