import React, { useState, useEffect } from 'react';
import { getTrending, getPopular, getTopRated, getUpcoming } from './api/tmdb';

import { Navbar } from './components/Navbar';
import { Featured } from './components/Featured';
import { List } from './components/List';

export const App = () => {
  const [trendingList, setTrendingList] = useState([]);
  const [popularList, setPopularList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  const [upcomingList, setUpcomingList] = useState([]);

  useEffect(() => {
    getTrending().then((res) => setTrendingList(res.data.results));
    getPopular().then((res) => setPopularList(res.data.results));
    getTopRated().then((res) => setTopRatedList(res.data.results));
    getUpcoming().then((res) => setUpcomingList(res.data.results));
  }, []);

  return (
    <div className="overflow-hidden 3xl:max-w-full">
      <Navbar />
      <Featured slides={trendingList} />
      <List data={trendingList} title="Trending Now" />
      <List data={popularList} title="Popular" />
      <List data={topRatedList} title="Top Rated" />
      <List data={upcomingList} title="Upcoming" />
    </div>
  );
};
