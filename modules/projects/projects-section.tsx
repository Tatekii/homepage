"use client"

import { ProjectCard } from "@/modules/projects/project-card"
import { ProjectData } from "./types"

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
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
			{projects.map((project) => (
				<ProjectCard key={project.title} {...project} />
			))}
		</div>
	)
}

export { projects }
