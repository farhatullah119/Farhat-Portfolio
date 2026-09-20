import { Award, FileText } from "lucide-react";
import type { Certification } from "@/lib/types";

export default function Certifications({ items }: { items: Certification[] }) {
  if (!items.length) return null;
  return (
    <section id="certifications" className="rule bg-surface">
      <div className="container-page py-20">
        <h2 className="font-display text-3xl text-ink">Certifications &amp; Training</h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {items.map((cert) => (
            <div key={cert.id} className="rounded-lg border border-line bg-paper p-6">
              <div className="flex items-start gap-3">
                <Award size={18} className="mt-0.5 shrink-0 text-signal" />
                <div>
                  <h3 className="font-medium text-ink">{cert.name}</h3>
                  <p className="text-sm text-muted">{cert.issuer}</p>
                </div>
              </div>

              {cert.topics.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {cert.topics.map((t) => (
                    <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 flex items-center justify-between">
                {cert.issue_date && (
                  <span className="font-mono text-xs text-muted">
                    {new Date(cert.issue_date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                )}
                {cert.certificate_url && (
                  <a href={cert.certificate_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-signal">
                    <FileText size={14} /> View certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
