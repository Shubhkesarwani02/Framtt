"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { ResultCard } from "@/components/result-card"
import { ThemeToggle } from "@/components/theme-toggle"

const questions = [
  {
    id: 1,
    question: "Do you currently track your fleet vehicles in real-time?",
    options: ["Yes", "No", "Partially"],
  },
  {
    id: 2,
    question: "How do you currently manage customer bookings?",
    options: ["Manual/Phone", "Basic Software", "Excel", "No System"],
  },
  {
    id: 3,
    question: "Do you send automated notifications to customers?",
    options: ["Yes", "No", "Sometimes"],
  },
  {
    id: 4,
    question: "How do you handle customer feedback and reviews?",
    options: ["Automated System", "Manual Collection", "Don't Collect", "Third-party Platform"],
  },
  {
    id: 5,
    question: "Do you analyze your business performance with reports?",
    options: ["Yes, Regularly", "Occasionally", "Rarely", "Never"],
  },
  {
    id: 6,
    question: "Do you use any existing software?",
    options: ["None", "Excel", "Custom Software", "Other SaaS"],
  },
]

const LoadingSpinner = () => (
  <motion.div
    className="flex items-center justify-center space-x-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
    />
    <motion.div
      className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
    />
    <motion.div
      className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
    />
  </motion.div>
)

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)
    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 2000)
  }

  const progress = ((currentStep + 1) / questions.length) * 100
  const currentQuestion = questions[currentStep]
  const currentAnswer = answers[currentQuestion.id]

  if (showResults) {
    return <ResultCard answers={answers} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 dark:bg-blue-400/10 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 dark:bg-purple-400/10 rounded-full"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)",
                  "linear-gradient(45deg, rgba(168, 85, 247, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
                ],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />

            <CardContent className="p-8 relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                  className="mb-4"
                >
                  <Sparkles className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto" />
                </motion.div>

                <motion.h1
                  className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Tell us about your rental business
                </motion.h1>

                <motion.div
                  className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span>
                    Step {currentStep + 1} of {questions.length}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="origin-left"
                >
                  <Progress value={progress} className="h-3 bg-slate-200 dark:bg-slate-700" />
                </motion.div>
              </div>

              {/* Loading State */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <LoadingSpinner />
                    <motion.p
                      className="mt-4 text-slate-600 dark:text-slate-300"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      Analyzing your responses...
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Question */}
              {!isLoading && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mb-8"
                  >
                    <motion.h2
                      className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {currentQuestion.question}
                    </motion.h2>

                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <motion.div
                          key={option}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + 0.2,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={() => handleAnswer(currentQuestion.id, option)}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 relative overflow-hidden group ${
                              currentAnswer === option
                                ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-lg"
                                : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={false}
                              animate={currentAnswer === option ? { opacity: 0.2 } : { opacity: 0 }}
                            />
                            <span className="relative z-10">{option}</span>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Navigation */}
              {!isLoading && (
                <motion.div
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className="flex items-center gap-2 bg-transparent border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {currentStep === questions.length - 1 ? (
                      <Button
                        onClick={handleSubmit}
                        disabled={!currentAnswer}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Submit
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        disabled={!currentAnswer}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
