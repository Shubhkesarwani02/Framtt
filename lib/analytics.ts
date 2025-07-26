export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    if (window.gtag) {
      window.gtag("event", eventName, properties)
    }
  }
}

export const trackPageView = (path: string) => {
  if (typeof window !== "undefined") {
    if (window.gtag) {
      window.gtag("config", "GA_MEASUREMENT_ID", {
        page_path: path,
      })
    }
  }
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
