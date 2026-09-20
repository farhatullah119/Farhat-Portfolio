import { requireAdminSession } from "@/lib/auth";
import { getProfile } from "@/lib/queries";
import ProfileForm from "@/components/admin/ProfileForm";

export default async function AdminProfilePage() {
  await requireAdminSession();
  const profile = await getProfile();

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Profile &amp; About</h1>
      <p className="mt-1 text-sm text-muted">This powers the hero, about section, navbar, and footer.</p>
      <div className="mt-8">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
