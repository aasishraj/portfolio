export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (!element) return

  const headerOffset = 80 // Height of the fixed header + some padding
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
} 