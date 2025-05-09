"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

type Skill = {
	name: string
	icon?: string
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
	{ name: "Vue", icon: "devicon-vuejs-plain" },
	{
		name: "TypeScript",
		icon: "devicon-typescript-plain",
	},
	{
		name: "Php",
		icon: "devicon-php-plain",
	},
	{
		name: "Node",
		icon: "devicon-nodejs-plain",
	},
	{
		name: "Express",
		icon: "devicon-express-original",
	},
	{
		name: "TRPC",
		icon: "devicon-trpc-plain",
	},
	{
		name: "Tailwind CSS",
		icon: "devicon-tailwindcss-original",
	},
	{
		name: "ECharts",
		// icon: "devicon-tailwindcss-original",
	},
	{
		name: "D3",
		icon: "devicon-d3js-plain",
	},
	{
		name: "MongoDB",
		icon: "devicon-mongodb-plain",
	},
	{
		name: "PostgreSQL",
		icon: "devicon-postgresql-plain",
	},
	{
		name: "MySql",
		icon: "devicon-mysql-original",
	},
	{
		name: "Oracle",
		icon: "devicon-oracle-original",
	},
	{
		name: "Webpack",
		icon: "devicon-webpack-plain",
	},
	{
		name: "Vite",
		icon: "devicon-vitejs-plain",
	},
	{
		name: "Docker",
		icon: "devicon-docker-plain",
	},
	{
		name: "CI/CD",
		icon: "devicon-jenkins-line",
	},
	{
		name: "Jest",
		icon: "devicon-jest-plain",
	},
	{
		name: "PlayRight",
		icon: "devicon-playwright-plain",
	},
	{
		name: "Solidity",
		icon: "devicon-solidity-plain",
	},
	{
		name: "HardHat",
		icon: "devicon-hardhat-plain",
	},
	{
		name: "Ethers",
	},
]

// Named export as imported in single-page-content.tsx
export function Skills() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
			{skills.map((s) => (
				<SkillBadge skill={s} key={s.name} />
			))}
		</div>
	)
}

const SkillBadge = ({ skill }: { skill: Skill }) => {
	const [isHover, setIsHover] = useState(false)

	const enter = () => setIsHover(true)
	const leave = () => setIsHover(false)

	return (
		<Badge
			key={skill.name}
			variant="outline"
			className="justify-center py-1 bg-gradient-to-r from-chart-1/10 to-chart-2/10 hover:from-chart-1/20 hover:to-chart-2/20 transition-colors flex items-center gap-2 text-md"
			onMouseEnter={enter}
			onMouseLeave={leave}
		>
			{skill && <i className={cn(skill.icon, isHover ? "colored" : "")}></i>}
			<span className="select-none group-hover:text-chart-1 transition-colors">{skill.name}</span>
		</Badge>
	)
}
