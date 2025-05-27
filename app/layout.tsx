import "./globals.css"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { VersionWatermark } from "@/components/version-watermark"
import Script from "next/script"
import SchemaOrg from "@/components/schema-org"
import CustomHead from "@/components/custom-head"

export const metadata: Metadata = {
	title: "Siyn Ma | Full Stack Developer & Web3 Developer",
	description: "Experienced full-stack developer with 5+ years specializing in React, TypeScript, and Web3. Based in Shenzhen, creating high-performance web applications.",
	keywords: "Siyn Ma, Web Developer, Full Stack Developer, React, TypeScript, Web3, Blockchain, Solidity, Frontend Developer, Shenzhen",
	creator: "Siyn Ma",
	icons: {
		icon: "/favicon.png",
		shortcut: "/favicon.png",
		apple: "/favicon.png",
	},
}

import { SiteHeader } from "@/components/site-header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="canonical" href="https://siynspace.netlify.app" />
				<CustomHead />
				<Script
					src="https://cloud.umami.is/script.js"
					data-website-id="1d8506da-303e-4cfa-9a39-03a251ff8d45"
					strategy="afterInteractive"
				/>
			</head>
			<body className={`${GeistSans.className} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<div className="relative min-h-screen">
						<SchemaOrg />
						<SiteHeader />
						<main className="pt-16" id="main-content">{children}</main>
						<footer className="py-8 mt-16 border-t border-border/40">
							<div className="container mx-auto px-4">
								<div className="flex flex-col md:flex-row justify-between items-center">
									<p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Siyn Ma. All rights reserved.</p>
									<div className="flex items-center mt-4 md:mt-0">
										<ThemeToggle />
									</div>
								</div>
							</div>
						</footer>
						<VersionWatermark className="fixed bottom-4 right-4 pointer-events-none z-50" />
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
