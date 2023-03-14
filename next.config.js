/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'fakeimg.pl',

      },
      {
        protocol: 'https',
        hostname: 'fakeimg.pl',
      },
    ],
  },
  
}

module.exports = nextConfig


