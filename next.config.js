module.exports = {
  env: {
    title: 'TheMovieHub',
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ['image.tmdb.org', 'img.youtube.com'],
  },
  devIndicators: { autoPrerender: true },
};
