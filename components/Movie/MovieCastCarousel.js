import React from 'react';
import { useQuery } from 'react-query';
import { apiQueries } from '../../src/http-client/apiQueries';
import BaseCarousel from '../BaseCarousel';
import MovieCastCard from './MovieCastCard';

const MovieCastCarousel = ({ id }) => {
  const { data } = useQuery(apiQueries.people.movie(id));

  return (
    <BaseCarousel
      label='Cast'
      data={data.cast}
      visibleSlides={6}
      component={<MovieCastCard />}
      isIntrinsicHeight
    />
  );
};

export default MovieCastCarousel;
