import { requireAdminSession } from "@/lib/auth";
import { getSocialLinks } from "@/lib/queries";
import SocialLinksManager from "@/components/admin/SocialLinksManager";

export default async function AdminSocialPage() {
  await requireAdminSession();
  const links = await getSocialLinks();
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Social Links</h1>
      <p className="mt-1 text-sm text-muted">GitHub, LinkedIn, and any other profiles you want linked in the footer.</p>
      <div className="mt-8">
        <SocialLinksManager links={links} />
      </div>
    </div>
  );
}
