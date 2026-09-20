import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GithubSection from "@/components/GithubSection";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Roadmap from "@/components/Roadmap";
import ResumeSection from "@/components/ResumeSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getProfile, getSocialLinks, getSkills, getProjects, getExperience,
  getEducation, getCertifications, getAchievements,
} from "@/lib/queries";

export default async function HomePage() {
  const [profile, socialLinks, skills, projects, experience, education, certifications, achievements] =
    await Promise.all([
      getProfile(), getSocialLinks(), getSkills(), getProjects(), getExperience(),
      getEducation(), getCertifications(), getAchievements(),
    ]);

  const linkedin = socialLinks.find((s) => s.platform === "LinkedIn" && s.visible)?.url ?? null;

  return (
    <>
      <Navbar githubUrl={`https://github.com/${profile.github}`} linkedinUrl={linkedin} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Journey />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <GithubSection username={profile.github} />
        <Experience items={experience} />
        <Education items={education} />
        <Certifications items={certifications} />
        <Achievements items={achievements} />
        <Roadmap />
        <ResumeSection resumeUrl={profile.resume_url} />
        <Contact email={profile.email} location={profile.location} whatsapp={profile.whatsapp} />
      </main>
      <Footer profile={profile} socialLinks={socialLinks} />
    </>
  );
}
