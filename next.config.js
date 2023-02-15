/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  }, 
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
}

module.exports = nextConfig
