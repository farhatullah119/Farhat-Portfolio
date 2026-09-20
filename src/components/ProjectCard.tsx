import Link from "next/link";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

const STATUS_STYLE: Record<Project["status"], string> = {
  "Live": "text-green-700 dark:text-green-400",
  "In Progress": "text-signal",
  "Prototype / Concept": "text-muted",
  "Coming Soon": "text-muted",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6">
      <div className="mb-4 aspect-[16/10] w-full overflow-hidden rounded-md border border-line bg-paper">
        {project.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image_url} alt={project.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted">
            No image yet
          </div>
        )}
      </div>

      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-muted">{project.category}</span>
        <span className={`font-mono text-xs ${STATUS_STYLE[project.status]}`}>{project.status}</span>
      </div>

      <h3 className="font-display text-xl text-ink">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      {project.technologies.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex items-center gap-4 border-t border-line pt-4 text-sm">
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-ink hover:text-signal">
            <Github size={15} /> Code
          </a>
        )}
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-ink hover:text-signal">
            <ExternalLink size={15} /> Live demo
          </a>
        )}
        <Link href={`/projects/${project.slug}`} className="ml-auto flex items-center gap-1 text-ink hover:text-signal">
          Details <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}
