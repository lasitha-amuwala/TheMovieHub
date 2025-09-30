import { tmdb } from '@/utils/http-client/tmdb';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PersonHeader from '@/components/person/PersonHeader';
import PageMargin from '@/components/PageMargin';
import PersonImageCarousel from '@/components/person/PersonImageCarousel';

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
      <PersonHeader personId={personId} />
      <PageMargin className='py-10'>
        <PersonImageCarousel personId={personId} title={''} />
      </PageMargin>
    </HydrationBoundary>
  );
}
