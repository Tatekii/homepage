import "./globals.css"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { VersionWatermark } from "@/components/version-watermark"

export const metadata: Metadata = {
	title: "Developer Portfolio",
	description: "Personal developer portfolio with EDM aesthetics",
}

import { SiteHeader } from "@/components/site-header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${GeistSans.className} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<div className="relative min-h-screen">
						<SiteHeader />
						<main className="pt-16">
							{children}
						</main>
						<VersionWatermark className="fixed bottom-4 right-4 pointer-events-none z-50" />
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
