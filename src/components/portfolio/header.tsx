"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu } from "lucide-react"
import { useState } from "react"
import { scrollToSection } from "@/lib/scroll-to-section"

const navItems = [
  { name: "Experience", sectionId: "experience" },
  { name: "Projects", sectionId: "projects" },
  { name: "Activities", sectionId: "certifications" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex-1">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            Aasish Raj
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.sectionId)}
              className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex-1 flex justify-end items-center gap-2">
          <ThemeToggle />
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  scrollToSection(item.sectionId)
                  setIsMenuOpen(false)
                }}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary w-full text-left cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
} 