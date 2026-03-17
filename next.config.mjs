/** @type {import('next').NextConfig} */
const nextConfig = {
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
    formats: ['image/avif', 'image/webp'], // Modern formats for smaller file sizes
    minimumCacheTTL: 86400, // Cache images for 24 hours
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Aggressive caching for static assets
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        source: '/(.*)\\.(js|css|png|jpg|jpeg|webp|avif|svg|woff2|woff)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/services-1',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/careers-1',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/about-us-1',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/contact-us-1',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/meet-the-team-1',
        destination: '/meet-the-team',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
