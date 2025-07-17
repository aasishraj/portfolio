import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface Technology {
  name: string
  description?: string
  url?: string
}

interface GithubLink {
  name: string
  url: string
}

interface Project {
  title: string
  description: string
  technologies: Technology[]
  organization?: string
  organizationFullName?: string
  organizationUrl?: string
  githubUrl?: string
  githubUrls?: GithubLink[]
  liveUrl?: string
}

const freelanceProjects: Project[] = [
  {
    title: "Energentic",
    description: "Built a Beckn protocol-based energy assistant for consumer grid queries and notifications",
    technologies: [
      { name: "Beckn Protocol", description: "An open network protocol for decentralized, local-first commerce discovery.", url: "https://becknprotocol.io/" },
      { name: "Langchain", description: "A framework for developing applications powered by LLMs.", url: "https://www.langchain.com/" },
      { name: "Websocket", description: "A protocol providing full-duplex communication channels over a single TCP connection."},
    ],
    organization: "FIDE",
    organizationFullName: "Foundation for Interoperability in Digital Economy",
    organizationUrl: "https://fide.org/",
  },
  {
    title: "Reconciliation Engine",
    description: "Production ready financial reconciliation system",
    technologies: [
      { name: "FastAPI", description: "A modern, high-performance web framework for building APIs with Python.", url: "https://fastapi.tiangolo.com/" },
      { name: "AWS", description: "Amazon Web Services: A comprehensive cloud computing platform from Amazon.", url: "https://aws.amazon.com/" },
      { name: "Docker Swarm", description: "Native clustering for Docker. It turns a pool of Docker hosts into a single, virtual Docker host.", url: "https://docs.docker.com/engine/swarm/" },
    ],
    organization: "Open Fintech",
    organizationFullName: "Open Financial Technologies",
    organizationUrl: "https://open.money/",
  },
  {
    title: "Banaras Tourism Data Analysis",
    description: "Extracted insights from google maps reviews and instagram posts",
    technologies: [
      { name: "BERT", description: "Bidirectional Encoder Representations from Transformers, a powerful language representation model."},
      { name: "LDA", description: "Latent Dirichlet Allocation, a topic model for discovering abstract topics in documents."},
      { name: "NLP", description: "Natural Language Processing: Enabling computers to understand and process human language."},
    ],
    organization: "BHU",
    organizationFullName: "Banaras Hindu University",
    organizationUrl: "https://www.bhu.ac.in/",
  },
]

const personalProjects: Project[] = [
  {
    title: "ezlab - Educational Portal API",
    description: "Rebuilt ETLAB interface with secure auth and documentation",
    technologies: [
        { name: "API", description: "Application Programming Interface: A set of rules allowing different software entities to communicate."},
        { name: "Authentication", description: "The process of verifying user identity to grant access to systems."},
        { name: "Education", description: "Technology applied to the field of education to facilitate learning."},
        { name: "Documentation", description: "The practice of creating clear and comprehensive technical documentation for software."},
    ],
    liveUrl: "https://ezlab.vercel.app"
  },
  {
    title: "Teehee.chat",
    description: "An open-source variant of t3.chat by Theo.",
    technologies: [
      { name: "Open Source", description: "Software with source code that anyone can inspect, modify, and enhance." },
      { name: "Next.js", description: "The React Framework for Production." },
      { name: "FastAPI", description: "A modern, high-performance web framework for building APIs with Python." },
      { name: "TypeScript", description: "A typed superset of JavaScript that compiles to plain JavaScript." },
      { name: "Python", description: "A high-level, general-purpose programming language." },
    ],
    githubUrls: [
        { name: "Frontend", url: "https://github.com/aasishraj/teehee-chat-frontend" },
        { name: "Backend", url: "https://github.com/aasishraj/teehee-chat-backend" }
    ],
    liveUrl: "https://v0-teehee-chat.vercel.app/"
  },
  {
    title: "Todo App",
    description: "A minimal todo application with in-browser memory.",
    technologies: [
        { name: "Next.js", description: "The React Framework for Production." },
    ],
    liveUrl: "https://todo.aasishraj.com"
  },
  {
    title: "Flashcard App",
    description: "A minimal flashcard application with in-browser memory.",
    technologies: [
        { name: "Next.js", description: "The React Framework for Production." },
    ],
    liveUrl: "https://flash.aasishraj.com"
  },
  {
    title: "Python Playground",
    description: "An in-memory python playground.",
    technologies: [
        { name: "Python", description: "A high-level, general-purpose programming language." },
        { name: "WebAssembly", description: "A binary instruction format for a stack-based virtual machine." },
        { name: "Pyodide", description: "A port of CPython to WebAssembly." },
    ],
    liveUrl: "https://python.aasishraj.com"
  }
]

const ProjectGrid = ({ projects }: { projects: Project[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {projects.map((project, index) => (
      <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            {project.organization && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a href={project.organizationUrl} target="_blank" rel="noopener noreferrer">
                    <Badge variant="outline" className="text-xs font-medium ml-2 flex-shrink-0 cursor-pointer">
                      {project.organization}
                    </Badge>
                  </a>
                </HoverCardTrigger>
                {project.organizationFullName && (
                  <HoverCardContent>
                    <p className="text-sm">{project.organizationFullName}</p>
                  </HoverCardContent>
                )}
              </HoverCard>
            )}
          </div>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <HoverCard key={techIndex}>
                <HoverCardTrigger asChild>
                  <a href={tech.url} target="_blank" rel="noopener noreferrer">
                    <Badge variant="secondary" className="text-xs cursor-pointer">
                      {tech.name}
                    </Badge>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p className="text-sm">{tech.description}</p>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          <div className="flex gap-2">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
            {project.githubUrls && project.githubUrls.map((link, linkIndex) => (
                <Button variant="outline" size="sm" asChild key={linkIndex}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    {link.name}
                    </a>
                </Button>
            ))}
            {project.liveUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

export function ProjectsSection() {
  return (
    <section className="py-16 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground">My professional and personal development work</p>
        </div>
        
        {/* Freelance Projects Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">Freelance Projects</h3>
            <p className="text-muted-foreground">Professional client work and collaborations</p>
          </div>
          <ProjectGrid projects={freelanceProjects} />
        </div>
        
        {/* Personal Projects Section */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">Personal Projects</h3>
            <p className="text-muted-foreground">Independent research and development initiatives</p>
          </div>
          <ProjectGrid projects={personalProjects} />
        </div>
      </div>
    </section>
  )
} 