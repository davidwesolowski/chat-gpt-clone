/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['freesvg.org', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
