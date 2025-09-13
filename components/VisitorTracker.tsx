'use client'
import { useEffect } from 'react'

export default function VisitorTracker(): null {
  useEffect(() => {
    // Track visitor on page load
    const trackVisitor = async (): Promise<void> => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer || 'Direct',
          }),
        })
      } catch (error) {
        console.error('Error tracking visitor:', error)
      }
    }

    // Small delay to ensure page is fully loaded
    const timer = setTimeout(trackVisitor, 1000)

    return () => clearTimeout(timer) // cleanup in case component unmounts
  }, [])

  return null // This component doesn't render anything
}
