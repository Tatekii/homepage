"use client"

import { FC, useState } from "react"
import { Music, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const SongEmbed: FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(false)

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed)
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto mb-4 px-4  hidden md:block">
			<div className="relative rounded-lg overflow-hidden bg-background/30 backdrop-blur-md border border-chart-1/30 shadow-lg shadow-chart-2/20 transition-all duration-300">
				<div className="flex items-center justify-between px-3 p-2">
					<div className="flex items-center">
						<Music className="h-4 w-4 mr-2 text-chart-1" />
						<span className="text-xs font-medium text-foreground/80">Now Playing</span>
					</div>
					<button
						onClick={toggleCollapse}
						className={cn(
							"p-1 rounded-full hover:bg-chart-1/20 transition-all",
							isCollapsed ? "" : "rotate-180"
						)}
						aria-label={isCollapsed ? "Expand music player" : "Collapse music player"}
					>
						<ChevronUp className={"h-4 w-4 text-chart-1"} />
					</button>
				</div>

				<div className={`transition-all duration-300 origin-top ${isCollapsed ? "h-0" : "h-full"}`}>
					<iframe
						width="100%"
						height="110"
						scrolling="no"
						frameBorder="no"
						src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1197076855&color=%236f6584&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
					></iframe>
					<div
						style={{
							fontSize: "10px",
							color: "#cccccc",
							lineBreak: "anywhere",
							wordBreak: "normal",
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							fontFamily:
								"Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
							fontWeight: 100,
						}}
					>
						<a
							href="https://soundcloud.com/thechainsmokers"
							title="The Chainsmokers"
							target="_blank"
							style={{ color: "#cccccc", textDecoration: "none" }}
							rel="noopener noreferrer"
						>
							The Chainsmokers
						</a>{" "}
						·{" "}
						<a
							href="https://soundcloud.com/thechainsmokers/meet-me-at-our-spot-remix"
							title="Meet Me At Our Spot (Remix)"
							target="_blank"
							style={{ color: "#cccccc", textDecoration: "none" }}
							rel="noopener noreferrer"
						>
							Meet Me At Our Spot (Remix)
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SongEmbed
