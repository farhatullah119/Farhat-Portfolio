import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { getProjects, getProfile, getSocialLinks } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [projects, profile, socialLinks] = await Promise.all([getProjects(), getProfile(), getSocialLinks()]);
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const linkedin = socialLinks.find((s) => s.platform === "LinkedIn" && s.visible)?.url ?? null;
  const sections: { label: string; value: string | null }[] = [
    { label: "Overview", value: project.overview },
    { label: "Problem", value: project.problem },
    { label: "Solution", value: project.solution },
    { label: "Challenges", value: project.challenges },
    { label: "What I learned", value: project.learnings },
    { label: "Future improvements", value: project.future_improvements },
  ].filter((s) => s.value);

  return (
    <>
      <Navbar githubUrl={`https://github.com/${profile.github}`} linkedinUrl={linkedin} />
      <main className="container-page py-14">
        <Link href="/#projects" className="flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft size={14} /> Back to projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wide text-muted">{project.category}</span>
          <span className="font-mono text-xs text-signal">{project.status}</span>
        </div>
        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">{project.name}</h1>
        <p className="mt-4 max-w-prose text-muted">{project.description}</p>

        <div className="mt-5 flex items-center gap-5">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-ink hover:text-signal">
              <Github size={15} /> Code
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-ink hover:text-signal">
              <ExternalLink size={15} /> Live demo
            </a>
          )}
        </div>

        {project.technologies.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted">{t}</li>
            ))}
          </ul>
        )}

        <div className="mt-10 max-w-prose space-y-8 border-t border-line pt-10">
          {sections.map((s) => (
            <div key={s.label}>
              <h2 className="font-display text-xl text-ink">{s.label}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.value}</p>
            </div>
          ))}
          {sections.length === 0 && <p className="text-sm text-muted">More detail coming soon.</p>}
        </div>
      </main>
      <Footer profile={profile} socialLinks={socialLinks} />
    </>
  );
}
