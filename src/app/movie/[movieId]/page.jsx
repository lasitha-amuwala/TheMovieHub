import MovieCastCarousel from '@/components/movie/MovieCastCarousel';
import MovieHeader from '@/components/movie/MovieHeader';
import MovieVideoCarousel from '@/components/movie/MovieVideoCarousel';
import PageMargin from '@/components/PageMargin';
import { tmdb } from '@/utils/http-client/tmdb';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function MoviePage({ params }) {
  const { movieId } = await params;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(tmdb.common.configuration()),
    queryClient.prefetchQuery(tmdb.movies.movie(movieId)),
    queryClient.prefetchQuery(tmdb.movies.credits(movieId)),
    queryClient.prefetchQuery(tmdb.movies.videos(movieId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieHeader movieId={movieId} />
      <PageMargin padding className='py-10'>
        <h1 className='font-semibold text-2xl'>Cast:</h1>
        <MovieCastCarousel id={movieId} />
        <h1 className='font-semibold text-2xl'>Trailers:</h1>
        <MovieVideoCarousel id={movieId} />
      </PageMargin>
    </HydrationBoundary>
  );
}
