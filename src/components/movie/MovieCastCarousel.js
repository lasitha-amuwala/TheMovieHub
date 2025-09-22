'use client';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '@/utils/http-client/tmdb';
import MovieCastCard from './MovieCastCard';
import EmblaCarousel from '../carousel/EmblaCarousel';

const MovieCastCarousel = ({ id }) => {
  const { data, error, isLoading, isError } = useQuery(tmdb.movies.credits(id));

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <EmblaCarousel>
      {data.cast.map((cast, i) => (
        <MovieCastCard data={cast} key={i} />
      ))}
    </EmblaCarousel>
  );
};

export default MovieCastCarousel;
