import { httpClient } from './httpClient';
import { createUrl } from './httpClientUtils';
const { get } = httpClient;

const USParams = { region: 'US', language: 'en-US' };

export const apiQueries = {
  movies: {
    movie: (id) => ({
      queryKey: ['movies', id],
      queryFn: () =>
        get(createUrl(`/movie/${id}`, { append_to_response: 'release_dates' })),
    }),
    nowPlaying: () => ({
      queryKey: ['movies', 'nowPlaying'],
      queryFn: () =>
        get(
          createUrl(`/movie/now_playing`, { region: 'US', language: 'en-US' })
        ),
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
};
