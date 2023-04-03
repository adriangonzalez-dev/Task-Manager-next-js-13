/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns:[
      
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port:'',
        pathname: '/6.x/adventurer/**',
      },
      {
        protocol: 'https',
        hostname:'lh3.googleusercontent.com',
        port:'',
        pathname: '/**',
      }
    ]
  }
  ,
}

module.exports = nextConfig
