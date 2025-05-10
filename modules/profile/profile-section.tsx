"use client"
import { Github, Mail, Linkedin } from "lucide-react"
import { MouseTrackingDiv } from "@/components/mouse-tracking-div"
import { Button } from "@/components/ui/button"

export function ProfileSection() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-4xl md:text-5xl font-bold mb-4">
					<span className="relative">
						🧑‍💻Siyn Ma
						<span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-chart-1/50 to-chart-2/50"></span>
					</span>
					<br />
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-chart-1 to-chart-2">
						experiences that pulse
					</span>
				</h1>
				{/* <p className="text-lg text-muted-foreground">Web3</p> */}
			</div>

			<MouseTrackingDiv className="cursor-pointer">
				<Button variant="gradient" className="relative cursor-pointer" asChild>
					<a href="mailto:mrtatekii33@gmail.com">
						<Mail className="mr-2 h-4 w-4" />
						Contact
					</a>
				</Button>
			</MouseTrackingDiv>

			<div className="flex gap-4 text-muted-foreground relative">
				<a
					href="https://github.com/Tatekii"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-foreground transition-colors cursor-pointer"
				>
					<Github className="h-5 w-5" />
				</a>
				<a
					href="https://www.linkedin.com/in/%E6%80%9D%E5%BC%95-%E9%A9%AC-518a932a3/"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-foreground transition-colors cursor-pointer"
				>
					<Linkedin className="h-5 w-5" />
				</a>
			</div>
		</div>
	)
}
