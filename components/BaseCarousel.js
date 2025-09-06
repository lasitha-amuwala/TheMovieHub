import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback } from 'react';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
const styles = {
  button: `absolute top-1/2 z-10 sm:mx-4 aspect-square w-[5%] -translate-y-1/2 rounded-full bg-accentBlue bg-opacity-50 opacity-0 backdrop-blur-md duration-300 hover:bg-opacity-80 group-hover:opacity-100 lg:p-4`,
};
import '../styles/embla.css';

const BaseCarousel = ({ data: slides, visibleSlides, component, label, ...rest }) => {
  const multipleSlides = slides.length > visibleSlides;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    axis: 'x',
    dragFree: true,
    align: 'start',
    active: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div>
      {label && <div className='ml-2 text-2xl font-semibold'>{label}</div>}
      <div className='group relative my-3 mb-5'>
        <div className='embla py-2 relative'>
          <button
            className='embla__prev absolute left-0 sm:mx-4 top-1/2 z-10 aspect-square w-[5%] -translate-y-1/2 bg-accentBlue bg-opacity-50 backdrop-blur-md rounded-full duration-300 hover:bg-opacity-80 group-hover:opacity-100 opacity-0'
            onClick={scrollPrev}
          >
            <HiChevronLeft className='h-full w-full' />
          </button>
          <button
            className='embla__next absolute right-0 sm:mx-4 top-1/2 z-10 aspect-square  w-[5%] -translate-y-1/2 bg-accentBlue bg-opacity-50 backdrop-blur-md rounded-full duration-300 hover:bg-opacity-80 group-hover:opacity-100 opacity-0'
            onClick={scrollNext}
          >
            <HiChevronRight className='h-full w-full' />
          </button>
          <div class='embla__viewport' ref={emblaRef}>
            <div className='embla__container '>
              {slides.map((slide, i) => (
                <div className='embla__slide' key={i}>
                  {React.cloneElement(component, { data: slide })}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <CarouselProvider
          visibleSlides={visibleSlides}
          touchEnabled={multipleSlides}
          totalSlides={data.length}
          step={visibleSlides}
          {...rest}
        >
          {multipleSlides && (
            <>
              <ButtonBack className={`left-0 ${styles.button}`}>
                <HiChevronLeft className='h-full w-full' />
              </ButtonBack>
              <ButtonNext className={`right-0 ${styles.button}`}>
                <HiChevronRight className='h-full w-full' />
              </ButtonNext>
              <div className='flex w-full justify-end'>
                {data.map((slide, i) => i % visibleSlides == 0 && <Dot key={i} slide={i} />)}
              </div>
            </>
          )}
          <Slider className='py-2'>
            {data.map((slide, i) => (
              <Slide key={i} index={i}>
                {React.cloneElement(component, { data: slide })}
              </Slide>
            ))}
          </Slider>
        </CarouselProvider> */}
      </div>
    </div>
  );
};

export default BaseCarousel;
