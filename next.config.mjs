/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['localhost', 'blob.v0.dev'],
    unoptimized: true
  },
  experimental: {
    esmExternals: 'loose'
  }
};

export default nextConfig;
