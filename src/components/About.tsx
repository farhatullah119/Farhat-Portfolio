import type { Profile } from "@/lib/types";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="rule">
      <div className="container-page grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <h2 className="font-display text-3xl text-ink">About Me</h2>
        </div>
        <div className="max-w-prose space-y-5 text-[1.05rem] leading-relaxed text-muted">
          {profile.about_paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
