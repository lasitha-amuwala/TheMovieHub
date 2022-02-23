import { httpClient } from './httpClient';
import { createUrl } from './httpClientUtils';

export const apiQueries = {
  movies: {
    movie: (id) => ({
      queryKey: ['movies', id],
      queryFn: () =>
        httpClient.get(
          createUrl(`/movie/${id}`, { append_to_response: 'release_dates' })
        ),
    }),
  },
};
