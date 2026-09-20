import { requireAdminSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { localGetContactMessages } from "@/lib/local-store";
import { Mail } from "lucide-react";

export default async function AdminContactPage() {
  await requireAdminSession();
  const supabase = createClient();

  let messages: { id: string; name: string; email: string; subject?: string | null; message: string; created_at: string }[] = [];
  if (supabase) {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    messages = data ?? [];
  } else {
    messages = localGetContactMessages();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Contact Messages</h1>
      <p className="mt-1 text-sm text-muted">Messages submitted through the public contact form.</p>

      <div className="mt-8 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="rounded-md border border-line bg-surface p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-ink">{m.name} <span className="font-normal text-muted">· {m.email}</span></p>
              <span className="font-mono text-xs text-muted">{new Date(m.created_at).toLocaleString()}</span>
            </div>
            {m.subject && <p className="mt-1 text-sm text-signal">{m.subject}</p>}
            <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Mail size={15} /> No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
