/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/day/:path*',
        destination: 'https://www.atg.se/services/racinginfo/v1/api/calendar/day/:path*',
      },
      /*{
        source: '/api/game/:path*',
        destination: 'https://www.atg.se/services/racinginfo/v1/api/games/:path*',
      },*/
      {
        source: '/api/race/:path*',
        destination: 'https://www.atg.se/services/racinginfo/v1/api/races/:path*',
      },
      {
        source: '/api/race/:path*/start/:path*',
        destination: 'https://www.atg.se/services/racinginfo/v1/api/races/:path*/start/:path*',
      },
    ]
  },
}

export default nextConfig
