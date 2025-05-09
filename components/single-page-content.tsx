"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Mail, Linkedin, ExternalLink, Music } from "lucide-react"

const skills = [
	"React",
	"Next.js",
	"TypeScript",
	"Node.js",
	"GraphQL",
	"Tailwind CSS",
	"PostgreSQL",
	"AWS",
	"Docker",
	"CI/CD",
]

const projects = [
	{
		title: "Project Pulse",
		description: "Real-time analytics dashboard",
		tech: ["React", "Node.js", "WebSocket"],
		link: "#",
	},
	{
		title: "DevFlow",
		description: "Developer workflow automation",
		tech: ["TypeScript", "GraphQL", "Docker"],
		link: "#",
	},
]

export function SinglePageContent() {
	const [activeSection, setActiveSection] = useState("about")

	// Mouse movement effect
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)

	const springConfig = { damping: 25, stiffness: 700 }
	const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig)
	const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-10, 10]), springConfig)

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			const { clientX, clientY } = event
			const { innerWidth, innerHeight } = window
			const x = clientX - innerWidth / 2
			const y = clientY - innerHeight / 2

			mouseX.set(x)
			mouseY.set(y)
		}

		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [mouseX, mouseY])

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-6xl">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					{/* Left Column - Main Info */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-6"
					>
						<div>
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="text-4xl md:text-5xl font-bold mb-4"
							>
								<span className="relative">
									Building digital
									<span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-chart-1/50 to-chart-2/50"></span>
								</span>
								<br />
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-chart-1 to-chart-2">
									experiences that pulse
								</span>
							</motion.h1>
							<p className="text-lg text-muted-foreground">
								Full-Stack Developer specializing in creating immersive web applications
							</p>
						</div>

						<div className="flex gap-4">
							<Button variant="default" className="bg-gradient-to-r from-chart-1 to-chart-2" asChild>
								<a href="mailto:mrtatekii33@gmail.com">
									<Mail className="mr-2 h-4 w-4" />
									Contact
								</a>
							</Button>
							{/* <Button variant="outline" className="gap-2" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Resume
                </a>
              </Button> */}
						</div>

						<div className="flex gap-4 text-muted-foreground">
							<a
								href="https://github.com/Tatekii"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-foreground transition-colors"
							>
								<Github className="h-5 w-5" />
							</a>
							<a
								href="https://www.linkedin.com/in/%E6%80%9D%E5%BC%95-%E9%A9%AC-518a932a3/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-foreground transition-colors"
							>
								<Linkedin className="h-5 w-5" />
							</a>
						</div>
					</motion.div>

					{/* Right Column - Dynamic Content */}
					<motion.div
						style={{
							rotateX,
							rotateY,
							transformStyle: "preserve-3d",
							perspective: 1000,
						}}
						className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50"
					>
						<div className="flex gap-2 mb-6">
							{["about", "skills", "projects"].map((section) => (
								<Button
									key={section}
									variant={activeSection === section ? "default" : "outline"}
									size="sm"
									onClick={() => setActiveSection(section)}
									className={
										activeSection === section ? "bg-gradient-to-r from-chart-1 to-chart-2" : ""
									}
								>
									{section.charAt(0).toUpperCase() + section.slice(1)}
								</Button>
							))}
						</div>

						<motion.div
							className="h-[400px] overflow-y-auto custom-scrollbar"
							style={{ transform: "translateZ(20px)" }}
						>
							{activeSection === "about" && (
								<div className="space-y-4">
									<p>
										I&#39;m a passionate full-stack developer with 8+ years of experience crafting
										digital solutions that combine technical excellence with beautiful design.
									</p>
									<p>
										My approach blends creative problem-solving with deep technical expertise to
										build scalable, user-centered applications that deliver exceptional experiences.
									</p>
									<p>
										I specialize in modern JavaScript frameworks, cloud architecture, and building
										high-performance applications that scale.
									</p>
								</div>
							)}

							{activeSection === "skills" && (
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
									{skills.map((skill) => (
										<Badge
											key={skill}
											variant="outline"
											className="justify-center bg-primary/5 hover:bg-primary/10"
										>
											{skill}
										</Badge>
									))}
								</div>
							)}

							{activeSection === "projects" && (
								<div className="space-y-4">
									{projects.map((project) => (
										<div
											key={project.title}
											className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-chart-2/50 transition-colors"
										>
											<h3 className="text-lg font-semibold mb-2">{project.title}</h3>
											<p className="text-muted-foreground mb-3">{project.description}</p>
											<div className="flex flex-wrap gap-2">
												{project.tech.map((tech) => (
													<Badge key={tech} variant="outline" className="bg-primary/5">
														{tech}
													</Badge>
												))}
											</div>
										</div>
									))}
								</div>
							)}
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
