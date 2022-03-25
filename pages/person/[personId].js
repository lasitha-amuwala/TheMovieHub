import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { apiQueries } from '../../src/http-client/apiQueries';

export const getServerSideProps = async ({ params }) => {
  try {
    const queryClient = new QueryClient();
    await Promise.all([
      queryClient.fetchQuery(apiQueries.common.configuration()),
      queryClient.fetchQuery(apiQueries.people.person(params.personId)),
    ]);

    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

const Person = () => {
  const router = useRouter();
  const { data } = useQuery(apiQueries.people.person(router.query.personId));
  if (router.isFallback) return <div>error</div>;
  return <div>{data.name}</div>;
};

export default Person;
