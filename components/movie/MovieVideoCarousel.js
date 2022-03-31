import React from 'react';
import { useQuery } from 'react-query';
import { apiQueries } from '../../src/http-client/apiQueries';
import BaseCarousel from '../BaseCarousel';
import VideoModal from '../modals/VideoModal';
import MovieVideoCard from './MovieVideoCard';

const MovieVideoCarousel = ({ id }) => {
  const { data } = useQuery(apiQueries.movies.videos(id));

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
