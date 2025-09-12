import { cloneElement } from 'react';
import { DotButton } from './EmblaCarouselDotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import { useDotButton } from '../../src/hooks/embla/useDotButton';

const EmblaCarousel = ({
  slides,
  options,
  component,
  disableSlideLink,
  breakPointNumSlides = { normal: 4, sm: 6, lg: 8 },
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section
      className='embla'
      style={{
        '--slide-size': `calc(100% / ${breakPointNumSlides.normal})`,
        '--slide-size-sm': `calc(100% / ${breakPointNumSlides.sm})`,
        '--slide-size-lg': `calc(100% / ${breakPointNumSlides.lg})`,
      }}
    >
      <div className='my-3 mb-5 group relative'>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />

        <div className='embla__viewport' ref={emblaRef}>
          <div className='embla__container'>
            {slides.map((slide, index) => (
              <div className='embla__slide' key={index}>
                {cloneElement(component, { data: slide, disableLink: disableSlideLink })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='embla__dots'>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
          />
        ))}
      </div>
    </section>
  );
};

export default EmblaCarousel;
