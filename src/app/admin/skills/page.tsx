import { requireAdminSession } from "@/lib/auth";
import { getSkills } from "@/lib/queries";
import SkillsManager from "@/components/admin/SkillsManager";

export default async function AdminSkillsPage() {
  await requireAdminSession();
  const skills = await getSkills();
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Skills</h1>
      <p className="mt-1 text-sm text-muted">Organized by category, with an honest proficiency label instead of a percentage.</p>
      <div className="mt-8">
        <SkillsManager skills={skills} />
      </div>
    </div>
  );
}
