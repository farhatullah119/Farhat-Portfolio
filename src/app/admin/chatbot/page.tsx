import { requireAdminSession } from "@/lib/auth";
import { getSettings } from "@/lib/queries";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminChatbotPage() {
  await requireAdminSession();
  const settings = await getSettings();
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Chatbot</h1>
      <p className="mt-1 text-sm text-muted">
        "Ask Farhat AI" answers using your live portfolio content automatically — it can't invent facts about you.
        Requires OPENAI_API_KEY in your environment.
      </p>
      <div className="mt-8 max-w-lg">
        <SettingsForm settings={settings} showChatbotFields />
      </div>
    </div>
  );
}
