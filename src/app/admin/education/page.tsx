import { requireAdminSession } from "@/lib/auth";
import { getEducation } from "@/lib/queries";
import EducationManager from "@/components/admin/EducationManager";

export default async function AdminEducationPage() {
  await requireAdminSession();
  const items = await getEducation();
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Education</h1>
      <p className="mt-1 text-sm text-muted">Public-facing only — GPA, credits, and grades are intentionally left off the site.</p>
      <div className="mt-8">
        <EducationManager items={items} />
      </div>
    </div>
  );
}
