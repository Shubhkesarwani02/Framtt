"use client"

import { motion, useScroll, useTransform, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BarChart3, MessageSquare, Truck, Zap, Globe, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

const features = [
	{
		title: "Realtime Booking & Revenue Dashboard",
		description:
			"Track all bookings and revenue streams in real-time with customizable dashboards and reports.",
		icon: BarChart3,
		color: "from-blue-500 to-cyan-500",
	},
	{
		title: "Live Vehicle Status & Fuel Tracking",
		description:
			"Monitor your entire fleet with GPS tracking, maintenance alerts, and fuel consumption analytics.",
		icon: Truck,
		color: "from-green-500 to-emerald-500",
	},
	{
		title: "Centralized Customer Messaging",
		description:
			"Communicate with customers through a unified platform with automated notifications and feedback collection.",
		icon: MessageSquare,
		color: "from-purple-500 to-violet-500",
	},
	{
		title: "AI-Powered Campaign Builder",
		description:
			"Create targeted marketing campaigns with AI-driven insights to maximize ROI and customer acquisition.",
		icon: Zap,
		color: "from-yellow-500 to-orange-500",
	},
	{
		title: "Website & API Integrations",
		description:
			"Seamlessly connect your website and other business tools with our robust API for automated workflows.",
		icon: Globe,
		color: "from-indigo-500 to-blue-500",
	},
	{
		title: "Advanced Analytics & Reporting",
		description:
			"Make data-driven decisions with comprehensive analytics and customizable reports on all aspects of your business.",
		icon: TrendingUp,
		color: "from-pink-500 to-rose-500",
	},
]

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.9 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: easeOut,
		},
	},
}

const textVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const letterVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
}

const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
	const words = text.split(" ")

	return (
		<motion.div
			variants={textVariants}
			initial="hidden"
			animate="visible"
			className={className}
		>
			{words.map((word, wordIndex) => (
				<span key={wordIndex} className="inline-block mr-2">
					{word.split("").map((letter, letterIndex) => (
						<motion.span
							key={letterIndex}
							variants={letterVariants}
							className="inline-block"
						>
							{letter}
						</motion.span>
					))}
				</span>
			))}
		</motion.div>
	)
}

import { useEffect, useState } from "react"

const FloatingParticles = () => {
	const [positions, setPositions] = useState<{ x: number; y: number }[]>([])

	useEffect(() => {
		if (typeof window !== "undefined") {
			setPositions(
				Array.from({ length: 20 }, () => ({
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight,
				}))
			)
		}
	}, [])

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{positions.map((pos, i) => (
				<motion.div
					key={i}
					className="absolute w-2 h-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-full"
					initial={{ x: pos.x, y: pos.y }}
					animate={{
						x:
							typeof window !== "undefined"
								? Math.random() * window.innerWidth
								: pos.x,
						y:
							typeof window !== "undefined"
								? Math.random() * window.innerHeight
								: pos.y,
					}}
					transition={{
						duration: Math.random() * 10 + 10,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "linear",
					}}
				/>
			))}
		</div>
	)
}

export default function HomePage() {
	const containerRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	})

	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
	const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

	return (
		<div
			ref={containerRef}
			className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 relative overflow-hidden"
		>
			<FloatingParticles />

			{/* Hero Section */}
			<motion.section className="container mx-auto px-4 py-20 text-center relative z-10" style={{ y, opacity }}>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: "easeOut" }}
					className="max-w-4xl mx-auto"
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
						className="mb-6"
					>
						<Sparkles className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
					</motion.div>

					<AnimatedText
						text="Discover the Right Tools for Your Rental Business"
						className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-6 leading-tight"
					/>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}
						className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto"
					>
						Answer a few questions and get a personalized solution for your fleet
						operations.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 1.2, type: "spring", stiffness: 200 }}
						whileHover={{
							scale: 1.05,
							boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
						}}
						whileTap={{ scale: 0.95 }}
					>
						<Link href="/questionnaire">
							<Button
								size="lg"
								className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
							>
								Get Started
								<motion.div
									className="ml-2"
									animate={{ x: [0, 5, 0] }}
									transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
								>
									<ArrowRight className="h-5 w-5" />
								</motion.div>
							</Button>
						</Link>
					</motion.div>
				</motion.div>
			</motion.section>

			{/* Features Section */}
			<section className="container mx-auto px-4 py-20 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true, margin: "-100px" }}
					className="text-center mb-16"
				>
					<motion.h2
						className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4"
						whileInView={{ scale: [0.9, 1.05, 1] }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						All Framtt Features
					</motion.h2>
					<motion.p
						className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					>
						Explore our complete suite of tools designed for rental businesses
					</motion.p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							whileHover={{
								y: -10,
								transition: { duration: 0.3 },
							}}
						>
							<Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm group overflow-hidden relative">
								<motion.div
									className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
								/>
								<CardContent className="p-8 relative z-10">
									<motion.div
										className="flex items-center mb-4"
										whileHover={{ scale: 1.1 }}
										transition={{ duration: 0.3 }}
									>
										<div
											className={`p-3 bg-gradient-to-br ${feature.color} rounded-lg mr-4 shadow-lg`}
										>
											<feature.icon className="h-6 w-6 text-white" />
										</div>
									</motion.div>
									<h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
										{feature.title}
									</h3>
									<p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
										{feature.description}
									</p>
									<motion.div
										whileHover={{ x: 5 }}
										transition={{ duration: 0.3 }}
									>
										<Button
											variant="outline"
											className="border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 bg-transparent group"
										>
											See in Action
											<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
										</Button>
									</motion.div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</section>

			{/* CTA Section */}
			<section className="bg-slate-100 dark:bg-slate-800 py-20 relative overflow-hidden">
				<motion.div
					className="absolute inset-0"
					animate={{
						background: [
							"radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
							"radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
							"radial-gradient(circle at 40% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
						],
					}}
					transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
				/>

				<div className="container mx-auto px-4 text-center relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="max-w-4xl mx-auto"
					>
						<motion.h2
							className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-8"
							whileInView={{
								scale: [1, 1.02, 1],
								textShadow: [
									"0 0 0px rgba(59, 130, 246, 0)",
									"0 0 20px rgba(59, 130, 246, 0.3)",
									"0 0 0px rgba(59, 130, 246, 0)",
								],
							}}
							transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
							viewport={{ once: true }}
						>
							Start Modernizing Your Rental Business Today
						</motion.h2>

						<motion.div
							className="flex flex-col sm:flex-row gap-4 justify-center items-center"
							variants={containerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							<motion.div
								variants={itemVariants}
								whileHover={{
									scale: 1.05,
									boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
								}}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									size="lg"
									className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
								>
									Access Dashboard
								</Button>
							</motion.div>

							<motion.div
								variants={itemVariants}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									size="lg"
									variant="outline"
									className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-transparent"
								>
									Book a Demo
								</Button>
							</motion.div>

							<motion.div
								variants={itemVariants}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link href="/questionnaire">
									<Button
										size="lg"
										variant="ghost"
										className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 px-8 py-4 text-lg font-semibold transition-all duration-300"
									>
										Restart Demo Flow
									</Button>
								</Link>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</section>
		</div>
	)
}
