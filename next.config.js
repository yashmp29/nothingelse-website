/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  transpilePackages: [
    '@firebase/firestore',
    '@firebase/app',
    '@firebase/auth'
  ],
}
module.exports = nextConfig;
