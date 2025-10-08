'use client';

import Blur from '@/components/Blur';
import Image from '@/components/Image';
import useApiConfiguration from '@/hooks/useApiConfig';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { tmdb } from '@/utils/http-client/tmdb';
import { useQueries, useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useRef, useState, ReactNode } from 'react';

export const Backdrop = ({ children }: { children: ReactNode }) => {
  const { getImageUrl } = useApiConfiguration();

  const imageRef = useRef<HTMLDivElement | null>(null);
  const breakpoint = useBreakpoints();
  const scrollPosition = useScrollPosition();
  const [spotlightMovieID, setSpotlightMovieID] = useState<number>(0);

  const scrollDistance = imageRef.current ? imageRef.current.clientHeight : 1000;
  const scrollDifference = scrollPosition / scrollDistance;
  const blurAmount = scrollDifference * 64;
  const opacityAmount = scrollDifference > 0.75 ? 0.5 : scrollDifference;

  const {
    data: trendingDaily,
    isSuccess: trendingSuccess,
    isLoading,
    isError,
    error,
  } = useQuery(tmdb.trending.moviesWeek());

  useEffect(() => {
    if (trendingSuccess) {
      const rand = Math.floor(Math.random() * 10);
      setSpotlightMovieID(trendingDaily.results[rand].id);
    }
  }, [trendingDaily, trendingSuccess]);

  const movieQueries = useQueries({
    queries: [
      { ...tmdb.movies.movie(spotlightMovieID.toString()), enabled: !!spotlightMovieID },
      { ...tmdb.movies.images(spotlightMovieID.toString()), enabled: !!spotlightMovieID },
    ],
  });
  const [movieQuery, imageQuery] = movieQueries;
  const movieSuccess = movieQuery?.isSuccess;
  const movieData = movieQuery?.data;

  const imageSuccess = imageQuery?.isSuccess;
  const imageData = imageQuery?.data;

  const movie = movieSuccess ? movieData : { genres: { id: '', name: '' } };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message} </div>;

  return (
    <>
      <div ref={imageRef} className='backgroundGradient fixed hidden h-full w-full sm:block'>
        <Blur blurRadius={blurAmount}>
          <Image
            src={getImageUrl(movie.backdrop_path, { original: true })}
            fill
            className='object-cover object-top'
            alt={`${movie.name} backdrop`}
            quality={100}
            priority
          />
        </Blur>
      </div>
      <div
        style={{
          backgroundColor: Object.keys(breakpoint)[0] ? `rgba(0,0,0, ${opacityAmount})` : undefined,
        }}
        className='absolute top-0 w-full'
      >
        <div className='h-[55vh] sm:h-[90vh]'>
          <div className='h-full sm:mx-5% sm:w-1/3 sm:pb-24'>
            <div className='relative h-full'>
              <div className='block h-full sm:hidden'>
                <Image
                  fill
                  src={getImageUrl(movie.backdrop_path, { original: true })}
                  alt={`${movie.name} backdrop`}
                  className='object-cover'
                  quality={100}
                />
              </div>
              <div className='absolute bottom-0 flex h-full max-h-56 w-full flex-col items-center justify-end gap-4 bg-gradient-to-t from-black to-transparent px-10 sm:max-h-full sm:items-start sm:gap-5 sm:from-transparent sm:px-0'>
                {imageSuccess ? (
                  <div className='max-h relative h-full max-h-28 w-full sm:max-h-72'>
                    <Image
                      fill
                      src={getImageUrl(imageData.logos[0].file_path, { original: true })}
                      alt={`${movie.name} logo`}
                      className='sm:object-left-bottom object-contain'
                      priority
                    />
                  </div>
                ) : (
                  <div className='text-3xl font-bold sm:text-5xl'>{movie.title}</div>
                )}
                <div className='text-sm'>
                  {Object.keys(movie.genres).map((genre, i) => (
                    <span
                      key={i}
                      className={classNames({
                        'after:px-2 after:content-["•"]': i + 1 < movie.genres.length,
                      })}
                    >
                      {movie.genres[genre].name}
                    </span>
                  ))}
                </div>
                <p className='hidden sm:block'>{movie.overview}</p>
                <Link href={`/movie/${movie.id}`} passHref>
                  <button className='w-24 rounded bg-accentBlue/50 py-2 px-2 text-center font-semibold backdrop-blur-lg duration-200 hover:bg-accentBlueHover/50'>
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
