import { MapPin, ArrowRight, FileDown } from "lucide-react";
import type { Profile } from "@/lib/types";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="container-page grid gap-12 pb-20 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-24">
      <div>
        <p className="mb-5 flex items-center gap-2 text-sm text-muted">
          <MapPin size={15} /> {profile.location}
        </p>
        <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {profile.hero_heading}
        </h1>
        <p className="mt-3 font-display text-xl italic text-muted sm:text-2xl">{profile.title}</p>
        <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-muted">{profile.hero_subtext}</p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#projects" className="btn-signal">
            Explore My Work <ArrowRight size={16} />
          </a>
          <a href="#contact" className="btn-secondary">Contact Me</a>
          {profile.resume_url && (
            <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-secondary">
              <FileDown size={16} /> Download Resume
            </a>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-xs lg:max-w-sm">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line bg-surface">
          {profile.profile_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.profile_image_url} alt={profile.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-6xl text-signal">FU</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
