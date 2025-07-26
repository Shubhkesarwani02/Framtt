"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  }

  const containerClasses = {
    sm: "space-x-1",
    md: "space-x-2",
    lg: "space-x-3",
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className={`flex items-center justify-center ${containerClasses[size]}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`${sizeClasses[size]} bg-blue-600 dark:bg-blue-400 rounded-full`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
      {text && (
        <motion.p
          className="mt-4 text-slate-600 dark:text-slate-300 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}
