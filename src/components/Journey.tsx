import { journeySteps } from "@/lib/data";

export default function Journey() {
  return (
    <section className="rule bg-surface">
      <div className="container-page py-20">
        <h2 className="font-display text-3xl text-ink">My Data Science Journey</h2>
        <p className="mt-3 max-w-prose text-muted">
          The path I'm following, one stage at a time — programming fundamentals through to applying data and AI to real problems.
        </p>

        <ol className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-4">
          {journeySteps.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-md border border-line bg-paper px-4 py-2 font-mono text-sm text-ink">
                {step}
              </span>
              {i < journeySteps.length - 1 && <span className="text-muted">→</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
