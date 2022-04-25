import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { List } from '../components/list/List';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { tmdb } from '../src/http-client/tmdb';
import Spotlight from '../components/home/Spotlight';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.fetchQuery(tmdb.common.configuration()),
    queryClient.fetchQuery(tmdb.trending.movies()),
    queryClient.fetchQuery(tmdb.movies.genres()),
    queryClient.fetchQuery(tmdb.movies.nowPlaying()),
    queryClient.fetchQuery(tmdb.movies.popular()),
    queryClient.fetchQuery(tmdb.movies.topRated()),
    queryClient.fetchQuery(tmdb.movies.upcoming()),
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
      </Spotlight>
    </div>
  );
};

export default Home;
