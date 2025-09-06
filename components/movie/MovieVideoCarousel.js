import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '../../src/http-client/tmdb';
import BaseCarousel from '../BaseCarousel';
import VideoModal from '../modals/VideoModal';
import MovieVideoCard from './MovieVideoCard';

const MovieVideoCarousel = ({ id }) => {
  const { data } = useQuery(tmdb.movies.videos(id));

  const videoPaths = data.results.map(({ name, key }) => {
    return { name, key };
  });

  return (
    <>
      <BaseCarousel
        label='Videos'
        data={data.results}
        visibleSlides={4}
        component={<MovieVideoCard />}
        isIntrinsicHeight
      />
      <VideoModal paths={videoPaths} />
    </>
  );
};

export default MovieVideoCarousel;
