import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '../../src/http-client/tmdb';
import BaseCarousel from '../BaseCarousel';
import MovieCastCard from './MovieCastCard';

const MovieCastCarousel = ({ id }) => {
  const { data, isLoading, isSuccess } = useQuery(tmdb.movies.credits(id));

  if (isLoading) {
    return <div>Loading</div>;
  }
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
