# Image Optimization Webpack Plugin

This document describes the image optimization webpack plugin implemented in this project.

## Overview

The Image Optimization Webpack Plugin integrates directly into the Next.js build process to automatically optimize images without requiring separate script execution. The plugin:

1. Converts images to WebP and AVIF formats
2. Generates responsive image sizes (when enabled)
3. Preserves original images for compatibility
4. Provides detailed optimization statistics

## How It Works

The plugin hooks into webpack's `emit` lifecycle, which runs before files are emitted to disk. This ensures that:

1. All normal webpack processing is completed first
2. The optimization doesn't interfere with the main build process
3. It works in both development and production modes
4. It can cache results between builds for improved performance

## Usage

The image optimization is now automatically integrated into the build process. Use these npm scripts:

### Development

```bash
# Start development server with image optimization
npm run dev

# Start development server without image optimization
npm run dev:no-optimize
```

### Production

```bash
# Normal build with standard image optimization
npm run build

# Build with responsive image variants
npm run build:responsive

# Build without image optimization
npm run build:no-optimize
```

### Analysis

```bash
# Analyze optimized images in production build
npm run analyze:images

# Analyze optimized images in development
npm run analyze:images:dev
```

## Configuration

The plugin is configured in `next.config.js` and accepts the following options:

| Option | Description | Default |
|--------|-------------|---------|
| `inputDir` | Directory containing original images | `'public'` |
| `outputDir` | Directory for optimized images | `'public'` (dev) or `'out'` (prod) |
| `quality.webp` | WebP quality (0-100) | `80` |
| `quality.avif` | AVIF quality (0-100) | `65` |
| `formats` | Output formats to generate | `['webp', 'avif']` |
| `generateResponsiveSizes` | Whether to generate responsive variants | `false` |
| `sizes` | Responsive size breakpoints | `{ sm: 640px, md: 1024px, lg: 1920px }` |
| `includeDirs` | Subdirectories to process | `['projects']` |
| `useCache` | Whether to cache optimization results | `true` |
| `debug` | Show detailed debug information | `false` |

## Environment Variables

The following environment variables control optimization behavior:

| Variable | Description |
|----------|-------------|
| `SKIP_IMAGE_OPTIMIZATION` | Set to `true` to bypass image optimization |
| `GENERATE_RESPONSIVE` | Set to `true` to generate responsive image variants |
| `DISABLE_IMAGE_CACHE` | Set to `true` to disable caching of image optimization results |
| `DEBUG_IMAGE_OPTIMIZATION` | Set to `true` to enable detailed logging |
| `NODE_ENV` | Determines dev/prod mode (`development` or `production`) |

## Performance

The webpack plugin approach offers several advantages:

1. **Integration**: No separate scripts to run after build
2. **Efficiency**: Only optimizes images once per build
3. **Parallelization**: Works alongside other webpack processes
4. **Consistency**: Environment variables control behavior
5. **Caching**: Avoids reprocessing unchanged images during development and builds

### Caching System

The plugin includes a robust caching system that:

1. **Tracks file changes**: Only processes images that have been modified
2. **Detects config changes**: Automatically invalidates cache when optimization settings change
3. **Persists between sessions**: Cache file is stored in `.image-optimization-cache.json`
4. **Improves build speed**: Significantly reduces build time for projects with many images

## Components

The image optimization system includes React components that automatically use the best available format:

- `OptimizedImage`: Base component for automatic format selection
- `ResponsiveImage`: Enhanced component with responsive sizing
- `ImageOptimizationDemo`: UI component showing format capabilities 
- `FormatSupportIndicator`: Component showing browser format support

## Legacy Scripts

The original script-based optimization is still available as:

```bash
npm run optimize:images:legacy
npm run optimize:images:full:legacy
npm run optimize:images:dev:legacy
```

These are maintained for backward compatibility but are no longer needed for normal operation.
