'use client';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '@/utils/http-client/tmdb';
import VideoModal from '../modals/VideoModal';
import MovieVideoCard from './MovieVideoCard';
import EmblaCarousel from '../carousel/EmblaCarousel';
import { VideoResponse } from '@/types/movies';

const MovieVideoCarousel = ({ movieId }: { movieId: string }) => {
  const {
    data: videos,
    error,
    isError,
    isLoading,
  } = useQuery<VideoResponse>(tmdb.movies.videos(movieId));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!videos) return <div>No Data</div>;

  const videoPaths = videos.results.map(({ name, key }) => ({ name, key })) ?? [];

  return (
    <>
      <EmblaCarousel breakPointNumSlides={{ normal: 3, sm: 4, lg: 5 }}>
        {videos.results.map((video, i) => (
          <MovieVideoCard video={video} key={i} />
        ))}
      </EmblaCarousel>
      <VideoModal paths={videoPaths} />
    </>
  );
};

export default MovieVideoCarousel;
