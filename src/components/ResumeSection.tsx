import { FileText, FileDown } from "lucide-react";

export default function ResumeSection({ resumeUrl }: { resumeUrl: string | null }) {
  return (
    <section className="rule">
      <div className="container-page py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-line bg-surface p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl text-ink">My Resume</h2>
            <p className="mt-2 max-w-prose text-muted">
              Explore my education, skills, projects, certifications, and experience.
            </p>
          </div>

          {resumeUrl ? (
            <div className="flex shrink-0 gap-3">
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                <FileText size={16} /> View Resume
              </a>
              <a href={resumeUrl} download className="btn-signal">
                <FileDown size={16} /> Download
              </a>
            </div>
          ) : (
            <p className="font-mono text-xs text-muted">Resume not uploaded yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
