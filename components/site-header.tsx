"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
	const pathname = usePathname()

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
			<div className="container mx-auto flex items-center justify-between h-16 px-4">
				<Link href="/" className="text-xl font-bold animate-spin">
					🌍
				</Link>

				<nav className="flex items-center space-x-6">
					<Link
						href="/"
						className={`hover:text-white/80 transition-colors ${
							pathname === "/" ? "text-white" : "text-white/60"
						}`}
					>
						Home
					</Link>
					<Link href="https://github.com/Tatekii/Siyn-s-Space" target="_blank" rel="noopener noreferrer" className={`hover:text-white/80`}>
						Blog
					</Link>

					<ThemeToggle className="sticky top-16"/>
				</nav>
			</div>
		</header>
	)
}
