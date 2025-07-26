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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-12 relative overflow-hidden sm:px-4 md:px-8">
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
            className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 sm:text-3xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Your Personalized Solution
          </motion.h1>
          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300 sm:text-lg md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Based on your answers, here are our recommendations
          </motion.p>
        </motion.div>
        {/* Card flip container using CSS classes for 3D flip */}
        <div className="card-flip-container mx-auto w-full h-[500px] sm:h-[400px] md:h-[600px]">
          <div
            className={`card-flip-inner cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={handleFlip}
          >
            {/* Front of card */}
            <div className="card-flip-front">
              <Card className="w-full h-full shadow-2xl border-0 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 overflow-hidden">
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
                    className="text-3xl font-bold mb-4 sm:text-2xl md:text-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Perfect Match Found!
                  </motion.h2>
                  <motion.p
                    className="text-xl mb-8 opacity-90 sm:text-lg md:text-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    We've analyzed your needs and found the ideal solutions for your rental business
                  </motion.p>
                  <motion.div
                    className="flex items-center gap-2 text-lg sm:text-base md:text-xl"
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
            </div>
            {/* Back of card */}
            <div className="absolute w-full h-full backface-hidden card-flip-back">
              <Card className="w-full h-full shadow-2xl border-0 bg-gray-900 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-900/40"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(30, 41, 59, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)",
                      "linear-gradient(45deg, rgba(30, 58, 138, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />
                <CardContent className="p-8 h-full relative z-10">
                  <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: isFlipped ? 0.3 : 0 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">Recommended Solutions</h2>
                    <p className="text-gray-300">Tailored specifically for your business needs</p>
                  </motion.div>
                  <div className="space-y-4 overflow-y-auto max-h-[350px] pr-2">
                    {recommendedSolutions.map((solutionKey, index) => {
                      const solution = solutions[solutionKey as keyof typeof solutions];
                      return (
                        <motion.div
                          key={solutionKey}
                          className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: isFlipped ? 1 : 0, 
                            y: isFlipped ? 0 : 20 
                          }}
                          transition={{ duration: 0.5, delay: isFlipped ? 0.4 + (index * 0.2) : 0 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="p-5">
                            <div className="flex items-center gap-4 mb-3">
                              <div className={`p-3 bg-gradient-to-br ${solution.color} rounded-lg shadow-lg shrink-0`}>
                                <solution.icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-white">{solution.title}</h3>
                                <p className="text-gray-300 text-sm">{solution.description}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-3 mb-3">
                              {solution.features.map((feature) => (
                                <Badge 
                                  key={feature}
                                  variant="outline" 
                                  className="bg-slate-700/50 text-gray-300 border-slate-600/50"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            
                            {solutionKey === "tracking" && (
                              <Link 
                                href="/features/live-tracking" 
                                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mt-2"
                              >
                                Learn more about Live Tracking <ArrowRight className="h-3 w-3 ml-1" />
                              </Link>
                            )}
                            {solutionKey === "marketing" && (
                              <Link 
                                href="/features/ai-marketing" 
                                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mt-2"
                              >
                                Explore AI Marketing <ArrowRight className="h-3 w-3 ml-1" />
                              </Link>
                            )}
                            {solutionKey === "booking" && (
                              <Link 
                                href="/features/booking-dashboard" 
                                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mt-2"
                              >
                                Discover the Booking Dashboard <ArrowRight className="h-3 w-3 ml-1" />
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-slate-600 dark:text-slate-300 mb-4 sm:text-sm md:text-lg">Want to explore all features?</p>
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
