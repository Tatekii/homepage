import "./globals.css"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { VersionWatermark } from "@/components/version-watermark"
import Particles from "@/components/particles"

export const metadata: Metadata = {
	title: "Developer Portfolio",
	description: "Personal developer portfolio with EDM aesthetics",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${GeistSans.className} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<div className="relative min-h-screen flex flex-col">
						<ThemeToggle />
						<main className="flex-grow">{children}</main>
						<VersionWatermark />
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
