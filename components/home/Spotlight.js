import React, { useEffect, useRef, useState } from 'react';
import Blur from '../Blur.js';
import Link from 'next/link';
import classNames from 'classnames';
import NextImage from '../NextImage';
import useApiConfiguration from '../../src/hooks/useApiConfig';

import { tmdb } from '../../src/http-client/tmdb';
import { useQuery, useQueries } from '@tanstack/react-query';
import { useScrollPosition } from '../../src/hooks/useScrollPosition';
import { useBreakpoints } from '../../src/hooks/useBreakpoints';

const Spotlight = ({ children }) => {
  const { getImageUrl } = useApiConfiguration();
  const breakpoint = useBreakpoints();
  const imageRef = useRef();
  const [spotlightMovieID, setSpotlightMovieID] = useState(null);

  const scrollPosition = useScrollPosition();
  const scrollDistance = imageRef.current ? imageRef.current.clientHeight : 1000;
  const scrollDifference = scrollPosition / scrollDistance;
  const blurAmount = scrollDifference * 64;
  const opacityAmount = scrollDifference > 0.75 ? 0.5 : scrollDifference;

  // fetch trending movie list
  const { data: trendingDaily, isSuccess: trendingSuccess } = useQuery(tmdb.trending.moviesWeek());

  //
  useEffect(() => {
    if (trendingSuccess) {
      const rand = Math.floor(Math.random() * trendingDaily.results.length);
      setSpotlightMovieID(trendingDaily.results[rand].id);
    }
  }, [trendingDaily, trendingSuccess]);

  const movieQueries = useQueries({
    queries: [
      { ...tmdb.movies.movie(spotlightMovieID), enabled: !!spotlightMovieID },
      { ...tmdb.movies.images(spotlightMovieID), enabled: !!spotlightMovieID },
    ],
  });
  const [movieQuery, imageQuery] = movieQueries;
  const movieSuccess = movieQuery?.isSuccess;
  const movieData = movieQuery?.data;

  const imageSuccess = imageQuery?.isSuccess;
  const imageData = imageQuery?.data;

  const movie = movieSuccess ? movieData : { genres: { id: '', name: '' } };

  if (movie == {}) return <div></div>;

  return (
    <>
      <div ref={imageRef} className='backgroundGradient fixed hidden h-full w-full sm:block'>
        <div className='relative h-full min-h-screen w-full'>
          <Blur blurRadius={blurAmount}>
            <NextImage
              src={getImageUrl(movie.backdrop_path, { original: true })}
              fill
              className='object-cover'
              quality={100}
              priority
            />
          </Blur>
        </div>
      </div>

      <div
        style={
          Object.keys(breakpoint)[0] == 'none'
            ? null
            : { backgroundColor: `rgba(0,0,0, ${opacityAmount}` }
        }
        className='transform-opacity duration-500 absolute top-0 w-full bg-black'
      >
        <div className='relative h-[55vh] sm:h-[90vh]'>
          <div className='h-full sm:mx-5% sm:w-1/3 sm:pb-24'>
            <div className='relative h-full'>
              <div className='relative block h-full sm:hidden'>
                <NextImage
                  fill
                  src={getImageUrl(movie.backdrop_path, { original: true })}
                  className='object-cover'
                  quality={100}
                />
              </div>
              <div className='absolute bottom-0 flex h-full max-h-56 w-full flex-col items-center justify-end gap-4 bg-gradient-to-t from-black to-transparent px-10 sm:max-h-full sm:items-start sm:gap-5 sm:from-transparent sm:px-0'>
                {imageSuccess ? (
                  <div className='max-h relative h-full max-h-28 w-full sm:max-h-72'>
                    <NextImage
                      fill
                      src={getImageUrl(imageData.logos[0].file_path, { original: true })}
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

export default Spotlight;
