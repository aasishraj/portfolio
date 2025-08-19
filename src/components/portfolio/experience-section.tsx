import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    title: "Python Backend Developer",
    company: "Fun Design",
    description: "Developed product filtering API endpoints for e-commerce platform 'Earke'",
    type: "Internship"
  },
  {
    title: "Gen AI Developer", 
    company: "Last Mile Consultants",
    description: "Designed and developed a RAG system for healthcare insurance policy documents",
    type: "Internship"
  }
]

export function ExperienceSection() {
  return (
    <section className="pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Experience</h2>
        </div>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <Badge variant="secondary">{exp.type}</Badge>
                    </div>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
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