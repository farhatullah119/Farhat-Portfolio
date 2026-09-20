"use client";

import { useFormState, useFormStatus } from "react-dom";
import { saveSettings } from "@/lib/actions/settings";
import type { Settings } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/crud-helper";

function SaveButton() {
  const { pending } = useFormStatus();
  return <button className="btn-signal" disabled={pending}>{pending ? "Saving…" : "Save changes"}</button>;
}

export default function SettingsForm({ settings, showChatbotFields = true }: { settings: Settings; showChatbotFields?: boolean }) {
  const [state, action] = useFormState<ActionResult | null, FormData>(saveSettings, null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="site_title" className="mb-1.5 block text-sm text-ink">Website title</label>
        <input id="site_title" name="site_title" defaultValue={settings.site_title} className="field" />
      </div>
      <div>
        <label htmlFor="meta_description" className="mb-1.5 block text-sm text-ink">Meta description</label>
        <textarea id="meta_description" name="meta_description" defaultValue={settings.meta_description} rows={3} className="field resize-none" />
      </div>

      {showChatbotFields && (
        <>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="chatbot_enabled" defaultChecked={settings.chatbot_enabled} /> Enable "Ask Farhat AI" chatbot
          </label>
          <div>
            <label htmlFor="chatbot_system_prompt" className="mb-1.5 block text-sm text-ink">Chatbot instructions</label>
            <textarea id="chatbot_system_prompt" name="chatbot_system_prompt" defaultValue={settings.chatbot_system_prompt} rows={4} className="field resize-none" />
          </div>
        </>
      )}

      {!showChatbotFields && (
        <>
          <input type="hidden" name="chatbot_enabled" value={settings.chatbot_enabled ? "on" : ""} />
          <input type="hidden" name="chatbot_system_prompt" value={settings.chatbot_system_prompt} />
        </>
      )}

      {state && !state.ok && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      <SaveButton />
    </form>
  );
}
