import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "fallback-dev-secret-change-me";
}

/** Create an HMAC-signed token: base64(payload).signature */
function sign(payload: string): string {
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

/** Verify and decode token. Returns payload string or null if invalid. */
function verify(token: string): string | null {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const b64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const payload = Buffer.from(b64, "base64url").toString();
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  // Timing-safe comparison
  if (sig.length !== expected.length) return null;
  const match = crypto.timingSafeEqual(
    Buffer.from(sig, "hex"),
    Buffer.from(expected, "hex")
  );
  return match ? payload : null;
}

/**
 * Attempt local credential sign-in.
 * Returns null on success, or an error message string on failure.
 */
export async function signLocalIn(
  email: string,
  password: string
): Promise<string | null> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return "Local admin credentials are not set. Add ADMIN_EMAIL and ADMIN_PASSWORD to .env.local";
  }

  const emailMatch = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
  const passwordMatch = password === adminPassword;

  if (!emailMatch || !passwordMatch) {
    return "Invalid email or password.";
  }

  const payload = JSON.stringify({ email: adminEmail, ts: Date.now() });
  const token = sign(payload);

  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return null; // success
}

/** Clear the local session cookie. */
export async function signLocalOut(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Check if a valid local session cookie exists.
 * Call this from requireAdminSession() when Supabase is not configured.
 */
export function hasLocalSession(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    const payload = verify(token);
    return payload !== null;
  } catch {
    return false;
  }
}

