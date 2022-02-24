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
  const fetchData = () => [
    useQuery(apiQueries.movies.nowPlaying()),
    useQuery(apiQueries.movies.popular()),
    useQuery(apiQueries.movies.topRated()),
    useQuery(apiQueries.movies.upcoming()),
  ];

  const [
    { data: nowPlaying, isLoading: isNowPlayingLoading },
    { data: popular, isLoading: isPopularLoading },
    { data: topRated, isLoading: isTopRatedLoading },
    { data: upcoming, isLoading: isUpcomingLoading },
  ] = fetchData();

  return (
    <div className='overflow-hidden'>
      <Head>
        <title>{process.env.title}</title>
      </Head>
      <Carousel autoplay />
      <div className='flex flex-col sm:gap-2 md:gap-4 lg:gap-6 2xl:gap-9'>
        <List data={popular.results} title='Popular' />
        <List data={topRated.results} title='Top Rated' />
        <List data={nowPlaying.results} title='Now Playing' />
        <List data={upcoming.results} title='Upcoming' />
      </div>
    </div>
  );
};
export default Home;
