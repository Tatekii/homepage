"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"

type Skill = {
	name: string
	icon: string
}

const skills: Skill[] = [
	{
		name: "React",
		icon: "devicon-react-original",
	},
	{
		name: "Next",
		icon: "devicon-nextjs-original-wordmark",
	},
	{
		name: "TypeScript",
		icon: "devicon-typescript-plain",
	},
	{
		name: "Node",
		icon: "devicon-nodejs-plain",
	},
	{
		name: "Tailwind CSS",
		icon: "devicon-tailwindcss-original",
	},
	{
		name: "PostgreSQL",
		icon: "devicon-postgresql-plain",
	},
	{
		name: "Docker",
		icon: "devicon-docker-plain",
	},
	{
		name: "CI/CD",
		icon: "devicon-jenkins-line",
	},
]

// Named export as imported in single-page-content.tsx
export function Skills() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
			{skills.map((skill) => (
				<Badge
					key={skill.name}
					variant="outline"
					className="group justify-center py-2 bg-gradient-to-r from-chart-1/10 to-chart-2/10 hover:from-chart-1/20 hover:to-chart-2/20 transition-colors flex items-center gap-2 text-md"
				>
					{skill && <i className={cn(skill.icon, "group-hover:colored transition-all")}></i>}
					<span className="group-hover:text-chart-1 transition-colors">{skill.name}</span>
				</Badge>
			))}
		</div>
	)
}
