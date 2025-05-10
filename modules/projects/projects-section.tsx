"use client"

import { ProjectCard } from "@/modules/projects/project-card"
import { ProjectData } from "./types"

const projects: ProjectData[] = [
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
		sourceCode: "https://github.com/Tatekii/jiratata",
		link: "https://jiratata.vercel.app",
	},
]

export function ProjectsSection() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
			{projects.map((project) => (
				<ProjectCard key={project.title} {...project} />
			))}
		</div>
	)
}

export { projects }
