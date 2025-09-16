import { useQuery } from '@tanstack/react-query';
import { tmdb } from '@/utils/http-client/tmdb';
import VideoModal from '../modals/VideoModal';
import MovieVideoCard from './MovieVideoCard';
import EmblaCarousel from '../carousel/EmblaCarousel';

const MovieVideoCarousel = ({ id }) => {
  const { data } = useQuery(tmdb.movies.videos(id));

  const videoPaths = data.results.map(({ name, key }) => {
    return { name, key };
  });

  const breakPointNumSlides = { normal: 3, sm: 4, lg: 4 };

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
