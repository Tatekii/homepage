const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
})

// Get the existing config
const nextConfig = require('./next.config.js')

// Export a combined config that includes the bundle analyzer
module.exports = withBundleAnalyzer(nextConfig)