import { roadmapSteps } from "@/lib/data";

export default function Roadmap() {
  return (
    <section className="rule bg-surface">
      <div className="container-page py-20">
        <h2 className="font-display text-3xl text-ink">My Learning Roadmap</h2>

        <div className="mt-10 flex flex-col">
          {roadmapSteps.map((step, i) => (
            <div key={step} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-signal font-mono text-xs text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < roadmapSteps.length - 1 && <span className="my-1 w-px flex-1 bg-line" />}
              </div>
              <p className="pb-8 pt-1 text-ink">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
