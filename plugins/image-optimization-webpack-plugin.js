/**
 * Image Optimization Webpack Plugin
 *
 * This plugin optimizes images during webpack build by:
 * 1. Converting images to WebP and AVIF formats
 * 2. Generating responsive sizes (optional)
 * 3. Preserving original images for compatibility
 */

const sharp = require("sharp")
const fs = require("fs")
const path = require("path")
const { glob } = require("glob")

// Track if plugin has already run to avoid duplicate processing
let hasRun = false

class ImageOptimizationWebpackPlugin {
	constructor(options = {}) {
		// Default options
		this.options = {
			inputDir: "public",
			outputDir: options.devMode ? "public" : "out",
			debug: options.debug || false, // Enable debug logging
			quality: {
				webp: 80, // WebP quality (0-100)
				avif: 65, // AVIF quality (0-100)
				jpg: 85, // JPEG quality
			},
			formats: ["webp", "avif"],
			generateResponsiveSizes: options.generateResponsive || false,
			sizes: {
				sm: { width: 640 },
				md: { width: 1024 },
				lg: { width: 1920 },
			},
			includeDirs: ["projects"],
			skipResponsiveSizeThreshold: 30, // KB
			processingOptions: {
				webp: {
					quality: 80,
					lossless: false,
					effort: 4,
				},
				avif: {
					quality: 65,
					lossless: false,
					effort: 5,
				},
				jpeg: {
					quality: 85,
					progressive: true,
					mozjpeg: true,
				},
				png: {
					compressionLevel: 9,
					palette: true,
				},
			},
			...options,
		}

		// Override output directory if in dev mode
		if (this.options.devMode) {
			this.options.outputDir = "public"
		}

		this.results = []
	}

	apply(compiler) {
		// Reset hasRun flag when webpack is done
		compiler.hooks.done.tap("ImageOptimizationWebpackPlugin", (stats) => {
			// This will run after all compilations are done
			if (stats.hasErrors()) {
				console.log("❌ Build had errors, not resetting image optimization flag")
			} else if (process.env.NODE_ENV === "development") {
				// In development mode, reset the flag after each successful build
				// so that the plugin will run again on the next rebuild
				hasRun = false
				console.log("🔄 Image optimization flag reset for next build")
			}
		})

		// Hook into the "afterEmit" lifecycle hook
		compiler.hooks.afterEmit.tapAsync("ImageOptimizationWebpackPlugin", async (compilation, callback) => {
			// Skip if plugin has already run in this build process
			if (hasRun) {
				console.log("🔄 Image optimization already ran during this build. Skipping...")
				callback()
				return
			}

			// Skip image optimization if SKIP_IMAGE_OPTIMIZATION is set
			if (process.env.SKIP_IMAGE_OPTIMIZATION === "true") {
				console.log("\n🖼️  Image optimization skipped (SKIP_IMAGE_OPTIMIZATION=true)")
				callback()
				return
			}

			try {
				// Set the flag to indicate the plugin has run
				hasRun = true

				const startTime = Date.now()
				console.log("\n🖼️  Starting image optimization...")

				// Log operating mode
				if (this.options.devMode) {
					console.log("🛠️  Running in DEVELOPMENT mode")
					console.log(`📂  Writing optimized images to ${this.options.outputDir} directory`)
				} else {
					console.log("🏗️  Running in BUILD mode")
					console.log(`📂  Writing optimized images to ${this.options.outputDir} directory`)
				}

				// Add debug information about compilation context if debug enabled
				if (this.options.debug) {
					console.log("\n🐛 DEBUG: Image Optimization Plugin")
					console.log("-------------------------------------")
					console.log(`Plugin instance ID: ${Math.random().toString(36).substring(2, 10)}`)
					console.log(`Current working directory: ${process.cwd()}`)
					console.log(`Next.js environment: ${process.env.NODE_ENV}`)
					console.log(`Compilation name: ${compilation.name}`)
					console.log(`Options: ${JSON.stringify(this.options, null, 2)}`)
					console.log("-------------------------------------\n")
				}

				// Ensure output directory exists
				this.ensureDirectoryExists(this.options.outputDir)

				// Create subdirectories for included directories
				for (const dir of this.options.includeDirs) {
					const outputSubdir = path.join(this.options.outputDir, dir)
					this.ensureDirectoryExists(outputSubdir)
				}

				console.log("🔍 Scanning for images...")

				// Find all images to process
				let imagePaths = []

				// Process only specific directories if specified
				if (this.options.includeDirs && this.options.includeDirs.length > 0) {
					for (const dir of this.options.includeDirs) {
						const dirImages = await glob(`${this.options.inputDir}/${dir}/**/*.{jpg,jpeg,png,gif}`)
						imagePaths = [...imagePaths, ...dirImages]
					}
				} else {
					// Process all images in input directory
					imagePaths = await glob(`${this.options.inputDir}/**/*.{jpg,jpeg,png,gif}`)
				}

				console.log(`Found ${imagePaths.length} images to process`)

				// Counter for processed images
				let processed = 0
				let skipped = 0
				let errors = 0

				// Process each image
				for (const imagePath of imagePaths) {
					// Get relative path (to maintain directory structure)
					const relativePath = imagePath.substring(this.options.inputDir.length + 1)
					const pathInfo = path.parse(relativePath)

					try {
						// Load image
						const image = sharp(imagePath)
						const metadata = await image.metadata()

						// Create the directory in output folder if it doesn't exist
						const outputDirectory = path.join(this.options.outputDir, pathInfo.dir)
						this.ensureDirectoryExists(outputDirectory)

						// Copy original file to output directory
						const outputOriginalPath = path.join(this.options.outputDir, relativePath)

						// Process in specified output formats
						for (const format of this.options.formats) {
							// Configure output options based on format
							let outputOptions = {}
							if (format === "webp") {
								outputOptions = this.options.processingOptions.webp
							} else if (format === "avif") {
								outputOptions = this.options.processingOptions.avif
							} else if (format === "jpeg" || format === "jpg") {
								outputOptions = this.options.processingOptions.jpeg
							} else if (format === "png") {
								outputOptions = this.options.processingOptions.png
							}

							// Generate the optimized image at original size
							const outputPath = path.join(outputDirectory, `${pathInfo.name}.${format}`)
							await image.toFormat(format, outputOptions).toFile(outputPath)

							// In build mode (not dev mode), copy originals to output folder for compatibility
							if (!this.options.devMode && !fs.existsSync(outputOriginalPath)) {
								fs.copyFileSync(imagePath, outputOriginalPath)
							}

							// Generate responsive sizes if enabled
							const sourceSets = []
							sourceSets.push(`${pathInfo.dir ? pathInfo.dir + "/" : ""}${pathInfo.name}.${format}`)

							if (this.options.generateResponsiveSizes) {
								// Get file size to determine if we should generate responsive sizes
								const stats = fs.statSync(imagePath)
								const fileSizeInKB = stats.size / 1024

								// Only generate responsive sizes for images above threshold
								if (fileSizeInKB > this.options.skipResponsiveSizeThreshold) {
									for (const [sizeName, sizeConfig] of Object.entries(this.options.sizes)) {
										const responsiveOutputPath = path.join(
											outputDirectory,
											`${pathInfo.name}-${sizeName}.${format}`
										)

										await image
											.resize(sizeConfig)
											.toFormat(format, outputOptions)
											.toFile(responsiveOutputPath)

										sourceSets.push(
											`${pathInfo.dir ? pathInfo.dir + "/" : ""}${
												pathInfo.name
											}-${sizeName}.${format} ${sizeConfig.width}w`
										)
									}
								}
							}

							// Generate HTML example in the console for reference
							console.log(`Image: ${relativePath} → Generated: ${pathInfo.name}.${format}`)

							// Calculate stats
							const originalStat = fs.statSync(imagePath)
							const newStat = fs.statSync(outputPath)
							const savedBytes = originalStat.size - newStat.size
							const savedPercentage = (savedBytes / originalStat.size) * 100

							this.results.push({
								file: relativePath,
								format,
								originalSize: (originalStat.size / 1024).toFixed(2) + " KB",
								newSize: (newStat.size / 1024).toFixed(2) + " KB",
								saved: (savedBytes / 1024).toFixed(2) + " KB",
								savedPercentage: savedPercentage.toFixed(1) + "%",
							})
						}

						processed++
					} catch (err) {
						console.error(`Error processing ${imagePath}:`, err.message)
						errors++
					}
				}

				// Log results
				console.log("\n✅ Image optimization complete!")
				console.log(`Processed: ${processed} | Skipped: ${skipped} | Errors: ${errors}`)

				// Show space savings
				if (this.results.length > 0) {
					// Group results by file for better readability
					const groupedResults = {}
					this.results.forEach((result) => {
						if (!groupedResults[result.file]) {
							groupedResults[result.file] = []
						}
						groupedResults[result.file].push(result)
					})

					// Display results grouped by file
					Object.entries(groupedResults).forEach(([file, fileResults]) => {
						console.log(`\n📄 ${file}:`)
						fileResults.forEach((result) => {
							console.log(
								`  - ${result.format}: ${result.originalSize} → ${result.newSize} (saved ${result.saved}, ${result.savedPercentage})`
							)
						})

						// Show which format had best compression
						const bestResult = fileResults.reduce((best, current) => {
							const bestSaved = parseFloat(best.savedPercentage)
							const currentSaved = parseFloat(current.savedPercentage)
							return currentSaved > bestSaved ? current : best
						}, fileResults[0])

						console.log(`  ✨ Best format: ${bestResult.format} (${bestResult.savedPercentage} savings)`)
					})

					// Calculate total savings
					const totalOriginalSize = this.results.reduce(
						(sum, result) => sum + parseFloat(result.originalSize),
						0
					)
					const totalNewSize = this.results.reduce((sum, result) => sum + parseFloat(result.newSize), 0)
					const totalSaved = totalOriginalSize - totalNewSize
					const totalSavedPercentage = (totalSaved / totalOriginalSize) * 100

					console.log("\n📈 Total savings:")
					console.log(`  Original: ${totalOriginalSize.toFixed(2)} KB`)
					console.log(`  Optimized: ${totalNewSize.toFixed(2)} KB`)
					console.log(`  Saved: ${totalSaved.toFixed(2)} KB (${totalSavedPercentage.toFixed(1)}%)`)
				}

				const endTime = Date.now()
				console.log(`\n⏱️  Optimization completed in ${((endTime - startTime) / 1000).toFixed(2)}s`)

				callback()
			} catch (err) {
				console.error("Image optimization failed:", err)
				callback()
			}
		})
	}

	// Utility function to ensure directory exists
	ensureDirectoryExists(directory) {
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true })
		}
	}
}

module.exports = ImageOptimizationWebpackPlugin
