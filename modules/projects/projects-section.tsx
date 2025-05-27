"use client"

import { useState } from "react"
import { ProjectCard } from "@/modules/projects/project-card"

import { ProjectData } from "@/modules/projects/types"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog"
import Link from "next/link"

const projects: ProjectData[] = [
	{
		title: "MemeCoin众筹",
		description: "全栈meme币交易平台",
		tech: ["Solidity", "Hardhat", "Next", "Wagmi"],
		preview: "meme.png",
		sourceCode: "https://github.com/Tatekii/fun-pump",
	},
	{
		title: "jira克隆",
		description: "全栈项目管理工具，包含看板/日历/工作区/成员管理",
		tech: ["Next", "AppWrite", "Hono", "Jotai"],
		preview: "jiratata.png",
		sourceCode: "https://github.com/Tatekii/jiratata",
		link: "https://jiratata.vercel.app",
	},
	{
		title: "youtube克隆",
		description: "全栈视频分享平台，还原所有yt基础功能",
		tech: ["Next", "Mux", "TRpc", "Redis", "Drizzle"],
		preview: "bigtube.png",
		sourceCode: "https://github.com/Tatekii/big-tube",
	},
	{
		title: "xxGIS平台",
		description: "地理信息可视化管理平台",
		tech: ["Vue", "Mapbox", "Element", "Vuex"],
		preview: "gis.jpg",
	},
	{
		title: "xx规则引擎",
		description: "信贷规则及管理编辑前端，可视化规则编辑",
		tech: ["React", "Antv", "Antd", "Jotai"],
		preview: "rule-engine-sample.png",
	},
	{
		title: "xx低代码平台",
		description: "动态页面，动态路由，动态表单",
		tech: ["React", "Antd", "Redux", "ECharts"],
		preview: "lowcode.jpg",
	},
	{
		title: "在线购物网站",
		description: "",
		tech: ["React", "ChakraUI", "Formik", "Firebase"],
		preview: "shopping.png",
		link: "someclothing.netlify.app",
		sourceCode: "https://github.com/Tatekii/online-clothing",
	},
]

export function ProjectsSection() {
	const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
	const [open, setOpen] = useState(false)

	const handleShowPreview = (project: ProjectData) => {
		setSelectedProject(project)
		setOpen(true)
	}

	return (
		<section id="projects">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{projects.map((project) => (
					<ProjectCard key={project.title} {...project} onShowPreview={handleShowPreview} />
				))}
			</div>

			{/* Project Preview Modal */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-3xl p-0 overflow-hidden">
					{selectedProject && (
						<>
							<div className="relative w-full h-[60vh]">
								<Image
									src={`projects/${selectedProject.preview}`}
									alt={`${selectedProject.title} - Full project view by Siyn Ma`}
									fill
									className="object-contain"
									priority
									sizes="(max-width: 768px) 100vw, 1200px"
								/>
							</div>
							<div className="bg-gradient-to-t from-background/80 to-transparent px-4 py-3">
								<DialogTitle className="font-semibold text-white">{selectedProject.title}</DialogTitle>
								<DialogDescription className="text-xs text-white/80">
									{selectedProject.description}
								</DialogDescription>
								<div className="flex gap-3 mt-2">
									{selectedProject.link && (
										<Link
											href={selectedProject.link}
											target="_blank"
											rel="noopener noreferrer"
											className="text-xs text-blue-400 hover:underline flex items-center gap-1"
										>
											<ExternalLink size={12} /> Visit Site
										</Link>
									)}
									{selectedProject.sourceCode && (
										<Link
											href={selectedProject.sourceCode}
											target="_blank"
											rel="noopener noreferrer"
											className="text-xs text-blue-400 hover:underline flex items-center gap-1"
										>
											<ExternalLink size={12} /> Source Code
										</Link>
									)}
								</div>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</section>
	)
}
