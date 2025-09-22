import { tmdb } from '@/utils/http-client/tmdb';
import { Backdrop } from '@/components/home/Backdrop';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { HomePageLists } from '@/components/list/HomePageLists';

export default async function Home() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(tmdb.movies.genres()),
    queryClient.prefetchQuery(tmdb.movies.popular()),
    queryClient.prefetchQuery(tmdb.movies.topRated()),
    queryClient.prefetchQuery(tmdb.movies.upcoming()),
    queryClient.prefetchQuery(tmdb.movies.nowPlaying()),
    queryClient.prefetchQuery(tmdb.trending.moviesDay()),
    queryClient.prefetchQuery(tmdb.trending.moviesWeek()),
    queryClient.prefetchQuery(tmdb.common.configuration()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='overflow-hidden'>
        <Backdrop>
          <HomePageLists />
        </Backdrop>
      </div>
    </HydrationBoundary>
  );
}
