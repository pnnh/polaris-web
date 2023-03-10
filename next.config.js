const path = require('path')
// import path from 'path' 
// import {fileURLToPath} from 'url'
 
// const __filename = fileURLToPath(import.meta.url)
 
// const __dirname = path.dirname(__filename)

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
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  hmr: false,
  webpackDevMiddleware: (config) => {
    config.watchOptions = config.watchOptions || {}
    config.watchOptions.ignored = [ 
      /.*/,
    ]
    config.lazy = true
    return config
  },
  async rewrites () { 
    return [
      {
        source: '/server/:path*',
        destination: serverUrl + '/:path*',
      },
    ]
  },
}

module.exports = nextConfig
