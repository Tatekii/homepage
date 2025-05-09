"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Mail, Linkedin, ExternalLink, Music } from "lucide-react"
import { ProjectCard, ProjectCardProps } from "@/components/project-card"
import { Skills } from "@/components/skills"

const projects: ProjectCardProps[] = [
	{
		title: "xx规则引擎",
		description: "信贷规则及管理编辑前端，可视化规则编辑",
		tech: ["React", "Antv", "Antd", "Jotai"],
		preview: "rule-engine-sample.png",
	},
	{
		title: "jira克隆",
		description: "全栈项目管理工具，包含看板/日历/工作区/成员管理",
		tech: ["Next", "AppWrite", "Hono", "Jotai"],
		preview: "jiratata.png",
		link: "https://jiratata.vercel.app",
	},
]

export function SinglePageContent() {
	const [activeSection, setActiveSection] = useState("about")

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
										🧑‍💻Siyn Ma
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
							<Button
								variant="default"
								className="bg-gradient-to-r from-chart-1 to-chart-2 relative z-10 cursor-pointer"
								asChild
							>
								<a href="mailto:mrtatekii33@gmail.com">
									<Mail className="mr-2 h-4 w-4" />
									Contact
								</a>
							</Button>
						</div>

						<div className="flex gap-4 text-muted-foreground relative z-10">
							<a
								href="https://github.com/Tatekii"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-foreground transition-colors cursor-pointer"
							>
								<Github className="h-5 w-5" />
							</a>
							<a
								href="https://www.linkedin.com/in/%E6%80%9D%E5%BC%95-%E9%A9%AC-518a932a3/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-foreground transition-colors cursor-pointer"
							>
								<Linkedin className="h-5 w-5" />
							</a>
						</div>
					</motion.div>

					{/* Right Column - Dynamic Content */}
					<div>
						<div className="flex gap-2 mb-6">
							{["about", "skills", "projects"].map((section) => (
								<Button
									key={section}
									size="sm"
									onClick={() => setActiveSection(section)}
									className={`relative z-50 ${activeSection === section ? "bg-gradient-to-r from-chart-1 to-chart-2" : ""}`}
								>
									{section.charAt(0).toUpperCase() + section.slice(1)}
								</Button>
							))}
						</div>

						<div className="h-[400px] overflow-y-auto custom-scrollbar">
							{activeSection === "about" && (
								<div className="space-y-4">
									<p>
										I&#39;m a passionate full-stack developer with 5+ years of experience crafting
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

									<p>
										Currently in 🏙️
										<span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-chart-1 to-chart-2 text-lg">
											ShenZhen
										</span>
										, interested in EDM, Movie, Hiking and photograph, Feel free to reach out if you
										just want to hang out or chat.
									</p>
								</div>
							)}

							{activeSection === "skills" && <Skills />}

							{activeSection === "projects" && (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
									{projects.map((project) => (
										<ProjectCard key={project.title} {...project} />
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
