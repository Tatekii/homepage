/** @type {import('next').NextConfig} */
const path = require('path');
const fs = require('fs');

// Check if the image optimization plugin exists and load it conditionally
const pluginPath = path.join(__dirname, 'plugins/image-optimization-webpack-plugin.js');
let ImageOptimizationWebpackPlugin;
try {
  if (fs.existsSync(pluginPath)) {
    ImageOptimizationWebpackPlugin = require(pluginPath);
  }
} catch (error) {
  console.warn('Image optimization plugin not found. Images will not be optimized.');
}

// Get environment variables for plugin configuration
const isDevMode = process.env.NODE_ENV === 'development';
const generateResponsive = process.env.GENERATE_RESPONSIVE === 'true';
const skipImageOptimization = process.env.SKIP_IMAGE_OPTIMIZATION === 'true';

const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true, // Required for static export
    // The following settings will be used when NOT using static export:
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 1024, 1920], // Match our responsive sizes in image-optimizer
  },
  
  // Production optimization settings
  swcMinify: true, // Enable SWC minification for smaller bundles
  compiler: {
    // Remove console statements and debugger statements in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Additional optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true,
  compress: true, // Enable gzip compression
  
  // Add webpack plugin for image optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Only add the plugin on the server build to avoid running multiple times
    if (isServer && ImageOptimizationWebpackPlugin && !skipImageOptimization) {
      config.plugins.push(
        new ImageOptimizationWebpackPlugin({
          devMode: isDevMode,
          generateResponsive: generateResponsive,
          debug: process.env.DEBUG_IMAGE_OPTIMIZATION === 'true',
        })
      );
      console.log('📸 Image optimization plugin enabled (server build)');
    } else if (skipImageOptimization) {
      console.log('🚫 Image optimization skipped by configuration');
    } else if (!isServer) {
      console.log('ℹ️ Image optimization runs only in server build');
    } else {
      console.log('⚠️ Image optimization plugin not available');
    }
    
    return config;
  },
};

module.exports = nextConfig;
