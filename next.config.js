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
  // async rewrites () { 
  //   return [
  //     {
  //       source: '/restful/:path*',
  //       destination: serverUrl + '/:path*',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
