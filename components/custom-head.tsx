'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'

export default function CustomHead() {
  const pathname = usePathname()
  
  return (
    <>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="https://cdn.jsdelivr.net/npm/geist-font@latest/fonts/geist-sans/Geist-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      <link rel="preconnect" href="https://cloud.umami.is" />

      {/* Rich Results test */}
      <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://siynspace.netlify.app${pathname}`} />
      
      {/* Modern favicon format */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      
      {/* WebManifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Mobile web app capable */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#875eff" />
    </>
  )
}
