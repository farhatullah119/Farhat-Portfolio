import type { Skill } from "@/lib/types";

const PROFICIENCY_LABEL: Record<Skill["proficiency"], string> = {
  learning: "Learning",
  familiar: "Familiar",
  project_experience: "Project experience",
};

const CATEGORIES: Skill["category"][] = [
  "Data Science",
  "Artificial Intelligence",
  "Development",
  "Cybersecurity & Networking",
];

export default function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="rule">
      <div className="container-page py-20">
        <h2 className="font-display text-3xl text-ink">Skills</h2>
        <p className="mt-3 max-w-prose text-muted">
          Grouped by area, with an honest label for where I am with each — not a percentage guess.
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {CATEGORIES.map((category) => {
            const items = skills.filter((s) => s.category === category);
            if (!items.length) return null;
            return (
              <div key={category}>
                <h3 className="mb-4 text-sm font-medium text-ink">{category}</h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <li
                      key={skill.id}
                      className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-ink"
                    >
                      {skill.name}
                      <span className="font-mono text-xs text-signal">{PROFICIENCY_LABEL[skill.proficiency]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
