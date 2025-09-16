import { useState, useCallback } from 'react';
import NextImage from '../NextImage';
import useApiConfiguration from '@/hooks/useApiConfig';
import InfoCard from './InfoCard';
import { Spinner } from '../Spinner';

export const CarouselItem = ({ slide, index }) => {
  const { getImageUrl } = useApiConfiguration();

  const [isImageLoaded, setImageIsLoaded] = useState(false);
  const onLoad = useCallback(() => setImageIsLoaded(true), []);

  return (
    <li className='relative h-full min-w-full'>
      <NextImage
        src={getImageUrl(slide.backdrop_path, { original: true })}
        alt={slide.title}
        className='select-none object-cover object-top'
        fill
        quality={100}
        onLoad={onLoad}
        priority={index == 1}
      />
      {!isImageLoaded && <Spinner />}
      <InfoCard slide={slide} />
    </li>
  );
};
