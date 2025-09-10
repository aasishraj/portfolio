import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { ExternalLink, GitBranch, Github } from "lucide-react"

interface OpenSourceContribution {
  title: string
  description: string
  repository: string
  repositoryUrl: string
  contributionUrl: string
  type: "Documentation" | "Bug Fix" | "Feature" | "Enhancement"
  status: "Merged" | "Open" | "Closed"
}

const contributions: OpenSourceContribution[] = [
  {
    title: "ElevenLabs Python SDK Documentation",
    description: "Updated websockets.mdx example to use the new version of elevenlabs-python SDK.",
    repository: "elevenlabs/elevenlabs-docs",
    repositoryUrl: "https://github.com/elevenlabs/elevenlabs-docs",
    contributionUrl: "https://github.com/elevenlabs/elevenlabs-docs/pull/879/",
    type: "Documentation",
    status: "Merged"
  },
  {
    title: "Langchain AzureOpenAI Bug Fix",
    description: "Fixed validation logic for AzureOpenAIEmbeddings to properly handle openai_api_base parameter when azure_endpoint is provided, resolving configuration conflicts",
    repository: "langchain-ai/langchain",
    repositoryUrl: "https://github.com/langchain-ai/langchain",
    contributionUrl: "https://github.com/langchain-ai/langchain/pull/31782",
    type: "Bug Fix",
    status: "Merged"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Merged": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Open": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Closed": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Documentation": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    case "Bug Fix": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "Feature": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Enhancement": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function OpenSourceSection() {
  return (
    <section className="py-16 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Open Source Contributions</h2>
          <p className="text-muted-foreground">Contributing to the developer community through documentation and bug fixes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contributions.map((contribution, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <GitBranch className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <h3 className="text-xl font-semibold mb-2 cursor-pointer hover:text-primary transition-colors">
                              {contribution.title}
                            </h3>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <p className="text-sm">{contribution.description}</p>
                          </HoverCardContent>
                        </HoverCard>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className={getTypeColor(contribution.type)}>
                            {contribution.type}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(contribution.status)}>
                            {contribution.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Github className="h-4 w-4" />
                      <span>{contribution.repository}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={contribution.repositoryUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Repository
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={contribution.contributionUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Contribution
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 