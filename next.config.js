/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: ['agencyanalytics-api.vercel.app']
  // }
  images: {
    domains: ['agencyanalytics-api.vercel.app'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'agencyanalytics-api.vercel.app',
    //     port: '',
    //     pathname: '/public/*',
    //   },
    // ],
  },
}

module.exports = nextConfig
