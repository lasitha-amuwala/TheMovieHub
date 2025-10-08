'use client';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '@/utils/http-client/tmdb';
import { Credits } from '@/types/movies';
import EmblaCarousel from '@/components/carousel/EmblaCarousel';
import MovieCastCard from '@/components/movie/MovieCastCard';

type Props = {
  movieId: string;
};

const MovieCastCarousel = ({ movieId }: Props) => {
  const { data, error, isLoading, isError } = useQuery<Credits>(tmdb.movies.credits(movieId));

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>no data</div>;

  const orderdedData = data.cast.sort((a, b) => a.order - b.order);

  return (
    <EmblaCarousel breakPointNumSlides={{ normal: 3, sm: 6, lg: 8 }}>
      {orderdedData.map((cast, i) => (
        <MovieCastCard cast={cast} key={i} />
      ))}
    </EmblaCarousel>
  );
};

export default MovieCastCarousel;
