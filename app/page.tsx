import Particles from "@/components/particles"
import SongEmbed from "@/components/song-embed"
import { IndexView } from "@/views/index-view"

export default function HomePage() {
	return (
		<div>
			<IndexView />
			<div className="absolute inset-0 w-full h-full opacity-60 z-[-10]">
				<Particles
					particleColors={["#ffffff", "#ffffff"]}
					particleCount={200}
					particleSpread={10}
					speed={0.1}
					particleBaseSize={100}
					moveParticlesOnHover={true}
					alphaParticles={false}
					disableRotation={false}
				/>
			</div>
			<SongEmbed />
		</div>
	)
}
