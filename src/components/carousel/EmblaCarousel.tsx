'use client';
import { DotButton } from './EmblaCarouselDotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useDotButton } from '@/hooks/embla/useDotButton';
import React from 'react';

type Props = {
  options?: EmblaOptionsType;
  breakPointNumSlides: { normal: number; sm: number; lg: number };
  children: React.ReactNode;
};

const defaultOptions: EmblaOptionsType = {
  align: 'start',
  slidesToScroll: 'auto',
  skipSnaps: true,
  dragFree: true,
};

const EmblaCarousel = ({
  options = defaultOptions,
  breakPointNumSlides = { normal: 4, sm: 6, lg: 8 },
  children,
}: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [WheelGesturesPlugin()]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevBtnClick, onNextBtnClick } =
    usePrevNextButtons(emblaApi);

  const renderButtons = !(selectedIndex === 0 && scrollSnaps.length <= 1);
  
  return (
    <section
      className='embla'
      style={
        {
          '--slide-size': `calc(100% / ${breakPointNumSlides.normal})`,
          '--slide-size-sm': `calc(100% / ${breakPointNumSlides.sm})`,
          '--slide-size-lg': `calc(100% / ${breakPointNumSlides.lg})`,
        } as React.CSSProperties
      }
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
            {React.Children.map(children, (child, i) => (
              <div className='embla__slide' key={i}>
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
      {renderButtons && (
        <div className='embla__dots invisible sm:visible'>
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
