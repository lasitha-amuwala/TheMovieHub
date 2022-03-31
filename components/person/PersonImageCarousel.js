import React from 'react';
import { useQuery } from 'react-query';
import { apiQueries } from '../../src/http-client/apiQueries';
import BaseCarousel from '../BaseCarousel';
import ImageModal from '../modals/ImageModal';
import PersonImageCard from './PersonImageCard';

const PersonImageCarousel = ({ id, title }) => {
  const { data } = useQuery(apiQueries.people.images(id));
  const imagePaths = data.profiles.map(({ file_path }) => file_path.substring(1));

  return (
    <>
      <BaseCarousel
        label='Images'
        data={data.profiles}
        visibleSlides={8}
        component={<PersonImageCard />}
        isIntrinsicHeight
      />
      <ImageModal paths={imagePaths} title={title} />
    </>
  );
};

export default PersonImageCarousel;
