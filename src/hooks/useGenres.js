import { useQuery } from 'react-query';
import { tmdb } from '../http-client/tmdb';

export const useMovieGenres = () => {
  const { data: genres } = useQuery({
    ...tmdb.movies.genres(),
    staleTime: Infinity,
  });

  const object = genres.genres.reduce(
    (obj, item) => ({ ...obj, [item.id]: { name: item.name } }),
    {}
  );

  return object;
};

export const useTVGenres = () => {
  const { data: genres } = useQuery({
    ...tmdb.series.genres(),
    staleTime: Infinity,
  });

  const object = genres.genres.reduce(
    (obj, item) => ({ ...obj, [item.id]: { name: item.name } }),
    {}
  );

  return object;
};
