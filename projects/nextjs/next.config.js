const createNextIntlPlugin = require('next-intl/plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['c-ufunc'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

// const withNextIntl = require('next-intl/plugin')(
//   // This is the default (also the `src` folder is supported out of the box)
//   './i18n.ts'
// )

// module.exports = withNextIntl(nextConfig)

const withNextIntl = createNextIntlPlugin()

module.exports = withNextIntl(nextConfig)
