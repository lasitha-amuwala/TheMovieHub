import React, { useState, useEffect, useRef } from 'react';
import NextImage from '../NextImage';
import useApiConfiguration from '../../src/hooks/useApiConfig';
import { useQuery } from 'react-query';
import { tmdb } from '../../src/http-client/tmdb';
import Blur from 'react-blur';
import classNames from 'classnames';
import Link from 'next/link';

const Spotlight = ({ children }) => {
  const [show, setShow] = useState(true);

  const ImageRef = useRef(null);
  const { getImageUrl } = useApiConfiguration();
  const onScroll = () => setShow(scrollY < ImageRef.current.clientHeight * 0.05);

  useEffect(() => {
    addEventListener('scroll', onScroll);
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const { data: slides } = useQuery(tmdb.trending.movies());
  const item = slides.results[new Date().getDay()];
  const { data: movieImages, isSuccess: imageSuccess } = useQuery(tmdb.movies.images(item.id), {
    enabled: !!item,
  });

  return (
    <>
      <div ref={ImageRef} className='backgroundGradient fixed hidden h-full w-full sm:block'>
        <div className='relative h-full w-full'>
          <NextImage
            src={getImageUrl(item.backdrop_path, { original: true })}
            layout='fill'
            objectFit='cover'
            quality={100}
            priority
          />
          <div
            className={classNames('absolute top-0 h-full w-full duration-500', {
              'opacity-0': show,
            })}
          >
            <Blur
              img={getImageUrl(item.backdrop_path, { original: true })}
              blurRadius={64}
              className='h-full'
              shouldResize
              resizeInterval={0}
            />
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'transform-opacity absolute top-0 w-full bg-black duration-500 sm:bg-almostBlack/75',
          {
            'sm:bg-almostBlack/0': show,
          }
        )}
      >
        <div className='relative h-[55vh] sm:h-[90vh]'>
          <div className='h-full sm:mx-5% sm:w-1/3 sm:pb-24'>
            <div className='relative h-full'>
              <div className='relative block h-full sm:hidden'>
                <NextImage
                  layout='fill'
                  src={getImageUrl(item.backdrop_path, { original: true })}
                  objectFit='cover'
                  quality={100}
                />
              </div>
              <div className='absolute bottom-0 flex h-full max-h-56 w-full flex-col items-center justify-end gap-5 bg-gradient-to-t from-black to-transparent px-10 sm:max-h-full sm:items-start sm:from-transparent sm:px-0'>
                <div className='max-h relative h-full max-h-28 w-full sm:max-h-72'>
                  {movieImages && imageSuccess && (
                    <NextImage
                      src={getImageUrl(movieImages.logos[0].file_path, { original: true })}
                      layout='fill'
                      objectFit='contain'
                      className='sm:object-left-bottom'
                      priority
                    />
                  )}
                </div>
                <p className='hidden sm:block'>{item.overview}</p>
                <Link href={`/movie/${item.id}`} passHref>
                  <button className='w-24 rounded bg-accentBlue/50 p-2 text-center font-semibold backdrop-blur-lg duration-200 hover:bg-accentBlueHover/50'>
                    More info
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Spotlight;
