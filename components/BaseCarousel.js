import React from 'react';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const styles = {
  button: `absolute top-1/2 z-10 mx-4 aspect-square w-[5%] -translate-y-1/2 rounded-full bg-accentBlue bg-opacity-50 opacity-0 backdrop-blur-md duration-300 hover:bg-opacity-80 group-hover:opacity-100 lg:p-4`,
};

const BaseCarousel = ({ data, visibleSlides, component, label, ...rest }) => (
  <div>
    {label && <div className='ml-2 text-2xl font-semibold'>{label}</div>}
    <div className='group relative my-3 mb-5'>
      <CarouselProvider
        visibleSlides={visibleSlides}
        totalSlides={data.length}
        step={visibleSlides}
        {...rest}
      >
        <ButtonBack className={`left-0 ${styles.button}`}>
          <HiChevronLeft className='h-full w-full' />
        </ButtonBack>
        <ButtonNext className={`right-0 ${styles.button}`}>
          <HiChevronRight className='h-full w-full' />
        </ButtonNext>
        <div className='flex w-full justify-end'>
          {data.map((slide, i) => i % visibleSlides == 0 && <Dot key={i} slide={i} />)}
        </div>
        <Slider className='py-2'>
          {data.map((slide, i) => (
            <Slide key={i} index={i}>
              {React.cloneElement(component, { data: slide })}
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </div>
  </div>
);

export default BaseCarousel;
