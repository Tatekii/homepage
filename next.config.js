/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		// 完全禁用 Next.js 图像优化
		unoptimized: true,
		disableStaticImages: true, // 禁用静态图像导入优化
		loader: "custom",
		loaderFile: "./lib/image-loader.js",
	},

	compiler: {
		removeConsole:
			process.env.NODE_ENV === "production"
				? {
						exclude: ["error", "warn"],
				  }
				: false,
	},

	// Additional optimizations
	poweredByHeader: false,
	reactStrictMode: true,
	compress: true,
}

module.exports = nextConfig
