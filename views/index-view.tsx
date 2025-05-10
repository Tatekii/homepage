"use client"

import { Button } from "@/components/ui/button"
import { AboutSection } from "@/modules/about/about-section"
import { ProfileSection } from "@/modules/profile/profile-section"
import { ProjectsSection } from "@/modules/projects/projects-section"
import { SkillsSection } from "@/modules/skills/skills-section"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type SectionType = "about" | "skills" | "projects"

export function IndexView() {
	const [activeSection, setActiveSection] = useState<SectionType>("about")

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-6xl">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					{/* Left Column - Main Info */}
					<ProfileSection />

					{/* Right Column - Dynamic Content */}
					<div>
						<div className="flex gap-2 mb-6">
							{["about", "skills", "projects"].map((section) => (
								<Button
									key={section}
									size="sm"
									variant={activeSection === section ? "gradient" : "outline"}
									onClick={() => setActiveSection(section as SectionType)}
									className="relative"
								>
									<motion.span 
										animate={{ scale: activeSection === section ? [1, 1.05, 1] : 1 }}
										transition={{ duration: 0.3 }}
									>
										{section.charAt(0).toUpperCase() + section.slice(1)}
									</motion.span>
									{activeSection === section && (
										<motion.div 
											layoutId="activeTab"
											className="absolute inset-0 rounded-md z-[-1]"
											transition={{ duration: 0.3 }}
										/>
									)}
								</Button>
							))}
						</div>

						<div className="h-[400px] overflow-hidden relative">
							<AnimatePresence mode="wait">
								<motion.div 
									key={activeSection}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.2, ease: "easeInOut" }}
									className="absolute inset-0 overflow-y-auto custom-scrollbar"
								>
									{activeSection === "about" && <AboutSection />}
									{activeSection === "skills" && <SkillsSection />}
									{activeSection === "projects" && <ProjectsSection />}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
