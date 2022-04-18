import React, { useState, useEffect, useRef } from 'react';
import NextImage from '../NextImage';
import useApiConfiguration from '../../src/hooks/useApiConfig';
import { useQuery } from 'react-query';
import { tmdb } from '../../src/http-client/tmdb';
import Blur from 'react-blur';
import classNames from 'classnames';
import Link from 'next/link';

const Carousel2 = ({ children }) => {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  const ImageRef = useRef(null);

  const { getImageUrl } = useApiConfiguration();

  const onScroll = () => setShow(scrollY < ImageRef.current.clientHeight * 0.05);

  useEffect(() => {
    addEventListener('scroll', onScroll);
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const { data: slides, isLoading, isError } = useQuery(tmdb.trending.movies());
  const item = slides.results[count];

  const { data: movieImages } = useQuery(tmdb.movies.images(item.id));

  return (
    <div>
      <div ref={ImageRef} className='backgroundGradient fixed hidden h-full w-full sm:block'>
        <div className={classNames('opacity-0 duration-700', { 'opacity-100': show })}>
          <NextImage
            layout='fill'
            objectFit='cover'
            src={getImageUrl(item.backdrop_path, { original: true })}
            quality={100}
          />
        </div>
        <Blur
          img={getImageUrl(item.backdrop_path, { original: true })}
          blurRadius={64}
          className='h-full'
          shouldResize
        />
      </div>
      <div
        className={classNames('absolute top-0 w-full bg-almostBlack/75 duration-700', {
          'sm:bg-almostBlack/0': show,
        })}
      >
        <div className='relative h-[55vh] sm:h-[90vh]'>
          <div className='h-full sm:mx-5% sm:w-1/3 sm:pb-52'>
            <div className='relative h-full'>
              <div className='relative block h-full sm:hidden'>
                <NextImage
                  layout='fill'
                  src={getImageUrl(item.backdrop_path, { original: true })}
                  objectFit='cover'
                />
              </div>
              <div className='absolute bottom-0 flex w-full flex-col items-center gap-5 bg-gradient-to-t from-almostBlack to-transparent sm:items-start sm:from-transparent'>
                {movieImages && movieImages.logos[0] && (
                  <img
                    src={getImageUrl(movieImages.logos[0].file_path, { original: true })}
                    className='max-h-44 object-contain px-16 sm:max-h-72 sm:px-0'
                  />
                )}
                <p className='hidden sm:block'>{item.overview}</p>
                <Link href={`/movie/${item.id}`}>
                  <a className='w-24 rounded-md bg-accentBlue/50 p-2 text-center font-semibold backdrop-blur-lg duration-200 hover:bg-accentBlueHover/50'>
                    More info
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Carousel2;

/**          <div className='relative flex h-full flex-col justify-end gap-5 sm:mx-[5%] sm:w-1/3 sm:pb-36'>
            <div className='relative h-full w-full sm:hidden'>
              <NextImage
                layout='fill'
                src={getImageUrl(item.backdrop_path, { original: true })}
                objectFit='cover'
              />
            </div>
            <div className='absolute bottom-0 text-7xl font-bold sm:static'>
              <div className='mx-16 sm:px-0 sm:pr-5%'>
                {movieImages && movieImages.logos[0] && (
                  <img
                    src={getImageUrl(movieImages.logos[0].file_path, { original: true })}
                    className='max-h-44 w-full object-contain 3xl:w-4/5'
                  />
                )}
              </div>
            </div>
            <h1 className='hidden leading-normal sm:block'>{item.overview}</h1>
            <div></div>
          </div> */
