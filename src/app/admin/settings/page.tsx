import { requireAdminSession } from "@/lib/auth";
import { getSettings } from "@/lib/queries";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  await requireAdminSession();
  const settings = await getSettings();
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Website Settings</h1>
      <p className="mt-1 text-sm text-muted">SEO title and description used across the site.</p>
      <div className="mt-8 max-w-lg">
        <SettingsForm settings={settings} showChatbotFields={false} />
      </div>
    </div>
  );
}
