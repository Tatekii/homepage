import Particles from "@/components/particles"
import { SinglePageContent } from "@/views/single-page-content"
import SongEmbed from "@/components/song-embed"

export default function HomePage() {
	return (
		<div>
			<div className="absolute inset-0 w-full h-full opacity-60">
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
			<SinglePageContent />
			<SongEmbed />
		</div>
	)
}
