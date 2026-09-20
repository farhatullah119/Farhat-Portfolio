import { requireAdminSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { seedExperience } from "@/lib/data";
import ExperienceManager from "@/components/admin/ExperienceManager";

export default async function AdminExperiencePage() {
  await requireAdminSession();
  const supabase = createClient();
  const { data } = supabase ? await supabase.from("experience").select("*").order("order_index") : { data: null };
  const items = data && data.length ? data : seedExperience;

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Experience</h1>
      <p className="mt-1 text-sm text-muted">Only include verified experience — no invented employers or dates.</p>
      <div className="mt-8">
        <ExperienceManager items={items} />
      </div>
    </div>
  );
}
