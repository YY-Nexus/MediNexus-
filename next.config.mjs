/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'placeholder.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // 优化构建性能
  webpack: (config, { dev, isServer }) => {
    // 在开发模式下禁用某些优化以加快构建速度
    if (dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
      }
    }
    
    // 解决某些模块的兼容性问题
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    }
    
    return config
  },
}

export default nextConfig
