# Farhat Ullah — Data Science Portfolio

A production-ready Next.js 14 (App Router, TypeScript, Tailwind) personal portfolio
with a private CMS admin dashboard, backed by Supabase (Postgres + Auth + Storage),
plus an optional OpenAI-powered "Ask Farhat AI" chatbot.

The site works out of the box with real seed content even before Supabase is
connected — every section falls back to `src/lib/data.ts` — so you can run it
locally immediately, then wire up Supabase and OpenAI when you're ready to edit
content from `/admin`.

## 1. Install

```bash
npm install
```

## 2. Run locally (no setup required)

```bash
npm run dev
```

Visit `http://localhost:3000`. The public site renders with your real seed
content. `/admin` will prompt you to configure Supabase first (see below) —
there's no CMS to edit without it.

## 3. Set up Supabase (for the admin dashboard + live editing)

1. Create a free project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy your Project URL, `anon` public key,
   and `service_role` secret key.
3. Copy `.env.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```
4. In the Supabase SQL editor, run `supabase/schema.sql` (creates tables, RLS
   policies, and the `portfolio` storage bucket).
5. Optionally run `supabase/seed.sql` to pre-fill your real content (profile,
   skills, projects, experience, education, certifications, achievements) so
   you don't have to retype it in `/admin`.
6. Create your admin login: **Authentication → Users → Add user** (email +
   password). This is the account you'll sign in with at `/admin/login`.
   There's no public sign-up — only accounts you create in Supabase can log in.

## 4. Enable the "Ask Farhat AI" chatbot (optional)

Add to `.env.local`:
```
OPENAI_API_KEY=sk-...
```
The key is only ever read on the server (`src/app/api/chat/route.ts`) — it's
never sent to the browser. Without this key, the chatbot widget still renders
but replies with a clear "not configured yet" message instead of breaking.
The chatbot can be turned off entirely from `/admin/chatbot`.

## 5. Deploy

The easiest path is [Vercel](https://vercel.com):

1. Push this project to a GitHub repo.
2. Import it in Vercel.
3. Add the same environment variables from `.env.local` in Vercel's Project
   Settings → Environment Variables.
4. Deploy.

Any other Node.js host that supports Next.js 14 works too.

## Project structure

```
src/
  app/
    page.tsx              Public homepage (all sections)
    layout.tsx             Fonts, SEO metadata, structured data
    sitemap.ts / robots.ts
    api/chat/route.ts      OpenAI chatbot endpoint
    admin/                 Private CMS (auth-gated)
  components/               Public site sections
  components/admin/         Admin CRUD forms/managers
  lib/
    actions/                Server Actions (all writes go through these)
    supabase/                Browser / server / service-role clients
    queries.ts               Reads — Supabase first, seed-data fallback
    data.ts                   Real seed content (also mirrored in supabase/seed.sql)
    types.ts
supabase/
  schema.sql                 Tables, RLS policies, storage bucket
  seed.sql                   Optional real-content seed
```

## How editing works

Every writable section (profile, skills, projects, experience, education,
certifications, achievements, images, resume, social links, settings,
chatbot) has a page under `/admin`. Changes go through Next.js Server
Actions straight to Supabase, then `revalidatePath` refreshes the public
page — no separate "publish" step needed. Storage uploads (profile photo,
project images, certificates, resume) go to the `portfolio` Supabase Storage
bucket and are restricted to image/PDF types under 8MB.

## Notes on accuracy

Per the original brief, this site intentionally avoids fabricated content:
no fake stats, testimonials, GitHub star counts, or skill percentages. The
GitHub section pulls **live** repository data from the public GitHub API
(no key needed) and simply doesn't render stats if the repo isn't public
yet. Projects are labeled with an honest status (`Live`, `In Progress`,
`Prototype / Concept`, `Coming Soon`) rather than presented as more
finished than they are.
