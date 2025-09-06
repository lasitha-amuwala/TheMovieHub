import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '../../src/http-client/tmdb';
import BaseCarousel from '../BaseCarousel';
import MovieCastCard from './MovieCastCard';

const MovieCastCarousel = ({ id }) => {
  const { data } = useQuery(tmdb.movies.credits(id));

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
