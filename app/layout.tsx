import "./globals.css"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
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
						<main className="flex-grow">{children}</main>
					</div>
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	)
}
