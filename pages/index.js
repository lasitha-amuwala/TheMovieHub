import React from 'react';
import Head from 'next/head';
import { List } from '../components/list/List';
import { QueryClient, dehydrate } from 'react-query';
import { tmdb } from '../src/http-client/tmdb';
import Spotlight from '../components/home/Spotlight';
import { Footer } from '../components/Footer';

export const getServerSideProps = async () => {
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

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Home = () => {
  return (
    <div className='overflow-hidden'>
      <Head>
        <title>{process.env.title}</title>
      </Head>
      <Spotlight>
        <div className='mt-5 mb-16 flex flex-col gap-8 overflow-hidden sm:gap-10 md:gap-12 lg:gap-14 2xl:gap-16'>
          <List query={tmdb.movies.popular()} title='Popular' />
          <List query={tmdb.movies.nowPlaying()} title='Now Playing' />
          <List query={tmdb.movies.upcoming()} title='Upcoming' />
          <List query={tmdb.movies.topRated()} title='Top Rated' />
        </div>
        <Footer />
      </Spotlight>
    </div>
  );
};

export default Home;
