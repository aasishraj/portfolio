'use client'

import { useEffect } from 'react'

export function DisableDevTools() {
  useEffect(() => {
    // Disable right-click context menu
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable specific keyboard shortcuts
    const disableKeyboardShortcuts = (e: KeyboardEvent) => {
      // Disable F12
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }
      
      // Disable Ctrl+Shift+I (Windows/Linux) and Cmd+Option+I (Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        return false
      }
      
      // Disable Ctrl+Shift+C (inspect element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        return false
      }
      
      // Disable Ctrl+U (view source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault()
        return false
      }
      
      // Disable Ctrl+S (save page)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        return false
      }
    }

    // Add event listeners
    document.addEventListener('contextmenu', disableRightClick)
    document.addEventListener('keydown', disableKeyboardShortcuts)
    
    // Also disable text selection (optional - uncomment if needed)
    // document.onselectstart = () => false
    // document.ondragstart = () => false

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('contextmenu', disableRightClick)
      document.removeEventListener('keydown', disableKeyboardShortcuts)
    }
  }, [])

  return null // This component doesn't render anything
} 