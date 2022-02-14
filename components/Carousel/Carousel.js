import React, { useState, useEffect } from 'react';
import { useInterval, usePrevious } from '../../hooks/hooks';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';

import { Track } from './Track';
import { CarouselItem } from './CaroselItem';
import { useSwipeable } from 'react-swipeable';

export const Carousel = ({ slides, autoplay }) => {
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
    if (slides.length > 0) {
      let list = slides.concat(slides[0]);
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

  // if the datails not an array return null
  if (!Array.isArray(sliderData) || !sliderData.length) return null;

  const SliderButton = ({ children, classes, onClick }) => (
    <button className={`carouselButton ${classes}`} onClick={onClick}>
      {children}
    </button>
  );

  return (
    <div className='relative items-center justify-center '>
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
      <div {...handlers} className='relative w-full overflow-hidden'>
        <Track
          animation={animation}
          slideIndex={slideIndex}
          lastIndex={lastIndex}
          prevIndex={prevIndex}
          handleIndex={handleIndex}
          handleAnimation={handleAnimation}
        >
          <ul className='relative flex list-none'>
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
