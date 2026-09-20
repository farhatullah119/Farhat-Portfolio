-- ============================================================================
-- Farhat Ullah Portfolio — Supabase schema
-- Run this once in your Supabase project's SQL editor (or via the CLI).
-- ============================================================================

-- ---------- PROFILE (singleton row, id = 1) ----------
create table if not exists profile (
  id int primary key default 1,
  name text not null default 'Farhat Ullah',
  title text not null default '',
  email text not null default '',
  location text not null default '',
  whatsapp text not null default '',
  github text not null default '',
  linkedin text,
  hero_heading text not null default '',
  hero_subtext text not null default '',
  about_paragraphs text[] not null default '{}',
  profile_image_url text,
  resume_url text,
  updated_at timestamptz not null default now(),
  constraint singleton_profile check (id = 1)
);

-- ---------- SOCIAL LINKS ----------
create table if not exists social_links (
  id text primary key,
  platform text not null,
  url text not null default '',
  visible boolean not null default false
);

-- ---------- SKILLS ----------
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('Data Science','Artificial Intelligence','Development','Cybersecurity & Networking')),
  proficiency text not null check (proficiency in ('learning','familiar','project_experience')),
  order_index int not null default 0
);

-- ---------- PROJECTS ----------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  name text not null,
  category text not null check (category in ('Data Science','AI','Web Development','Cybersecurity','Networking','Social Impact')),
  status text not null check (status in ('Live','In Progress','Prototype / Concept','Coming Soon')),
  description text not null default '',
  technologies text[] not null default '{}',
  features text[] not null default '{}',
  github_url text,
  live_url text,
  image_url text,
  featured boolean not null default false,
  published boolean not null default true,
  order_index int not null default 0,
  overview text,
  problem text,
  solution text,
  challenges text,
  learnings text,
  future_improvements text
);

-- ---------- EXPERIENCE ----------
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  organization text not null,
  position text not null,
  location text,
  category text not null default '',
  start_date text not null default '',
  end_date text,
  description text not null default '',
  published boolean not null default true,
  order_index int not null default 0
);

-- ---------- EDUCATION ----------
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  program text not null,
  description text,
  start_year text,
  end_year text,
  logo_url text,
  order_index int not null default 0
);

-- ---------- CERTIFICATIONS ----------
create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  topics text[] not null default '{}',
  issue_date date,
  certificate_url text,
  credential_url text,
  order_index int not null default 0
);

-- ---------- ACHIEVEMENTS ----------
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default '',
  description text not null default '',
  date date,
  published boolean not null default true,
  order_index int not null default 0
);

-- ---------- IMAGES ----------
create table if not exists images (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  filename text not null default '',
  alt text,
  category text,
  created_at timestamptz not null default now()
);

-- ---------- SETTINGS (singleton row, id = 1) ----------
create table if not exists settings (
  id int primary key default 1,
  site_title text not null default 'Farhat Ullah | Data Science Student & AI Developer',
  meta_description text not null default '',
  chatbot_enabled boolean not null default true,
  chatbot_system_prompt text not null default '',
  constraint singleton_settings check (id = 1)
);

-- ---------- CONTACT MESSAGES ----------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Row Level Security
-- Public (anon) role: read-only on published content, insert-only on contact
-- messages. All writes go through the service-role key from server actions,
-- which bypasses RLS — so admin mutations work regardless of these policies.
-- ============================================================================

alter table profile enable row level security;
alter table social_links enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table experience enable row level security;
alter table education enable row level security;
alter table certifications enable row level security;
alter table achievements enable row level security;
alter table images enable row level security;
alter table settings enable row level security;
alter table contact_messages enable row level security;

create policy "public read profile" on profile for select using (true);
create policy "public read social_links" on social_links for select using (true);
create policy "public read skills" on skills for select using (true);
create policy "public read published projects" on projects for select using (published = true);
create policy "public read published experience" on experience for select using (published = true);
create policy "public read education" on education for select using (true);
create policy "public read certifications" on certifications for select using (true);
create policy "public read published achievements" on achievements for select using (published = true);
create policy "public read settings" on settings for select using (true);

create policy "public insert contact_messages" on contact_messages for insert with check (true);

-- Authenticated admin users get full read access to everything (including
-- unpublished rows) directly from the browser/server session, in addition to
-- the service-role bypass used by the mutating server actions.
create policy "admin full access profile" on profile for select using (auth.role() = 'authenticated');
create policy "admin full access projects" on projects for select using (auth.role() = 'authenticated');
create policy "admin full access experience" on experience for select using (auth.role() = 'authenticated');
create policy "admin full access achievements" on achievements for select using (auth.role() = 'authenticated');
create policy "admin read images" on images for select using (auth.role() = 'authenticated');
create policy "admin read contact_messages" on contact_messages for select using (auth.role() = 'authenticated');

-- ============================================================================
-- Storage bucket for uploaded images, resumes, and certificates
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "public read portfolio bucket" on storage.objects
  for select using (bucket_id = 'portfolio');
