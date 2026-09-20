import { requireAdminSession } from "@/lib/auth";
import { getProfile } from "@/lib/queries";
import ResumeManager from "@/components/admin/ResumeManager";

export default async function AdminResumePage() {
  await requireAdminSession();
  const profile = await getProfile();
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Resume</h1>
      <p className="mt-1 text-sm text-muted">PDF only. If none is uploaded, the public site simply won't show a fake resume.</p>
      <div className="mt-8">
        <ResumeManager resumeUrl={profile.resume_url} />
      </div>
    </div>
  );
}
