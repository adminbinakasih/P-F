import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Disable caching for all pages
  generateBuildId: async () => {
    // Use timestamp to force new build ID every deployment
    return `build-${Date.now()}`
  },
}

export default nextConfig
