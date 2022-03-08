import React from 'react';
import Image from 'next/image';
import InfoCard from './InfoCard';
import { Spinner } from '../Spinner';

export const CarouselItem = ({ slide, index }) => {
  const [isImageLoaded, setImageIsLoaded] = React.useState(false);
  const onLoad = React.useCallback(() => setImageIsLoaded(true), []);

  return (
    <li className='relative h-full min-w-full'>
      <div className='relative h-full w-full'>
        <Image
          layout='fill'
          quality={100}
          onLoad={onLoad}
          priority={index == 1}
          className='relative block h-full w-full select-none object-cover object-top'
          src={`https://image.tmdb.org/t/p/original/${slide.backdrop_path}`}
          alt={`${slide.title.split(' ').join('-')}-poster`}
        />
        {!isImageLoaded && <Spinner />}
      </div>
      <InfoCard slide={slide} />
    </li>
  );
};
