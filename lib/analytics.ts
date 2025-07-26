// Simple analytics utility for tracking user interactions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    // In a real app, you'd send this to your analytics service
    console.log("Analytics Event:", eventName, properties)

    // Example: Google Analytics 4
    if (window.gtag) {
      window.gtag("event", eventName, properties)
    }
  }
}

export const trackPageView = (path: string) => {
  if (typeof window !== "undefined") {
    console.log("Page View:", path)

    if (window.gtag) {
      window.gtag("config", "GA_MEASUREMENT_ID", {
        page_path: path,
      })
    }
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
