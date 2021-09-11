import React, { useState, useEffect } from 'react';
import { Nav } from './components/Nav';
import { Box } from '@chakra-ui/react';
import { getTrending } from './api/tmdb';
import { Card } from './components/Card';

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
      <Box disaply="flex" flexDirection="row">
        {trendingList.map((item) => (
          <Card data={item}></Card>
        ))}
      </Box>
    </div>
  );
};
