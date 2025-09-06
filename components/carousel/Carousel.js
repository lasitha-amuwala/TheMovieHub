import React, { useState, useEffect } from 'react';

import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { useSwipeable } from 'react-swipeable';
import { useQuery } from '@tanstack/react-query';

import { Track } from './Track';
import { CarouselItem } from './CaroselItem';
import { useInterval } from '../../src/hooks/useInterval';
import { usePrevious } from '../../src/hooks/usePrevious';
import { usePageVisibility } from '../../src/hooks/usePageVisibility';
import { tmdb } from '../../src/http-client/tmdb';

import SkeletonItem from '../SkeletonItem';

export const Carousel = ({ autoplay }) => {
  const { data: slides, isLoading, isError } = useQuery(tmdb.trending.movies());

  const [sliderData, setSliderData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(1);
  const [animation, setAnimation] = useState(false);
  const [lastIndex, setLastIndex] = useState(0);
  const [isVisible, setIsVisible] = useState();
  const [delay, setDelay] = useState(15000);

  const prevIndex = usePrevious(slideIndex);

  // checks if page is active, pauses autoplay interval if inactive
  const visible = usePageVisibility();
  useEffect(() => setIsVisible(visible), [visible]);

  // enable auto play every set interval
  useInterval(() => handleClickRight, autoplay && isVisible ? delay : null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleClickRight(),
    onSwipedRight: () => handleClickLeft(),
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

  const handleClickLeft = () => handleClick('left');
  const handleClickRight = () => handleClick('right');
  const handleClick = direction => {
    (slideIndex === 0 && prevIndex === lastIndex) ||
    (slideIndex === lastIndex && prevIndex === lastIndex)
      ? setAnimation(false)
      : setAnimation(true);

    setDelay(delay + 1);

    direction === 'left'
      ? setSlideIndex(idx => (idx <= 0 ? lastIndex : idx - 1))
      : setSlideIndex(idx => (idx >= lastIndex ? 0 : idx + 1));
  };

  const handleIndex = i => setSlideIndex(i);
  const handleAnimation = i => setAnimation(i);

  const SliderButton = ({ children, classes, onClick }) => (
    <button className={`carouselButton ${classes}`} onClick={onClick}>
      {children}
    </button>
  );

  // if the datails not an array return null
  if (isLoading || isError) {
    return (
      <div className='h-[70vw] pb-24 '>
        <SkeletonItem w='100%' h='100%' />
      </div>
    );
  }

  return (
    <div className='fixed h-[70vw] w-full overflow-hidden sm:h-screen'>
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
            {sliderData.map((data, index) => (
              <CarouselItem slide={data} index={index} key={index} />
            ))}
          </ul>
        </Track>
      </div>
      <SliderButton onClick={handleClickLeft} classes='left-1 sm:left-3 '>
        <HiChevronLeft className='h-7 w-7' />
      </SliderButton>
      <SliderButton onClick={handleClickRight} classes='right-1 sm:right-3'>
        <HiChevronRight className='h-7 w-7' />
      </SliderButton>
      <div className='absolute bottom-0 h-1/6 w-full from-almostBlack lg:bg-gradient-to-t'></div>
    </div>
  );
};
