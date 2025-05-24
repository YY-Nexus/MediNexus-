/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com', 'api.yanyu.com'],
  },
  // 移除 swcMinify 配置，因为在 Next.js 15 中已不再需要
  // swcMinify: true,
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
