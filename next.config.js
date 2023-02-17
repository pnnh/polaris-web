/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  distDir: 'build',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  output: 'standalone',
}

module.exports = nextConfig
