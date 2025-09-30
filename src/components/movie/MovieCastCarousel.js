'use client';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '@/utils/http-client/tmdb';
import MovieCastCard from './MovieCastCard';
import EmblaCarousel from '../carousel/EmblaCarousel';
import RippleWrapper from '@/components/RippleWrapper';

const MovieCastCarousel = ({ movieId }) => {
  const { data, error, isLoading, isError } = useQuery(tmdb.movies.credits(movieId));

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <EmblaCarousel breakPointNumSlides={{ normal: 3, sm: 6, lg: 8 }}>
      {data.cast.map((cast, i) => (
        <MovieCastCard data={cast} key={i} />
      ))}
    </EmblaCarousel>
  );
};

export default MovieCastCarousel;
