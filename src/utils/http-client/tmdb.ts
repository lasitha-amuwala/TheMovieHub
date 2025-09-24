import { httpClient } from './httpClient';
import { createUrl } from './httpClientUtils';
const { get } = httpClient;

const USParams = { region: 'US', language: 'en-US' };

export const tmdb = {
  common: {
    configuration: () => ({
      queryKey: ['configuration'],
      queryFn: () => get(createUrl('/configuration')),
    }),
  },
  movies: {
    movie: (id: string) => ({
      queryKey: ['movies', id],
      queryFn: () => get(createUrl(`/movie/${id}`, { append_to_response: 'release_dates' })),
    }),
    images: (id: string) => ({
      queryKey: ['movie', 'images', id],
      queryFn: () => get(createUrl(`/movie/${id}/images`, { include_image_language: 'en' })),
    }),
    videos: (id: string) => ({
      queryKey: ['movie', 'videos', id],
      queryFn: () => get(createUrl(`/movie/${id}/videos`, { language: 'en-US' })),
    }),
    nowPlaying: () => ({
      queryKey: ['movies', 'nowPlaying'],
      queryFn: () => get(createUrl(`/movie/now_playing`, USParams)),
    }),
    popular: () => ({
      queryKey: ['movies', 'popular'],
      queryFn: () => get(createUrl(`/movie/popular`, USParams)),
    }),
    topRated: () => ({
      queryKey: ['movies', 'topRated'],
      queryFn: () => get(createUrl(`/movie/top_rated`, USParams)),
    }),
    upcoming: () => ({
      queryKey: ['movies', 'upcoming'],
      queryFn: () => get(createUrl(`/movie/upcoming`, USParams)),
    }),
    credits: (id: string) => ({
      queryKey: ['movie', 'credits', id],
      queryFn: () => get(createUrl(`/movie/${id}/credits`)),
    }),
    genres: () => ({
      queryKey: ['movies', 'genre'],
      queryFn: () => get(createUrl('/genre/movie/list')),
    }),
  },
  series: {
    genres: () => ({
      queryKey: ['series', 'genre'],
      queryFn: () => get(createUrl('/genre/tv/list')),
    }),
  },
  people: {
    person: (id: string) => ({
      queryKey: ['people', id],
      queryFn: () => get(createUrl(`/person/${id}`, { append_to_response: 'external_ids' })),
    }),
    movieCredits: (id: string) => ({
      queryKey: ['people', 'credits', 'movie', id],
      queryFn: () => get(createUrl(`/person/${id}/movie_credits`)),
    }),
    tvCredits: (id: string) => ({
      queryKey: ['people', 'credits', 'tv', id],
      queryFn: () => get(createUrl(`/person/${id}/tv_credits`)),
    }),
    images: (id: string) => ({
      queryKey: ['people', 'images', id],
      queryFn: () => get(createUrl(`/person/${id}/images`)),
    }),
    taggedImages: (id: string) => ({
      queryKey: ['people', 'tagged', id],
      queryFn: () => get(createUrl(`/person/${id}/tagged_images`)),
    }),
  },
  trending: {
    moviesWeek: () => ({
      queryKey: ['trending', 'movies', 'week'],
      queryFn: () => get(createUrl('/trending/movie/week')),
    }),
    moviesDay: () => ({
      queryKey: ['trending', 'movies', 'day'],
      queryFn: () => get(createUrl('/trending/movie/day')),
    }),
  },
};
