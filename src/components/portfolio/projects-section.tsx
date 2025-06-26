import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Energentic (FIDE)",
    description: "Built an assistant for energy grid queries and peak-hour notifications",
    technologies: ["AI/ML", "Energy Grid", "Notifications"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Banaras Tourism Data Analysis (BHU)",
    description: "Extracted insights from reviews using BERT and LDA",
    technologies: ["BERT", "LDA", "Data Analysis", "NLP"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Reconciliation Engine (Open Fintech)",
    description: "Automated financial reconciliation with FastAPI and AWS",
    technologies: ["FastAPI", "AWS", "FinTech", "Automation"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "ezlab – Educational Portal API",
    description: "Rebuilt ETLAB interface with secure auth and documentation",
    technologies: ["API", "Authentication", "Education", "Documentation"],
    githubUrl: "#",
    liveUrl: "#"
  }
]

export function ProjectsSection() {
  return (
    <section className="py-16 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground">Some of my recent work and contributions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 