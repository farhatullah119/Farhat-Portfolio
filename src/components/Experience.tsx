import type { Experience as ExperienceT } from "@/lib/types";

export default function Experience({ items }: { items: ExperienceT[] }) {
  if (!items.length) return null;
  return (
    <section id="experience" className="rule bg-surface">
      <div className="container-page py-20">
        <h2 className="font-display text-3xl text-ink">Experience</h2>

        <div className="mt-10 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="grid gap-2 border-l-2 border-line pl-6 sm:grid-cols-[0.3fr_0.7fr] sm:gap-8">
              <div className="font-mono text-xs uppercase tracking-wide text-muted">{item.category}</div>
              <div>
                <h3 className="font-medium text-ink">{item.position}</h3>
                <p className="text-sm text-muted">
                  {item.organization}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
