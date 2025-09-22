'use client';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '@/utils/http-client/tmdb';
import VideoModal from '../modals/VideoModal';
import MovieVideoCard from './MovieVideoCard';
import EmblaCarousel from '../carousel/EmblaCarousel';

const MovieVideoCarousel = ({ id }) => {
  const { data, error, isError, isLoading } = useQuery(tmdb.movies.videos(id));

  const videoPaths = data.results.map(({ name, key }) => {
    return { name, key };
  });

  const breakPointNumSlides = { normal: 3, sm: 4, lg: 4 };

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <>
      <EmblaCarousel breakPointNumSlides={breakPointNumSlides}>
        {data.results.map((slide, i) => (
          <MovieVideoCard data={slide} key={i} />
        ))}
      </EmblaCarousel>
      <VideoModal paths={videoPaths} />
    </>
  );
};

export default MovieVideoCarousel;
