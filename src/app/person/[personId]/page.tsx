import { PersonContent } from '@/components/person/PersonContent';
import { tmdb } from '@/utils/http-client/tmdb';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Params = Promise<{ personId: string }>;

export default async function MoviePage({ params }: { params: Params }) {
  const { personId } = await params;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.fetchQuery(tmdb.common.configuration()),
    queryClient.fetchQuery(tmdb.people.person(personId)),
    queryClient.fetchQuery(tmdb.people.movieCredits(personId)),
    queryClient.fetchQuery(tmdb.people.tvCredits(personId)),
    queryClient.fetchQuery(tmdb.people.images(personId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PersonContent personId={personId} />
      <div className='h-screen'></div>
    </HydrationBoundary>
  );
}
