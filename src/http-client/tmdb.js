import { httpClient } from './httpClient';
import { createUrl } from './httpClientUtils';
const { get } = httpClient;

const USParams = { region: 'US', language: 'en-US' };

export const tmdb = {
  common: {
    configuration: () => ({
      queryKey: 'configuration',
      queryFn: () => get(createUrl('/configuration')),
    }),
  },
  movies: {
    movie: id => ({
      queryKey: ['movies', id],
      queryFn: () => get(createUrl(`/movie/${id}`, { append_to_response: 'release_dates' })),
    }),
    images: id => ({
      queryKey: ['movie', 'images', id],
      queryFn: () => get(createUrl(`/movie/${id}/images`, { include_image_language: 'en' })),
    }),
    videos: id => ({
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
    credits: id => ({
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
    person: id => ({
      queryKey: ['people', id],
      queryFn: () => get(createUrl(`/person/${id}`, { append_to_response: 'external_ids' })),
    }),
    movieCredits: id => ({
      queryKey: ['people', 'credits', 'movie', id],
      queryFn: () => get(createUrl(`/person/${id}/movie_credits`)),
    }),
    tvCredits: id => ({
      queryKey: ['people', 'credits', 'tv', id],
      queryFn: () => get(createUrl(`/person/${id}/tv_credits`)),
    }),
    images: id => ({
      queryKey: ['people', 'images', id],
      queryFn: () => get(createUrl(`/person/${id}/images`)),
    }),
    taggedImages: id => ({
      queryKey: ['people', 'tagged', id],
      queryFn: () => get(createUrl(`/person/${id}/tagged_images`)),
    }),
  },
  trending: {
    movies: () => ({
      queryKey: ['trending', 'movies'],
      queryFn: () => get(createUrl('/trending/movie/week')),
    }),
  },
};
