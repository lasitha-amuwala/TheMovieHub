import { httpClient } from './httpClient';
import { createUrl } from './httpClientUtils';
const { get } = httpClient;

//const USParams = { region: 'US', language: 'en-US' };
const USParams = {};
export const apiQueries = {
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
    movieImages: id => ({
      queryKey: ['movies', id, 'images'],
      queryFn: () => get(createUrl(`/movie/${id}/images`)),
    }),
    movieVideos: id => ({
      queryKey: ['movies', id, 'videos'],
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
  },
  trending: {
    movies: () => ({
      queryKey: ['trending', 'movies'],
      queryFn: () => get(createUrl('/trending/movie/week')),
    }),
  },
  people: {
    movie: id => ({
      queryKey: ['people', 'movie', id],
      queryFn: () => get(createUrl(`/movie/${id}/credits`)),
    }),
  },
};
