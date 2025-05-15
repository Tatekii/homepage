import "./globals.css"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { VersionWatermark } from "@/components/version-watermark"
import Script from "next/script"

export const metadata: Metadata = {
	title: "Siyn's Space",
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
				<Script
					src="https://cloud.umami.is/script.js"
					data-website-id="1d8506da-303e-4cfa-9a39-03a251ff8d45"
					strategy="afterInteractive"
				/>
			</head>
			<body className={`${GeistSans.className} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<div className="relative min-h-screen">
						<SiteHeader />
						<main className="pt-16">{children}</main>
						<VersionWatermark className="fixed bottom-4 right-4 pointer-events-none z-50" />
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
