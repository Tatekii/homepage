import { MetadataRoute } from "next"
// Add these export statements to fix the static export error
export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: "https://siynspace.netlify.app/sitemap.xml", // 实际部署域名
	}
}
