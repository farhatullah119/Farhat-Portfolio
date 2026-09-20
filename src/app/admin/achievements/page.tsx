import { requireAdminSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { seedAchievements } from "@/lib/data";
import AchievementsManager from "@/components/admin/AchievementsManager";

export default async function AdminAchievementsPage() {
  await requireAdminSession();
  const supabase = createClient();
  const { data } = supabase ? await supabase.from("achievements").select("*").order("order_index") : { data: null };
  const items = data && data.length ? data : seedAchievements;

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Achievements</h1>
      <p className="mt-1 text-sm text-muted">Real achievements only — no fake awards.</p>
      <div className="mt-8">
        <AchievementsManager items={items} />
      </div>
    </div>
  );
}
