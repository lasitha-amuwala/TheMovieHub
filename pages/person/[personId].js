import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate, useQueries } from 'react-query';
import { apiQueries } from '../../src/http-client/apiQueries';
import PersonHeader from '../../components/person/PersonHeader';
import PersonImageCarousel from '../../components/person/PersonImageCarousel';
import PageMargin from '../../components/PageMargin';
import ImageModal from '../../components/modals/ImageModal';

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
    apiQueries.people.images(personId),
  ]);

  const [{ data: personData }, { data: movieCredits }, { data: tvCredits }, { data: imageData }] =
    results;

  const imagePaths = imageData.profiles.map(({ file_path }) => file_path.substring(1));

  if (router.isFallback) return <div>error</div>;
  return (
    <>
      <PersonHeader person={personData} />
      <PageMargin padding className='py-10'>
        <PersonImageCarousel id={personId} />
      </PageMargin>
      <ImageModal title={personData.name} paths={imagePaths} />
    </>
  );
};

export default Person;
