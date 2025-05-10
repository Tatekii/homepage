# Homepage Bundle Size Optimization Guide

This document outlines strategies for optimizing the build size of your portfolio website.

## Current Optimizations

1. **Dynamic Imports for Heavy Libraries**
   - Framer Motion components are dynamically imported
   - OGL for particles is lazy loaded
   - Music player and other non-critical components use dynamic imports

2. **Code Splitting**
   - Main view and sections are split into separate chunks
   - Optimized motion library centralizes and lazily loads animation capabilities

3. **Build Optimizations**
   - SWC minification is enabled
   - Console logs are stripped in production
   - Unused code is eliminated

## Further Optimization Strategies

### 1. 🔄 Replace Heavy Libraries

| Current Library | Size | Alternative | Size | Savings |
|-----------------|------|-------------|------|---------|
| Framer Motion   | ~120KB | react-spring | ~35KB | ~85KB |
| OGL (3D particles) | ~90KB | simple CSS particles | ~5KB | ~85KB |
| Radix UI (full) | ~250KB | Subset of components | ~100KB | ~150KB |

### 2. 📦 Bundle Optimization

```bash
# Analyze bundle
npm run build:analyze

# Find unused dependencies
node analyze-packages.js

# Optimize build
npm run build
```

### 3. ⚙️ Component-Level Optimizations

#### Mouse Tracking Component
- Use `useOptimizedMotionValue` to prevent re-renders
- Only apply 3D effects on hover

#### Particles Component
- Implement simple variant for mobile devices
- Use reduced particle count on lower-end devices

#### UI Components
- Only import used Radix UI components
- Remove unused shadcn components

### 4. 🚀 Production Deployment Checklist

1. **Audit Dependencies**
   ```bash
   node analyze-packages.js
   ```

2. **Run Bundle Analysis**
   ```bash
   npm run build:analyze
   ```

3. **Build with Optimizations**
   ```bash
   NEXT_MINIMIZE_ASSETS=true NODE_ENV=production npm run build
   ```

4. **Verify Output Size**
   ```bash
   du -sh out
   ```

5. **Test Performance**
   - Use Lighthouse to measure performance
   - Check Time to Interactive (TTI)
   - Verify Largest Contentful Paint (LCP)

## Expected Results

- **Current build size:** ~8-9MB
- **Target build size:** ~3-4MB
- **Loading time improvement:** 40-60%

## Monitoring

After implementing optimizations, monitor these metrics:
- Total JavaScript size
- Time to Interactive
- First Contentful Paint
- Largest Contentful Paint
