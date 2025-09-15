import { Children } from 'react';
import { DotButton } from './EmblaCarouselDotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import { useDotButton } from '../../src/hooks/embla/useDotButton';

const EmblaCarousel = ({
  options = { align: 'start', slidesToScroll: 'auto' },
  breakPointNumSlides = { normal: 4, sm: 6, lg: 8 },
  children,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevBtnClick, onNextBtnClick } =
    usePrevNextButtons(emblaApi);

  const renderButtons = !(selectedIndex === 0 && scrollSnaps.length <= 1);
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
        {renderButtons && (
          <>
            <PrevButton onClick={onPrevBtnClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextBtnClick} disabled={nextBtnDisabled} />
          </>
        )}
        <div className='embla__viewport' ref={emblaRef}>
          <div className='embla__container'>
            {Children.map(children, (child, i) => (
              <div className='embla__slide' key={i}>
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
      {renderButtons && (
        <div className='embla__dots'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default EmblaCarousel;
