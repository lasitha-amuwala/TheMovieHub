import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate, useQueries } from 'react-query';
import { apiQueries } from '../../src/http-client/apiQueries';
import PersonHeader from '../../components/person/PersonHeader';
import PersonImageCarousel from '../../components/person/PersonImageCarousel';
import PageMargin from '../../components/PageMargin';

export const getServerSideProps = async ({ params }) => {
  try {
    const queryClient = new QueryClient();
    await Promise.all([
      queryClient.fetchQuery(apiQueries.common.configuration()),
      queryClient.fetchQuery(apiQueries.people.person(params.personId)),
      queryClient.fetchQuery(apiQueries.people.movieCredits(params.personId)),
      queryClient.fetchQuery(apiQueries.people.tvCredits(params.personId)),
      queryClient.fetchQuery(apiQueries.people.images(params.personId)),
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
    apiQueries.people.person(personId),
    apiQueries.people.movieCredits(personId),
    apiQueries.people.tvCredits(personId),
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
