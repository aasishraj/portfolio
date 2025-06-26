import { Header } from "@/components/portfolio/header"
import { HeroSection } from "@/components/portfolio/hero-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { CertificationsSection } from "@/components/portfolio/certifications-section"
import { Footer } from "@/components/portfolio/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        
        <div id="experience">
          <ExperienceSection />
        </div>
        
        <div id="projects">
          <ProjectsSection />
        </div>
        
        <div id="certifications">
          <CertificationsSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
