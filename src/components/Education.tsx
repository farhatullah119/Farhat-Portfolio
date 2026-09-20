import type { Education as EducationT } from "@/lib/types";

export default function Education({ items }: { items: EducationT[] }) {
  if (!items.length) return null;
  return (
    <section id="education" className="rule">
      <div className="container-page py-20">
        <h2 className="font-display text-3xl text-ink">Education</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-lg border border-line bg-surface p-6">
              <h3 className="font-display text-lg text-ink">{item.institution}</h3>
              <p className="mt-1 text-sm text-signal">{item.program}</p>
              {item.description && <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>}
              {(item.start_year || item.end_year) && (
                <p className="mt-3 font-mono text-xs text-muted">
                  {item.start_year || ""}
                  {item.start_year && item.end_year ? " – " : ""}
                  {item.end_year || ""}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
