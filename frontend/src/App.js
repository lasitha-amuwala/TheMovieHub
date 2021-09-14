import React, { useState, useEffect } from 'react';
import { getTrending } from './api/tmdb';

import { Navbar } from './components/Navbar';
import { Featured } from './components/Featured';
import { List } from './components/List';

export const App = () => {
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    getTrending().then((res) => {
      console.log(res);
      setTrendingList(res.data.results);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Featured slides={trendingList} />
      <List data={trendingList}/>
    </div>
  );
};
