import React from 'react';
import { useQuery } from 'react-query';
import { apiQueries } from '../../src/http-client/apiQueries';
import BaseCarousel from '../BaseCarousel';
import MovieVideoCard from './MovieVideoCard';

const MovieVideoCarousel = ({ id }) => {
  const { data } = useQuery(apiQueries.movies.videos(id));

  return (
    <BaseCarousel
      label='Videos'
      data={data.results}
      visibleSlides={4}
      component={<MovieVideoCard />}
      isIntrinsicHeight
    />
  );
};

export default MovieVideoCarousel;
