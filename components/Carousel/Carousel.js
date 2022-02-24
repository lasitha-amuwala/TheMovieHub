import React, { useState, useEffect } from 'react';
import { useInterval, usePrevious } from '../../hooks/hooks';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { Track } from './Track';
import { CarouselItem } from './CaroselItem';
import { useSwipeable } from 'react-swipeable';
import { useQuery } from 'react-query';
import { apiQueries } from '../../utils/http-client/apiQueries';
import SkeletonItem from '../SkeletonItem';

export const Carousel = ({ autoplay }) => {
  const {
    data: slides,
    isLoading,
    isError,
  } = useQuery(apiQueries.trending.movies());

  const [sliderData, setSliderData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(1);
  const [animation, setAnimation] = useState(false);
  const [lastIndex, setLastIndex] = useState(0);
  const [delay, setDelay] = useState(10000);

  const prevIndex = usePrevious(slideIndex);
  // enable auto play every set interval
  useInterval(() => handleClick('right'), autoplay ? delay : null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleClick('right'),
    onSwipedRight: () => handleClick('left'),
  });

  // Add first element to the end of the list to create an infinite carousel
  useEffect(() => {
    if (slides.results.length > 0) {
      let list = slides.results.concat(slides.results[0]);
      list.unshift(list[list.length - 2]);
      setSliderData(list);
      setLastIndex(list.length - 1);
    }
  }, [slides]);

  const handleClick = (direction) => {
    (slideIndex === 0 && prevIndex === lastIndex) ||
    (slideIndex === lastIndex && prevIndex === lastIndex)
      ? setAnimation(false)
      : setAnimation(true);

    setDelay(delay + 1);

    direction === 'left'
      ? setSlideIndex((idx) => (idx <= 0 ? lastIndex : idx - 1))
      : setSlideIndex((idx) => (idx >= lastIndex ? 0 : idx + 1));
  };

  const handleIndex = (i) => setSlideIndex(i);
  const handleAnimation = (i) => setAnimation(i);

  const SliderButton = ({ children, classes, onClick }) => (
    <button className={`carouselButton ${classes}`} onClick={onClick}>
      {children}
    </button>
  );

  // if the datails not an array return null
  if (isLoading || isError) {
    return (
      <div className='h-[55.5vw] max-h-85vh pb-24 '>
        <SkeletonItem w='100%' h='100%' />
      </div>
    );
  }

  return (
    <div className='relative h-[55.5vw] max-h-85vh w-full overflow-hidden'>
      <SliderButton
        onClick={() => handleClick('left')}
        classes='left-1 sm:left-3 '
      >
        <HiChevronLeft className='h-7 w-7 text-white' />
      </SliderButton>
      <SliderButton
        onClick={() => handleClick('right')}
        classes='right-1 sm:right-3'
      >
        <HiChevronRight className='h-7 w-7 text-white' />
      </SliderButton>
      <div {...handlers} className='h-full w-full'>
        <Track
          animation={animation}
          slideIndex={slideIndex}
          lastIndex={lastIndex}
          prevIndex={prevIndex}
          handleIndex={handleIndex}
          handleAnimation={handleAnimation}
        >
          <ul className='flex h-full w-full list-none'>
            {sliderData.map((data, i) => (
              <CarouselItem slide={data} key={i} />
            ))}
          </ul>
        </Track>
      </div>
      <div className='absolute bottom-0 h-1/6 w-full from-almostBlack lg:bg-gradient-to-t'></div>
    </div>
  );
};
