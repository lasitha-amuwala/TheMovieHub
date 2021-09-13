import React, { useState } from 'react';

export const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);

  const LeftChevron = () => (
    <div
      onClick={prevSlide}
      className="absolute left-8 z-10 cursor-pointer select-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );

  const RightChevron = () => (
    <div
      onClick={nextSlide}
      className="absolute right-8 z-10 cursor-pointer select-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="relative flex justify-center items-center">
      <LeftChevron />
      <RightChevron />
      {slides.map((slide, index) => {
        console.log(slide);
        return (
          <div className={index === current ? '' : ''}>
            {index === current && (
              <img
                className="w-screen"
                src={`https://image.tmdb.org/t/p/original/${slide.backdrop_path}`}
                alt={`${slide.title.split(' ').join('-')}-poster`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

/*
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
*/

/**
 *     <div>
      <div className="max-h-screen overflow-hidden">
        <div>{trendingList.length !== 0 ? render() : null}</div>
      </div>
      <div className="h-20 text-white bg-gray-600">
        <button classname="bg-gray-900 p-4" onClick={handlePrev}>
          Prev
        </button>
        <br />
        <button classname="bg-gray-900 p-4" onClick={handleNext}>
          next
        </button>
      </div>
    </div>
 */
