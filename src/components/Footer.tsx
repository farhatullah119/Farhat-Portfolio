import { Github, Linkedin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import type { Profile, SocialLink } from "@/lib/types";

const ICONS: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Facebook: Facebook,
  Instagram: Instagram,
  YouTube: Youtube,
  X: Twitter,
};

export default function Footer({ profile, socialLinks }: { profile: Profile; socialLinks: SocialLink[] }) {
  const visible = socialLinks.filter((s) => s.visible && s.url);

  return (
    <footer className="rule">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-lg text-ink">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.title}</p>
          <p className="mt-1 text-sm text-muted">📍 {profile.location}</p>
        </div>

        <div className="flex items-center gap-4">
          {visible.map((link) => {
            const Icon = ICONS[link.platform] ?? Github;
            return (
              <a key={link.id} href={link.url} target="_blank" rel="noreferrer" aria-label={link.platform} className="text-muted hover:text-ink">
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>
      <div className="container-page flex items-center justify-between border-t border-line py-5 text-xs text-muted">
        <span>© {new Date().getFullYear()} {profile.name}. Built with Next.js.</span>
        <a href="/admin/login" className="transition-colors hover:text-ink hover:underline">
          Admin Login
        </a>
      </div>
    </footer>
  );
}
