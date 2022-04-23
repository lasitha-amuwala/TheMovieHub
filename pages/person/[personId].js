import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate, useQueries } from 'react-query';
import { tmdb } from '../../src/http-client/tmdb';
import PersonHeader from '../../components/person/PersonHeader';
import PersonImageCarousel from '../../components/person/PersonImageCarousel';
import PageMargin from '../../components/PageMargin';

export const getServerSideProps = async ({ params }) => {
  try {
    const queryClient = new QueryClient();
    await Promise.all([
      queryClient.fetchQuery(tmdb.common.configuration()),
      queryClient.fetchQuery(tmdb.people.person(params.personId)),
      queryClient.fetchQuery(tmdb.people.movieCredits(params.personId)),
      queryClient.fetchQuery(tmdb.people.tvCredits(params.personId)),
      queryClient.fetchQuery(tmdb.people.images(params.personId)),
    ]);

    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

const Person = () => {
  const router = useRouter();
  const { personId } = router.query;

  const results = useQueries([
    tmdb.people.person(personId),
    tmdb.people.movieCredits(personId),
    tmdb.people.tvCredits(personId),
  ]);

  const [{ data: personData }, { data: movieCredits }, { data: tvCredits }] = results;


  if (router.isFallback) return <div>error</div>;
  return (
    <>
      <PersonHeader person={personData} />
      <PageMargin padding className='py-10'>
        <PersonImageCarousel id={personId} title={personData.name} />
      </PageMargin>
      <div className='h-screen'></div>
    </>
  );
};

export default Person;
