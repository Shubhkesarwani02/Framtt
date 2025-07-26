"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  MessageSquare,
  Truck,
  Zap,
  Globe,
  TrendingUp,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Star,
} from "lucide-react"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"

interface ResultCardProps {
  answers: Record<number, string>
}

const solutions = {
  tracking: {
    title: "Live Vehicle Tracking",
    description: "Real-time GPS tracking and fleet management",
    icon: Truck,
    features: ["GPS Tracking", "Maintenance Alerts", "Fuel Monitoring"],
    color: "from-green-500 to-emerald-500",
  },
  booking: {
    title: "Booking Dashboard",
    description: "Streamlined booking and revenue management",
    icon: BarChart3,
    features: ["Real-time Bookings", "Revenue Analytics", "Customer Management"],
    color: "from-blue-500 to-cyan-500",
  },
  messaging: {
    title: "Customer Communication",
    description: "Automated notifications and feedback system",
    icon: MessageSquare,
    features: ["Auto Notifications", "Feedback Collection", "Review Management"],
    color: "from-purple-500 to-violet-500",
  },
  marketing: {
    title: "AI Marketing",
    description: "Intelligent campaign building and optimization",
    icon: Zap,
    features: ["Campaign Builder", "ROI Optimization", "Customer Insights"],
    color: "from-yellow-500 to-orange-500",
  },
  analytics: {
    title: "Advanced Analytics",
    description: "Comprehensive business intelligence and reporting",
    icon: TrendingUp,
    features: ["Custom Reports", "Performance Metrics", "Data Visualization"],
    color: "from-pink-500 to-rose-500",
  },
  integration: {
    title: "API Integration",
    description: "Seamless connection with existing tools",
    icon: Globe,
    features: ["Website Integration", "Third-party APIs", "Workflow Automation"],
    color: "from-indigo-500 to-blue-500",
  },
}

const FloatingStars = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            scale: 0,
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        >
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
        </motion.div>
      ))}
    </div>
  )
}

export function ResultCard({ answers }: ResultCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)
  const [isLoadingSolutions, setIsLoadingSolutions] = useState(true)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)

  useEffect(() => {
    // Simulate loading solutions
    const timer = setTimeout(() => {
      setIsLoadingSolutions(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Determine recommended solutions based on answers
  const getRecommendedSolutions = () => {
    try {
      const recommended = []

      // Check tracking needs
      if (answers[1] === "No") {
        recommended.push("tracking")
      }

      // Check booking management
      if (answers[2] === "No") {
        recommended.push("booking")
      }

      // Check communication needs
      if (answers[3] === "No") {
        recommended.push("messaging")
      }

      // Check feedback handling
      if (answers[4] === "No") {
        recommended.push("analytics")
      }

      // Check marketing and analytics
      if (answers[5] === "No") {
        recommended.push("marketing")
      }

      // Always include integration as a growth solution
      recommended.push("integration")

      // Remove duplicates and limit to top 3
      return [...new Set(recommended)].slice(0, 3)
    } catch (error) {
      console.error("Error generating solutions:", error)
      return ["booking", "tracking", "messaging"] // fallback solutions
    }
  }

  // Memoize the recommended solutions calculation:
  const recommendedSolutions = useMemo(() => {
    return getRecommendedSolutions()
  }, [answers])

  // Add tracking to handleFlip:
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    setShowConfetti(false)

    trackEvent("result_card_flip", {
      flipped_to: !isFlipped ? "solutions" : "summary",
      solutions_count: recommendedSolutions.length,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-12 relative overflow-hidden">
      {showConfetti && <FloatingStars />}

      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-4"
          >
            <Sparkles className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto" />
          </motion.div>

          <motion.h1
            className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Your Personalized Solution
          </motion.h1>

          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Based on your answers, here are our recommendations
          </motion.p>
        </motion.div>

        {/* Card flip container */}
        <div className="relative w-full h-[500px] sm:h-[600px] mx-auto touch-manipulation">
          <motion.div
            className="relative w-full h-full cursor-pointer select-none"
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }}
            onClick={handleFlip}
            onTouchStart={(e) => {
              e.preventDefault()
              const touch = e.touches[0]
              setTouchStartX(touch.clientX)
              setTouchStartY(touch.clientY)
              e.currentTarget.style.transform = "scale(0.98)"
            }}
            onTouchMove={(e) => {
              e.preventDefault()
              // Prevent scrolling during card interaction
            }}
            onTouchEnd={(e) => {
              e.preventDefault()
              const touch = e.changedTouches[0]
              const deltaX = Math.abs(touch.clientX - touchStartX)
              const deltaY = Math.abs(touch.clientY - touchStartY)

              // Only flip if it's a tap, not a swipe
              if (deltaX < 10 && deltaY < 10) {
                handleFlip()
              }

              e.currentTarget.style.transform = "scale(1)"
            }}
            onTouchCancel={(e) => {
              e.preventDefault()
              e.currentTarget.style.transform = "scale(1)"
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleFlip()
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={isFlipped ? "View summary" : "View recommendations"}
            aria-pressed={isFlipped}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Front Card - Only show when not flipped */}
            {!isFlipped && (
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: 180 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Card className="w-full h-full shadow-2xl border-0 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 overflow-hidden touch-manipulation">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                        "linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 100%)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />

                  <CardContent className="p-8 h-full flex flex-col justify-center items-center text-white text-center relative z-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                      className="mb-6"
                    >
                      <motion.div
                        className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm"
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(255,255,255,0.3)",
                            "0 0 40px rgba(255,255,255,0.5)",
                            "0 0 20px rgba(255,255,255,0.3)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Zap className="h-12 w-12" />
                      </motion.div>
                    </motion.div>

                    <motion.h2
                      className="text-3xl font-bold mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      Perfect Match Found!
                    </motion.h2>

                    <motion.p
                      className="text-xl mb-8 opacity-90"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      We've analyzed your needs and found the ideal solutions for your rental business
                    </motion.p>

                    <motion.div
                      className="flex items-center gap-2 text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <span>Click to see your recommendations</span>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <RotateCcw className="h-5 w-5" />
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Back Card - Only show when flipped */}
            {isFlipped && (
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Card className="w-full h-full shadow-2xl border-0 bg-white dark:bg-slate-800 overflow-hidden touch-manipulation">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10"
                    animate={{
                      background: [
                        "linear-gradient(45deg, rgba(59, 130, 246, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%)",
                        "linear-gradient(45deg, rgba(168, 85, 247, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
                      ],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />

                  <CardContent className="p-4 sm:p-8 h-full relative z-10">
                    <motion.div
                      className="text-center mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                        Recommended Solutions
                      </h2>
                      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
                        Tailored specifically for your business needs
                      </p>
                    </motion.div>

                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 max-h-80 sm:max-h-96 overflow-y-auto overscroll-contain">
                      {isLoadingSolutions ? (
                        <div className="text-center text-slate-600 dark:text-slate-300">Loading solutions...</div>
                      ) : (
                        recommendedSolutions.map((solutionKey, index) => {
                          const solution = solutions[solutionKey as keyof typeof solutions]
                          return (
                            <motion.div
                              key={solutionKey}
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                              className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300 group touch-manipulation"
                            >
                              <div
                                className={`p-4 bg-gradient-to-br ${solution.color} rounded-xl shadow-lg flex-shrink-0`}
                              >
                                <solution.icon className="h-8 w-8 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                  {solution.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                  {solution.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {solution.features.map((feature) => (
                                    <Badge
                                      key={feature}
                                      variant="secondary"
                                      className="text-sm px-3 py-1 bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-500"
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )
                        })
                      )}
                    </div>

                    <motion.div
                      className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center px-2 sm:px-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                    >
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => trackEvent("cta_click", { button: "get_started", location: "results" })}
                      >
                        Get Started Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>

                      <Button
                        variant="outline"
                        className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 px-8 py-3 text-lg font-semibold bg-transparent"
                      >
                        Schedule Demo
                      </Button>

                      <Link href="/">
                        <Button
                          variant="ghost"
                          className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 px-8 py-3 text-lg font-semibold"
                        >
                          Start Over
                        </Button>
                      </Link>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-lg">Want to explore all features?</p>
          <Link href="/">
            <Button
              variant="outline"
              className="border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 bg-transparent px-6 py-2"
            >
              View All Framtt Features
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
