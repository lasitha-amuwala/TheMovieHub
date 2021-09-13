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
      <div className='h-screen'>

      </div>
    </div>
  );
};

/*

    background-image: -webkit-gradient(linear,left top,left bottom,color-stop(10%,rgba(0,0,0,.7)),color-stop(10%,rgba(0,0,0,0)));
    background-image: -webkit-linear-gradient(top,rgba(0,0,0,.7) 10%,rgba(0,0,0,0));
    background-image: -moz- oldlinear-gradient(top,rgba(0,0,0,.7) 10%,rgba(0,0,0,0));
    background-image: -o-linear-gradient(top,rgba(0,0,0,.7) 10%,rgba(0,0,0,0));
    background-image: linear-gradient(to bottom,rgba(0,0,0,.7) 10%,rgba(0,0,0,0));
    */
