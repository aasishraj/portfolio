import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-4">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center text-muted-foreground leading-relaxed">
              Software developer skilled in Python, system design, and AI/ML, focused on building scalable solutions.
              I&apos;m passionate about creating efficient, user-centric applications and constantly learning new technologies
              to solve complex problems.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
} 