import React from 'react';
import { useQuery } from 'react-query';
import { apiQueries } from '../../src/http-client/apiQueries';
import BaseCarousel from '../BaseCarousel';
import PersonImageCard from './PersonImageCard';

const PersonImageCarousel = ({ id }) => {
  const { data } = useQuery(apiQueries.people.images(id));
  return (
    <BaseCarousel
      label='Images'
      data={data.profiles}
      visibleSlides={8}
      component={<PersonImageCard />}
      isIntrinsicHeight
    />
  );
};

export default PersonImageCarousel;
