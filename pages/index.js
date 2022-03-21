import React from 'react';
import Head from 'next/head';
import { List } from '../components/List/List';
import { Carousel } from '../components/Carousel/Carousel';
import { QueryClient, dehydrate } from 'react-query';
import { apiQueries } from '../src/http-client/apiQueries';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.fetchQuery(apiQueries.common.configuration()),
    queryClient.fetchQuery(apiQueries.trending.movies()),
    queryClient.fetchQuery(apiQueries.movies.nowPlaying()),
    queryClient.fetchQuery(apiQueries.movies.popular()),
    queryClient.fetchQuery(apiQueries.movies.topRated()),
    queryClient.fetchQuery(apiQueries.movies.upcoming()),
  ]);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Home = () => (
  <div className='overflow-hidden'>
    <Head>
      <title>{process.env.title}</title>
    </Head>
    <Carousel autoplay />
    <div className='flex flex-col sm:gap-2 md:gap-4 lg:gap-6 2xl:gap-9'>
      <List query={apiQueries.movies.popular()} title='Popular' />
      <List query={apiQueries.movies.nowPlaying()} title='Now Playing' />
      <List query={apiQueries.movies.upcoming()} title='Upcoming' />
      <List query={apiQueries.movies.topRated()} title='Top Rated' />
    </div>
  </div>
);

export default Home;
