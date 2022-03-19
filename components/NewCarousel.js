import React from 'react';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  Dot,
  Slide,
  Slider,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const styles = {
  button: `absolute top-1/2 z-10 mx-4 aspect-square w-[5%] -translate-y-1/2 rounded-full bg-accentBlue bg-opacity-50 opacity-0 backdrop-blur-md duration-300 hover:bg-opacity-80 group-hover:opacity-100 lg:p-4`,
};

const Carousel = ({ data, visibleSlides, component, label, ...rest }) => {
  return (
    <div>
      <div className='ml-2 text-2xl font-semibold'>{label}</div>
      <div className='group relative my-3 mb-5'>
        <CarouselProvider
          totalSlides={data.length}
          visibleSlides={visibleSlides}
          step={visibleSlides}
          {...rest}
        >
          <ButtonBack className={`left-0 ${styles.button}`}>
            <HiChevronLeft className='h-full w-full' />
          </ButtonBack>
          <ButtonNext className={`right-0 ${styles.button}`}>
            <HiChevronRight className='h-full w-full' />
          </ButtonNext>
          <Slider>
            {data.map((slide, index) => (
              <Slide index={index}>{React.cloneElement(component, { data: slide })}</Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
    </div>
  );
};

export default Carousel;
