/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: true, 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'uhdtv.io',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'mango.blender.org',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'download.blender.org',
        port: '',
        pathname: '/**'
      },
    ]
  }
};

module.exports = nextConfig;
