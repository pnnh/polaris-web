const serverUrl = process.env.SERVER || 'http://127.0.0.1:8101'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  distDir: 'build',
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_ENV === 'production'
  },
  async rewrites () { 
    return [
      {
        source: '/restful/:path*',
        destination: serverUrl + '/restful/:path*',
      },
    ]
  },
}

module.exports = nextConfig
