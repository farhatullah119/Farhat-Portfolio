import { requireAdminSession } from "@/lib/auth";
import { getDashboardCounts } from "@/lib/queries";
import { FolderKanban, Sparkles, Award, Briefcase, GraduationCap, Image as ImageIcon } from "lucide-react";

export default async function AdminDashboardPage() {
  await requireAdminSession();
  const counts = await getDashboardCounts();

  const cards = [
    { label: "Projects", value: counts.projects, icon: FolderKanban },
    { label: "Skills", value: counts.skills, icon: Sparkles },
    { label: "Certifications", value: counts.certifications, icon: Award },
    { label: "Experience entries", value: counts.experience, icon: Briefcase },
    { label: "Education entries", value: counts.education, icon: GraduationCap },
    { label: "Uploaded images", value: counts.images, icon: ImageIcon },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">A snapshot of what's currently on your portfolio.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border border-line bg-surface p-5">
            <c.icon size={18} className="text-signal" />
            <p className="mt-3 font-display text-3xl text-ink">{c.value}</p>
            <p className="mt-1 text-sm text-muted">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
