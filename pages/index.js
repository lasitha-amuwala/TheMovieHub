import React from 'react';
import Head from 'next/head';
import { List } from '../components/List';
import { Carousel } from '../components/Carousel/Carousel';
import { QueryClient, useQuery, dehydrate } from 'react-query';
import { apiQueries } from '../utils/http-client/apiQueries';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.fetchQuery(apiQueries.trending.movies()),
    queryClient.fetchQuery(apiQueries.movies.nowPlaying()),
    queryClient.fetchQuery(apiQueries.movies.popular()),
    queryClient.fetchQuery(apiQueries.movies.topRated()),
    queryClient.fetchQuery(apiQueries.movies.upcoming()),
  ]);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Home = () => {
  const { data: trendingList } = useQuery(apiQueries.trending.movies());
  const { data: nowPlayingList } = useQuery(apiQueries.movies.nowPlaying());
  const { data: popularList } = useQuery(apiQueries.movies.popular());
  const { data: topRatedList } = useQuery(apiQueries.movies.topRated());
  const { data: upcomingList } = useQuery(apiQueries.movies.upcoming());

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <Head>
        <title>{process.env.title}</title>
      </Head>
      <Carousel slides={trendingList.results} autoplay />
      <div className='flex flex-col gap-9'>
        <List data={popularList.results} title='Popular' />
        <List data={topRatedList.results} title='Top Rated' />
        <List data={nowPlayingList.results} title='Now Playing' />
        <List data={upcomingList.results} title='Upcoming' />
      </div>
    </div>
  );
};
export default Home;
