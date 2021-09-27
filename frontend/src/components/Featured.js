import React, { useState } from 'react';

import { ReactComponent as ChevronRight } from '../icons/chevronRight.svg';
import { ReactComponent as ChevronLeft } from '../icons/chevronLeft.svg';

export const Featured = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const length = slides.length;

  // decrement current slide and go back to the end if at the start of the list
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  // increment current slide and go to the beginning if at the end of the list
  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);

  // if the data is not an array return null
  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="relative flex justify-center items-center w-screen">
      <div
        onClick={prevSlide}
        className="absolute flex items-center p-4 left-3 rounded-full bg-black bg-opacity-20 hover:bg-opacity-50 z-10 cursor-pointer select-none"
      >
        <ChevronLeft className="h-6 w-6 text-white hover:opacity-100" />
      </div>
      <div
        onClick={nextSlide}
        className="absolute flex items-center p-4 right-3 rounded-full bg-black bg-opacity-20 hover:bg-opacity-50 z-10 cursor-pointer select-none"
      >
        <ChevronRight className="h-6 w-6 text-white hover:opacity-100" />
      </div>

      {slides.map((slide, index) => {
        return (
          <div className="max-h-90vh overflow-hidden relative">
            {index === current && (
              <>
                <div className="w-screen h-16/9">
                  <img
                    className="w-full"
                    src={`https://image.tmdb.org/t/p/original/${slide.backdrop_path}`}
                    alt={`${slide.title.split(' ').join('-')}-poster`}
                  />
                </div>
                <div className="absolute left-24 bottom-16 text-white w-2/5 bg-opacity-30 bg-gray-800 p-6 rounded-xl backdrop-filter backdrop-blur">
                  <div className="text-4xl font-semibold">{slide.title}</div>
                  <div className="py-2">
                    <p
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: '4',
                        WebkitBoxOrient: 'vertical',
                      }}
                      className="text-base overflow-hidden max-h-27"
                    >
                      {slide.overview}
                    </p>
                  </div>
                  <div>
                    <button className="items-center flex gap-1 text-lg px-4 py-2 font-semibold bg-blue-700 bg-opacity-40 rounded-lg hover:bg-opacity-60 focus:bg-opacity-60 focus:ring-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      More Info
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

/*
  const filterImages = () => {
    let newSlideList = [];
    slides.map((slide) => {
      let img = new Image();
      img.src = `https://image.tmdb.org/t/p/original/${slide.backdrop_path}`;
      img.onload = () =>
        img.height > 1080 && img.width > 1920 && newSlideList.push(slide);
    });
    return newSlideList;
  }
  useEffect(async () => {
    let newSlideList = await filterImages()
    setSlideList(newSlideList);
  }, [slides]);
*/
