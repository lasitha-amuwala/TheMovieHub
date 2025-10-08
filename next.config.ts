import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    title: 'TheMovieHub',
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ['image.tmdb.org', 'img.youtube.com'],
    unoptimized: true,
    qualities: [25, 50, 75, 100],
  },
  devIndicators: {},
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
