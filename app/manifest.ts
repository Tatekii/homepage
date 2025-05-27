// Add these export statements to fix the static export error
export const dynamic = "force-static"

export default function manifest() {
	return {
		name: "Siyn Ma Portfolio",
		short_name: "Siyn Ma",
		description: "Full Stack Developer & Web3 Developer",
		start_url: "/",
		display: "standalone",
		background_color: "#030711",
		theme_color: "#875eff",
		// icons: [
		//   {
		//     src: '/icon-192x192.png',
		//     sizes: '192x192',
		//     type: 'image/png',
		//   },
		//   {
		//     src: '/icon-512x512.png',
		//     sizes: '512x512',
		//     type: 'image/png',
		//   },
		//   {
		//     src: '/icon-192x192-maskable.png',
		//     sizes: '192x192',
		//     type: 'image/png',
		//     purpose: 'maskable',
		//   },
		//   {
		//     src: '/icon-512x512-maskable.png',
		//     sizes: '512x512',
		//     type: 'image/png',
		//     purpose: 'maskable',
		//   },
		// ],
	}
}
