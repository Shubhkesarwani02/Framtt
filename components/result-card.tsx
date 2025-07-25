"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
import { ThemeToggle } from "@/components/theme-toggle"

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
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
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

  // Determine recommended solutions based on answers
  const getRecommendedSolutions = () => {
    const recommended = []

    // Check tracking needs
    if (answers[1] === "No" || answers[1] === "Partially") {
      recommended.push("tracking")
    }

    // Check booking management
    if (answers[2] === "Manual/Phone" || answers[2] === "Excel" || answers[2] === "No System") {
      recommended.push("booking")
    }

    // Check communication needs
    if (answers[3] === "No" || answers[3] === "Sometimes") {
      recommended.push("messaging")
    }

    // Check feedback handling
    if (answers[4] === "Manual Collection" || answers[4] === "Don't Collect") {
      recommended.push("messaging")
    }

    // Check analytics needs
    if (answers[5] === "Rarely" || answers[5] === "Never" || answers[5] === "Occasionally") {
      recommended.push("analytics")
    }

    // Check integration needs
    if (answers[6] === "Excel" || answers[6] === "Custom Software") {
      recommended.push("integration")
    }

    // Always recommend marketing for growth
    recommended.push("marketing")

    // Remove duplicates and limit to top 3
    return [...new Set(recommended)].slice(0, 3)
  }

  const recommendedSolutions = getRecommendedSolutions()

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    setShowConfetti(false)
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

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

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

        {/* Fixed card flip container */}
        <div className="relative w-full h-[500px] mx-auto" style={{ perspective: "1000px" }}>
          <motion.div
            className="relative w-full h-full cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onClick={handleFlip}
            whileHover={{ scale: 1.02 }}
          >
            {/* Front of card */}
            <Card
              className="absolute inset-0 w-full h-full shadow-2xl border-0 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
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

            {/* Back of card */}
            <Card
              className="absolute inset-0 w-full h-full shadow-2xl border-0 bg-white dark:bg-slate-800 overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)",
                    "linear-gradient(45deg, rgba(168, 85, 247, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />

              <CardContent className="p-8 h-full relative z-10">
                <motion.div
                  className="text-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: isFlipped ? 0.5 : 0 }}
                >
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Recommended Solutions</h2>
                  <p className="text-slate-600 dark:text-slate-300">Tailored specifically for your business needs</p>
                </motion.div>

                <div className="grid gap-4 mb-6 max-h-80 overflow-y-auto">
                  <AnimatePresence>
                    {recommendedSolutions.map((solutionKey, index) => {
                      const solution = solutions[solutionKey as keyof typeof solutions]
                      return (
                        <motion.div
                          key={solutionKey}
                          initial={{ opacity: 0, x: 50, scale: 0.9 }}
                          animate={{
                            opacity: isFlipped ? 1 : 0,
                            x: isFlipped ? 0 : 50,
                            scale: isFlipped ? 1 : 0.9,
                          }}
                          transition={{ duration: 0.5, delay: isFlipped ? index * 0.2 + 0.7 : 0 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300 group"
                        >
                          <motion.div
                            className={`p-3 bg-gradient-to-br ${solution.color} rounded-lg shadow-lg`}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <solution.icon className="h-6 w-6 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                              {solution.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{solution.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {solution.features.map((feature, featureIndex) => (
                                <motion.div
                                  key={feature}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{
                                    opacity: isFlipped ? 1 : 0,
                                    scale: isFlipped ? 1 : 0.8,
                                  }}
                                  transition={{
                                    duration: 0.3,
                                    delay: isFlipped ? index * 0.2 + featureIndex * 0.1 + 0.9 : 0,
                                  }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="text-xs bg-white dark:bg-slate-600 hover:bg-slate-100 dark:hover:bg-slate-500 transition-colors duration-300"
                                  >
                                    {feature}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: isFlipped ? 1.2 : 0 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                      Get Started Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 bg-transparent"
                    >
                      Schedule Demo
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/">
                      <Button
                        variant="ghost"
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      >
                        Start Over
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-slate-600 dark:text-slate-300 mb-4">Want to explore all features?</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/">
              <Button
                variant="outline"
                className="border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 bg-transparent"
              >
                View All Framtt Features
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
