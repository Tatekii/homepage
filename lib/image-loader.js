let supportedFormats = []

export default function customImageLoader({ src, width, quality }) {
	// 对于开发环境，直接返回原始图片
	  if (process.env.NODE_ENV === 'development') {
	    return src
	  }

	// 在生产环境中，返回优化后的图片路径
	let optimizedSrc = src

	// 如果原始图片不是 WebP/AVIF，优先使用这些格式
	if (!src.endsWith(".webp") && !src.endsWith(".avif")) {
		// 提取文件扩展名前的部分
		const basePath = src.substring(0, src.lastIndexOf("."))

		// 检测浏览器支持的图片格式

		if (typeof window !== "undefined") {
			// 检测 AVIF 支持
			const avifSupported =
				document.createElement("canvas").toDataURL("image/avif").indexOf("data:image/avif") === 0

			// 检测 WebP 支持
			const webpSupported =
				document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0

			if (avifSupported) supportedFormats.push("avif")
			if (webpSupported) supportedFormats.push("webp")
		}

		if (supportedFormats.length === 0) {
			return src
		}

		for (const format of supportedFormats) {
			const optimizedPath = `${basePath}.${format}`
			try {
				// 这里可以添加文件存在检查逻辑
				// 暂时我们假设文件存在，因为在构建时会生成这些文件
				optimizedSrc = optimizedPath
				break
			} catch (e) {
				continue
			}
		}
	}

	return optimizedSrc
}
