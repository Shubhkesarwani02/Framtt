const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Improve server stability
  experimental: {
    serverMinification: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Increase memory limit for large operations
  serverRuntimeConfig: {
    memoryLimit: '1024MB', // Set a reasonable memory limit
  },
  // Handle specific error cases
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 5,
  },
}

export default nextConfig
