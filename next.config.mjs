/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile react-globe.gl and its Three.js dependencies
  // This is required when importing react-globe.gl directly (not via dynamic)
  // Without this, Next.js build fails because these are ES modules
  transpilePackages: ['react-globe.gl', 'three-globe', 'three'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
