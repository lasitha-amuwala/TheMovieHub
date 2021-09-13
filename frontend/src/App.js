import React, { useState, useEffect } from 'react';
import { getTrending } from './api/tmdb';

import { Nav } from './components/Nav';
import { Carousel } from './components/Carousel';

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
      <Nav />
      <Carousel slides={trendingList} />
    </div>
  );
};
