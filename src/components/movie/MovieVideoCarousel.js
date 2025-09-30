'use client';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '@/utils/http-client/tmdb';
import VideoModal from '../modals/VideoModal';
import MovieVideoCard from './MovieVideoCard';
import EmblaCarousel from '../carousel/EmblaCarousel';

const MovieVideoCarousel = ({ movieId }) => {
  const { data, error, isError, isLoading } = useQuery(tmdb.movies.videos(movieId));

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error: {error}</div>;

  const videoPaths = data.results.map(({ name, key }) => {
    return { name, key };
  });

  return (
    <>
      <EmblaCarousel breakPointNumSlides={{ normal: 3, sm: 4, lg: 5 }}>
        {data.results.map((slide, i) => (
          <MovieVideoCard data={slide} key={i} />
        ))}
      </EmblaCarousel>
      <VideoModal paths={videoPaths} />
    </>
  );
};

export default MovieVideoCarousel;
