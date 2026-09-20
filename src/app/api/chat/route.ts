import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  getProfile, getSkills, getProjects, getExperience,
  getEducation, getCertifications, getAchievements, getSettings,
} from "@/lib/queries";

export const runtime = "nodejs";

// --- Very small in-memory rate limiter (per server instance) ---
// Good enough to blunt casual spam/abuse; for real production traffic,
// swap this for Upstash/Vercel KV-backed rate limiting.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}

const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY = 12;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { reply: "You're sending messages a little fast — please wait a moment and try again." },
      { status: 429 }
    );
  }

  const settings = await getSettings();
  if (!settings.chatbot_enabled) {
    return NextResponse.json({ reply: "The AI assistant is currently turned off." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply: "The AI assistant isn't configured yet — add OPENAI_API_KEY to the server environment to enable it.",
    });
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: "Invalid request." }, { status: 400 });
  }

  const incoming = (body.messages ?? []).slice(-MAX_HISTORY);
  if (incoming.some((m) => m.content.length > MAX_MESSAGE_LENGTH)) {
    return NextResponse.json({ reply: "That message is too long — could you shorten it?" }, { status: 400 });
  }

  const [profile, skills, projects, experience, education, certifications, achievements] = await Promise.all([
    getProfile(), getSkills(), getProjects(), getExperience(), getEducation(), getCertifications(), getAchievements(),
  ]);

  const context = `
PROFILE
Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.location}
Email: ${profile.email}
GitHub: https://github.com/${profile.github}
About: ${profile.about_paragraphs.join(" ")}

SKILLS
${skills.map((s) => `- ${s.name} (${s.category}, ${s.proficiency.replace("_", " ")})`).join("\n")}

PROJECTS
${projects.map((p) => `- ${p.name} [${p.category}, status: ${p.status}]: ${p.description}`).join("\n")}

EXPERIENCE
${experience.map((e) => `- ${e.position} at ${e.organization}: ${e.description}`).join("\n")}

EDUCATION
${education.map((e) => `- ${e.institution}: ${e.program}`).join("\n")}

CERTIFICATIONS
${certifications.map((c) => `- ${c.name} (${c.issuer})`).join("\n")}

ACHIEVEMENTS
${achievements.map((a) => `- ${a.title}: ${a.description}`).join("\n")}
`.trim();

  const client = new OpenAI({ apiKey });

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 400,
      temperature: 0.4,
      messages: [
        { role: "system", content: `${settings.chatbot_system_prompt}\n\nPORTFOLIO CONTEXT:\n${context}` },
        ...incoming.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim() || "I don't have that information in Farhat's portfolio yet.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    return NextResponse.json({ reply: "The assistant is temporarily unavailable — please try again shortly." }, { status: 500 });
  }
}
