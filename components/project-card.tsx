"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ExternalLink, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export interface ProjectCardProps {
	title: string
	description: string
	tech: string[]
	link?: string
	preview: string
}

export function ProjectCard({ title, description, tech, link = "", preview }: ProjectCardProps) {
	const [showFullImage, setShowFullImage] = useState(false)

	const toggleImagePreview = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setShowFullImage(!showFullImage)
	}

	return (
		<>
			<Card className="bg-card/30 backdrop-blur-sm hover:border-chart-2/50 transition-all shadow-sm hover:shadow-md hover:shadow-chart-2/20 group h-full overflow-hidden">
				{/* Preview Image - Clickable */}
				<div className="relative h-32 w-full overflow-hidden cursor-pointer">
					<Image
						src={"projects/" + preview}
						alt={`${title} preview`}
						fill
						className="object-cover transition-transform group-hover:scale-105 duration-300"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>

				{/* Card Content */}
				<CardHeader className="pb-1 pt-3 px-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-md font-semibold">{title}</CardTitle>
						{link && (
							<Link href={link} target="_blank" rel="noopener noreferrer" className="block">
								<ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
							</Link>
						)}
					</div>
					<CardDescription className="text-xs line-clamp-2">{description}</CardDescription>
				</CardHeader>

				<CardFooter className="px-3 pt-0 pb-3">
					<div className="flex flex-wrap gap-1">
						{tech.map((tech) => (
							<Badge
								key={tech}
								variant="outline"
								className="text-[10px] py-0 px-2 bg-gradient-to-r from-chart-1/10 to-chart-2/10 hover:from-chart-1/20 hover:to-chart-2/20 transition-colors"
							>
								{tech}
							</Badge>
						))}
					</div>
				</CardFooter>
			</Card>

			{/* Full Image Modal */}
			<AnimatePresence>
				{showFullImage && (
					<motion.div
						className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={toggleImagePreview}
					>
						<motion.div
							className="relative max-w-3xl w-full max-h-[80vh] bg-card/30 rounded-lg border border-chart-1/20 overflow-hidden"
							initial={{ scale: 0.9, y: 20 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.9, y: 20 }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="relative w-full h-[70vh]">
								<Image
									src={"projects/" + preview}
									alt={`${title} preview`}
									fill
									className="object-contain"
									priority
								/>
							</div>
							<div className="absolute top-3 right-3">
								<button
									className="bg-background/80 backdrop-blur-md p-2 rounded-full text-foreground hover:bg-chart-1/30 transition-colors"
									onClick={toggleImagePreview}
								>
									<X className="h-4 w-4" />
								</button>
							</div>
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent px-4 py-3">
								<h3 className="font-semibold text-white">{title}</h3>
								<p className="text-xs text-white/80">{description}</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
