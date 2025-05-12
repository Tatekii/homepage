"use client"

// This component enhances Next.js Image component with automatic WebP/AVIF support
// You can drop this in as a replacement for regular next/image

import { useState, useEffect } from "react"
import Image, { ImageProps } from "next/image"
import { twMerge } from "tailwind-merge"

export interface OptimizedImageProps extends ImageProps {
	src: string
	alt: string
	width?: number
	height?: number
	className?: string
	priority?: boolean
	quality?: number
	fill?: boolean
	sizes?: string
	loading?: "eager" | "lazy"
	placeholder?: "blur" | "empty"
	blurDataURL?: string
}

export const OptimizedImage = ({
	src,
	alt,
	width,
	height,
	className,
	priority = false,
	quality = 80,
	fill = false,
	sizes,
	style,
	...props
}: OptimizedImageProps) => {
	const [imageSrc, setImageSrc] = useState<string>(src)
	const [isWebPSupported, setIsWebPSupported] = useState<boolean>(false)
	const [isAVIFSupported, setIsAVIFSupported] = useState<boolean>(false)

	// Check for WebP and AVIF support
	useEffect(() => {
		const checkImageFormatSupport = async () => {
			if (typeof window !== "undefined") {
				try {
					// Test for WebP support
					const webpData = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="

					// Test for AVIF support - using a minimal AVIF test image
					const avifData =
						"data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK"

					// WebP check
					if ("createImageBitmap" in window) {
						// Modern browsers with createImageBitmap API
						try {
							const webpBlob = await fetch(webpData).then((r) => r.blob())
							const result = await createImageBitmap(webpBlob).then(
								() => true,
								() => false
							)
							setIsWebPSupported(result)
						} catch (e) {
							setIsWebPSupported(false)
						}

						// AVIF check with createImageBitmap
						try {
							const avifBlob = await fetch(avifData).then((r) => r.blob())
							const result = await createImageBitmap(avifBlob).then(
								() => true,
								() => false
							)
							setIsAVIFSupported(result)
						} catch (e) {
							setIsAVIFSupported(false)
						}
					} else {
						// Fallback for browsers without createImageBitmap
						// WebP test
						const webpImg = document.createElement("img")
						webpImg.onload = () => setIsWebPSupported(true)
						webpImg.onerror = () => setIsWebPSupported(false)
						webpImg.src = webpData

						// AVIF test
						const avifImg = document.createElement("img")
						avifImg.onload = () => setIsAVIFSupported(true)
						avifImg.onerror = () => setIsAVIFSupported(false)
						avifImg.src = avifData
					}
				} catch (e) {
					console.warn("Image format detection failed:", e)
					setIsWebPSupported(false)
					setIsAVIFSupported(false)
				}
			}
		}

		checkImageFormatSupport()
	}, [])

	// Calculate image paths and formats
	useEffect(() => {
		if (src) {
			// Handle debug mode - if URL contains ?format=original|webp|avif
			const urlParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
			const debugFormat = urlParams.get("format")

			// Extract file path without extension
			const lastDotIndex = src.lastIndexOf(".")
			const basePath = lastDotIndex > 0 ? src.substring(0, lastDotIndex) : src
			const extension = lastDotIndex > 0 ? src.substring(lastDotIndex + 1) : ""

			// Support debug mode for testing formats
			if (debugFormat === "original") {
				setImageSrc(src)
				return
			} else if (debugFormat === "webp") {
				setImageSrc(`${basePath}.webp`)
				return
			} else if (debugFormat === "avif") {
				setImageSrc(`${basePath}.avif`)
				return
			}

			// Normal operation - use best supported format
			if (isAVIFSupported) {
				setImageSrc(`${basePath}.avif`)
			} else if (isWebPSupported) {
				setImageSrc(`${basePath}.webp`)
			} else if (extension) {
				// Use original format if modern formats not supported
				setImageSrc(src)
			} else {
				// Fallback if there's no extension
				setImageSrc(src)
			}
		}
	}, [isWebPSupported, isAVIFSupported, src])

	return (
		<div className={twMerge("relative", fill ? "w-full h-full" : "", className)}>
			<Image
				src={imageSrc}
				alt={alt}
				width={width}
				height={height}
				priority={priority}
				quality={quality}
				fill={fill}
				style={{ objectFit: "cover", ...style }}
				sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
				{...props}
			/>
		</div>
	)
}
