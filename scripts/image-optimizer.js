// image-optimizer.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Process command line arguments
const args = process.argv.slice(2);
const generateResponsive = args.includes('--generate-responsive');
const devMode = args.includes('--dev');

// Configuration 
const config = {
  inputDir: 'public',
  // In dev mode, write optimized images back to public folder
  outputDir: devMode ? 'public' : 'out',
  quality: {
    webp: 80,      // WebP quality (0-100)
    avif: 65,      // AVIF quality (0-100) - lower than WebP as AVIF is more efficient
    jpg: 85,       // JPEG quality for any JPEG outputs
  },
  formats: ['webp', 'avif'], // Output formats: webp, avif, etc.
  generateResponsiveSizes: generateResponsive, // Controlled by command line flag
  sizes: {
    // Define responsive image sizes
    sm: { width: 640 },    // Small screens/mobile
    md: { width: 1024 },   // Medium screens/tablets
    lg: { width: 1920 },   // Large screens/desktops
    // Original size is preserved automatically
  },
  // Only process images in these directories
  includeDirs: ['projects'],
  // Skip generating responsive sizes for images under this size (in KB)
  skipResponsiveSizeThreshold: 30,
  // Image processing options
  processingOptions: {
    webp: {
      quality: 80,
      lossless: false,
      effort: 4, // 0-6 (CPU effort, higher = better compression but slower)
    },
    avif: {
      quality: 65,
      lossless: false,
      effort: 5, // 0-9 (CPU effort, higher = better compression but slower)
    },
    jpeg: {
      quality: 85,
      progressive: true,
      mozjpeg: true, // Use mozjpeg optimizations
    },
    png: {
      compressionLevel: 9, // 0-9 (higher = better compression but slower)
      palette: true, // Use palette-based quantization for small PNGs
    }
  },
};

// Function to ensure directory exists
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Main optimization function
async function optimizeImages() {
  // Start timing
  const startTime = Date.now();
  
  try {
    // Log operating mode
    if (devMode) {
      console.log('🛠️ Running image optimizer in DEVELOPMENT mode');
      console.log('📂 Writing optimized images to public directory');
    } else {
      console.log('🏗️ Running image optimizer in BUILD mode');
      console.log('📂 Writing optimized images to out directory');
    }
    
    // Make sure output directory exists
    if (!fs.existsSync(config.outputDir)) {
      console.log(`Output directory '${config.outputDir}' not found. Creating it...`);
      fs.mkdirSync(config.outputDir, { recursive: true });
    }
    
    // Create subdirectories for included directories
    for (const dir of config.includeDirs) {
      const outputSubdir = path.join(config.outputDir, dir);
      if (!fs.existsSync(outputSubdir)) {
        fs.mkdirSync(outputSubdir, { recursive: true });
      }
    }
    
    console.log('🔍 Scanning for images...');
    
    // Find all images to process
    let imagePaths = [];
    
    // Process only specific directories if specified
    if (config.includeDirs && config.includeDirs.length > 0) {
      for (const dir of config.includeDirs) {
        const dirImages = await glob(`${config.inputDir}/${dir}/**/*.{jpg,jpeg,png,gif}`);
        imagePaths = [...imagePaths, ...dirImages];
      }
    } else {
      // Process all images in input directory
      imagePaths = await glob(`${config.inputDir}/**/*.{jpg,jpeg,png,gif}`);
    }
    
    console.log(`Found ${imagePaths.length} images to process`);
    
    // Counter for processed images
    let processed = 0;
    let skipped = 0;
    let errors = 0;
    const results = [];
    
    // Process each image
    for (const imagePath of imagePaths) {
      // Get relative path (to maintain directory structure)
      const relativePath = imagePath.substring(config.inputDir.length + 1);
      const pathInfo = path.parse(relativePath);
      
      try {
        // Load image
        const image = sharp(imagePath);
        const metadata = await image.metadata();
        
        // Create the directory in output folder if it doesn't exist
        const outputDirectory = path.join(config.outputDir, pathInfo.dir);
        ensureDirectoryExists(outputDirectory);
        
        // Copy original file to output directory
        const outputOriginalPath = path.join(config.outputDir, relativePath);
        
        // Process in specified output formats
        for (const format of config.formats) {
          // Configure output options based on format
          let outputOptions = {};
          if (format === 'webp') {
            outputOptions = config.processingOptions.webp;
          } else if (format === 'avif') {
            outputOptions = config.processingOptions.avif;
          } else if (format === 'jpeg' || format === 'jpg') {
            outputOptions = config.processingOptions.jpeg;
          } else if (format === 'png') {
            outputOptions = config.processingOptions.png;
          }
          
          // Generate the optimized image at original size
          const outputPath = path.join(outputDirectory, `${pathInfo.name}.${format}`);
          await image.toFormat(format, outputOptions).toFile(outputPath);
          
          // In build mode (not dev mode), copy originals to output folder for compatibility
          if (!devMode && !fs.existsSync(outputOriginalPath)) {
            fs.copyFileSync(imagePath, outputOriginalPath);
          }
          
          // Generate responsive sizes if enabled
          const sourceSets = [];
          sourceSets.push(`${pathInfo.dir ? pathInfo.dir + '/' : ''}${pathInfo.name}.${format}`);
          
          if (config.generateResponsiveSizes) {
            // Get file size to determine if we should generate responsive sizes
            const stats = fs.statSync(imagePath);
            const fileSizeInKB = stats.size / 1024;
            
            // Only generate responsive sizes for images above threshold
            if (fileSizeInKB > config.skipResponsiveSizeThreshold) {
              for (const [sizeName, sizeConfig] of Object.entries(config.sizes)) {
                const responsiveOutputPath = path.join(
                  outputDirectory, 
                  `${pathInfo.name}-${sizeName}.${format}`
                );
                
                await image
                  .resize(sizeConfig)
                  .toFormat(format, outputOptions)
                  .toFile(responsiveOutputPath);
                  
                sourceSets.push(`${pathInfo.dir ? pathInfo.dir + '/' : ''}${pathInfo.name}-${sizeName}.${format} ${sizeConfig.width}w`);
              }
            }
          }
          
          // Generate HTML example in the console for reference
          console.log(`Image: ${relativePath} → Generated: ${pathInfo.name}.${format}`);
          
          // Generate picture element HTML example with srcset for responsive images
          const srcsetAttribute = sourceSets.length > 1 ? 
            `srcset="${sourceSets.join(', ')}"` : 
            `src="${sourceSets[0]}"`;
            
          // Only show HTML examples in non-dev mode or when explicitly requested
          if (!devMode || args.includes('--show-html')) {
            console.log(`HTML usage example:
<picture>
  <source ${srcsetAttribute} type="image/${format}" />
  <img src="${relativePath}" alt="Image description" loading="lazy" />
</picture>`);
          }
          console.log();
          
          // Calculate stats
          const originalStat = fs.statSync(imagePath);
          const newStat = fs.statSync(outputPath);
          const savedBytes = originalStat.size - newStat.size;
          const savedPercentage = (savedBytes / originalStat.size) * 100;
          
          results.push({
            file: relativePath,
            format,
            originalSize: (originalStat.size / 1024).toFixed(2) + ' KB',
            newSize: (newStat.size / 1024).toFixed(2) + ' KB',
            saved: (savedBytes / 1024).toFixed(2) + ' KB',
            savedPercentage: savedPercentage.toFixed(1) + '%'
          });
        }
        
        processed++;
      } catch (err) {
        console.error(`Error processing ${imagePath}:`, err.message);
        errors++;
      }
    }
    
    // Log results
    console.log('\n✅ Image optimization complete!');
    console.log(`Processed: ${processed} | Skipped: ${skipped} | Errors: ${errors}`);
    
    // Show space savings
    if (results.length > 0) {
      console.log('\nOptimization results:');
      console.log('---------------------');
      
      // Group results by file for better readability
      const groupedResults = {};
      results.forEach(result => {
        if (!groupedResults[result.file]) {
          groupedResults[result.file] = [];
        }
        groupedResults[result.file].push(result);
      });
      
      // Display results grouped by file
      Object.entries(groupedResults).forEach(([file, fileResults]) => {
        console.log(`\n📄 ${file}:`);
        fileResults.forEach(result => {
          console.log(`  - ${result.format}: ${result.originalSize} → ${result.newSize} (saved ${result.saved}, ${result.savedPercentage})`);
        });
        
        // Show which format had best compression
        const bestResult = fileResults.reduce((best, current) => {
          const bestSaved = parseFloat(best.savedPercentage);
          const currentSaved = parseFloat(current.savedPercentage);
          return currentSaved > bestSaved ? current : best;
        }, fileResults[0]);
        
        console.log(`  ✨ Best format: ${bestResult.format} (${bestResult.savedPercentage} savings)`);
      });
      
      // Calculate total savings by format
      const formatSavings = {};
      results.forEach(result => {
        if (!formatSavings[result.format]) {
          formatSavings[result.format] = {
            originalSize: 0,
            newSize: 0,
            files: 0
          };
        }
        formatSavings[result.format].originalSize += parseFloat(result.originalSize);
        formatSavings[result.format].newSize += parseFloat(result.newSize);
        formatSavings[result.format].files++;
      });
      
      // Display format comparison
      console.log('\n📊 Format comparison:');
      Object.entries(formatSavings).forEach(([format, stats]) => {
        const saved = stats.originalSize - stats.newSize;
        const percentage = (saved / stats.originalSize) * 100;
        console.log(`  ${format}: ${stats.files} files, ${saved.toFixed(2)} KB saved (${percentage.toFixed(1)}%)`);
      });
      
      // Calculate overall total savings
      const totalOriginalSize = results.reduce((sum, result) => sum + parseFloat(result.originalSize), 0);
      const totalNewSize = results.reduce((sum, result) => sum + parseFloat(result.newSize), 0);
      const totalSaved = totalOriginalSize - totalNewSize;
      const totalSavedPercentage = (totalSaved / totalOriginalSize) * 100;
      
      console.log('\n📈 Total savings:');
      console.log(`  Original: ${totalOriginalSize.toFixed(2)} KB`);
      console.log(`  Optimized: ${totalNewSize.toFixed(2)} KB`);
      console.log(`  Saved: ${totalSaved.toFixed(2)} KB (${totalSavedPercentage.toFixed(1)}%)`);
      
      // Add a summary for the README/documentation
      console.log('\n📝 Summary for documentation:');
      console.log('```');
      console.log(`Total original size: ${totalOriginalSize.toFixed(2)}KB`);
      console.log(`Total optimized size: ${totalNewSize.toFixed(2)}KB`);
      console.log(`Total savings: ${totalSaved.toFixed(2)}KB (${totalSavedPercentage.toFixed(0)}% reduction)`);
      console.log('```');
    }
    
    const endTime = Date.now();
    console.log(`\n⏱️ Optimization completed in ${((endTime - startTime) / 1000).toFixed(2)}s`);
    
  } catch (err) {
    console.error('Image optimization failed:', err);
  }
}

// Execute
optimizeImages();
