'use client';
import { List } from '@/components/list/List';
import { tmdb } from '@/utils/http-client/tmdb';

const listConfigs = [
  { title: 'Popular', query: tmdb.movies.popular() },
  { title: 'Upcoming', query: tmdb.movies.upcoming() },
  { title: 'Top Rated', query: tmdb.movies.topRated() },
  { title: 'Now Playing', query: tmdb.movies.nowPlaying() },
];

export const HomePageLists = () => {
  return (
    <div className='mt-5 mb-16 flex flex-col gap-8 overflow-hidden sm:gap-10 md:gap-12 lg:gap-14 2xl:gap-16'>
      {listConfigs.map(({ title, query }) => (
        <List key={title} title={title} query={query} />
      ))}
    </div>
  );
};
