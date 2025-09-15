import { useQuery } from '@tanstack/react-query';
import { tmdb } from '../../src/http-client/tmdb';
import MovieCastCard from './MovieCastCard';
import EmblaCarousel from '../carousel/EmblaCarousel';

const MovieCastCarousel = ({ id }) => {
  const { data, isLoading, isSuccess } = useQuery(tmdb.movies.credits(id));

  if (isLoading) return <div>Loading</div>;

  return (
    <EmblaCarousel>
      {data.cast.map((cast, i) => (
        <MovieCastCard data={cast} key={i} />
      ))}
    </EmblaCarousel>
  );
};

export default MovieCastCarousel;
