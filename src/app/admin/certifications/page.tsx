import { requireAdminSession } from "@/lib/auth";
import { getCertifications } from "@/lib/queries";
import CertificationsManager from "@/components/admin/CertificationsManager";

export default async function AdminCertificationsPage() {
  await requireAdminSession();
  const items = await getCertifications();
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Certifications &amp; Training</h1>
      <p className="mt-1 text-sm text-muted">Never invent credential IDs — leave the field blank if you don't have one.</p>
      <div className="mt-8">
        <CertificationsManager items={items} />
      </div>
    </div>
  );
}
