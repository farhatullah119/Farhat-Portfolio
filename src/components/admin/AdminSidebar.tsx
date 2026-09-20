"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/actions/auth";
import {
  LayoutDashboard, User, Sparkles, FolderKanban, Briefcase, GraduationCap,
  Award, Trophy, FileText, Image as ImageIcon, Mail, Bot, Share2, Settings, LogOut,
} from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile & About", icon: User },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy },
  { href: "/admin/resume", label: "Resume", icon: FileText },
  { href: "/admin/images", label: "Images", icon: ImageIcon },
  { href: "/admin/contact", label: "Contact Messages", icon: Mail },
  { href: "/admin/chatbot", label: "Chatbot", icon: Bot },
  { href: "/admin/social", label: "Social Links", icon: Share2 },
  { href: "/admin/settings", label: "Website Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-line bg-surface">
      <div className="border-b border-line px-5 py-5">
        <p className="font-display text-lg text-ink">Portfolio Admin</p>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                active ? "bg-signal text-signal-ink" : "text-muted hover:bg-paper hover:text-ink"
              }`}
            >
              <Icon size={16} /> {item.label}
            </Link>
          );
        })}
      </nav>
      <form action={signOut} className="border-t border-line p-3">
        <button type="submit" className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted hover:bg-paper hover:text-ink">
          <LogOut size={16} /> Sign out
        </button>
      </form>
    </aside>
  );
}
