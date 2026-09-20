"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/lib/types";
import ProjectCard from "./ProjectCard";

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Data Science", "AI", "Web Development", "Cybersecurity", "Networking", "Social Impact"];

export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const usedFilters = FILTERS.filter((f) => f === "All" || projects.some((p) => p.category === f));

  return (
    <section id="projects" className="rule bg-surface">
      <div className="container-page py-20">
        <h2 className="font-display text-3xl text-ink">Featured Projects</h2>
        <p className="mt-3 max-w-prose text-muted">
          Real, in-progress work — labeled honestly by status, from early concepts to active builds.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {usedFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md border px-3.5 py-1.5 text-sm transition-colors ${
                filter === f ? "border-signal text-signal" : "border-line text-muted hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {visible.length === 0 && <p className="text-muted">No projects in this category yet.</p>}
        </div>
      </div>
    </section>
  );
}
