import type { Achievement } from "@/lib/types";

export default function Achievements({ items }: { items: Achievement[] }) {
  if (!items.length) return null;
  return (
    <section id="achievements" className="rule">
      <div className="container-page py-20">
        <h2 className="font-display text-3xl text-ink">Achievements</h2>

        <div className="mt-10 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-1 border-b border-line pb-6 last:border-0 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-signal">{item.category}</p>
                <h3 className="mt-1 font-medium text-ink">{item.title}</h3>
                <p className="mt-1 max-w-prose text-sm text-muted">{item.description}</p>
              </div>
              {item.date && (
                <span className="whitespace-nowrap font-mono text-xs text-muted">
                  {new Date(item.date).toLocaleDateString(undefined, { year: "numeric", month: "short" })}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
