import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Github, Linkedin, Code2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Avatar className="h-32 w-32 mx-auto mb-6">
            <AvatarImage src="/blpfp.jpg" alt="Aasish Raj" />
            <AvatarFallback className="text-2xl">AR</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Aasish Raj</h1>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary">Gen AI</Badge>
            <Badge variant="secondary">System Design</Badge>
            <Badge variant="secondary">AI/ML</Badge>
            <Badge variant="secondary">Backend Development</Badge>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4" />
            <span>aasishrajrr@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" />
            <span>+91 82 4865 4856</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Kerala, India</span>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <a href="https://linkedin.com/in/aasishraj" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/aasishraj" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="https://leetcode.com/u/aasishraj" target="_blank" rel="noopener noreferrer">
              <Code2 className="h-4 w-4 mr-2" />
              LeetCode
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
} 