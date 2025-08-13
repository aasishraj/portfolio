import { HeroSection } from "@/components/portfolio/hero-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { OpenSourceSection } from "@/components/portfolio/open-source-section";
import { CertificationsSection } from "@/components/portfolio/certifications-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <div id="experience">
          <ExperienceSection />
        </div>
        
        <div id="projects">
          <ProjectsSection />
        </div>
        
        <div id="open-source">
          <OpenSourceSection />
        </div>
        
        <div id="certifications">
          <CertificationsSection />
        </div>
      </main>
    </div>
  );
}
