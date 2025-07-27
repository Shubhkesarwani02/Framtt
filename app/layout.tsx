import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const viewport = "width=device-width, initial-scale=1";

export const metadata: Metadata = {
  title: "Framtt - Rental Business Tools | Fleet Management Solutions",
  description:
    "Discover personalized rental business tools with AI-powered recommendations. Get real-time fleet tracking, booking management, and customer communication solutions.",
  keywords: "rental business, fleet management, booking system, vehicle tracking, rental software",
  authors: [{ name: "Framtt" }],
  robots: "index, follow",
  openGraph: {
    title: "Framtt - Rental Business Tools",
    description: "Discover the right tools for your rental business with personalized recommendations",
    type: "website",
    locale: "en_US",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
