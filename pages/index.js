import React from 'react';
import Head from 'next/head';
import { List } from '../components/list/List';
import { Carousel } from '../components/carousel/Carousel';
import { QueryClient, dehydrate } from 'react-query';
import { tmdb } from '../src/http-client/tmdb';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.fetchQuery(tmdb.common.configuration()),
    queryClient.fetchQuery(tmdb.trending.movies()),
    queryClient.fetchQuery(tmdb.movies.nowPlaying()),
    queryClient.fetchQuery(tmdb.movies.popular()),
    queryClient.fetchQuery(tmdb.movies.topRated()),
    queryClient.fetchQuery(tmdb.movies.upcoming()),
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
      <List query={tmdb.movies.popular()} title='Popular' />
      <List query={tmdb.movies.nowPlaying()} title='Now Playing' />
      <List query={tmdb.movies.upcoming()} title='Upcoming' />
      <List query={tmdb.movies.topRated()} title='Top Rated' />
    </div>
  </div>
);

export default Home;
