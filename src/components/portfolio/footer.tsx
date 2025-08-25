import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail } from "lucide-react"
import { VisitorCounter } from "@/components/visitor-counter"

export function Footer() {
  return (
    <footer className="bg-muted/50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Let&apos;s Connect</h3>
          <p className="text-muted-foreground mb-6">
            Feel free to reach out for collaborations or just a friendly hello!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <a href="mailto:mail@aasishraj.com">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </a>
            </Button>
          </div>
          <div className="mt-3 flex justify-center">
            <VisitorCounter />
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Aasish Raj. All rights reserved.</p>
          <p className="mt-2">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
} 