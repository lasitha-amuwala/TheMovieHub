import React from 'react';
import NextImage from './NextImage';
import PageMargin from './PageMargin';
import { getMovieYear, minsToDuration } from '../src/movieUtils';

const DetailsHeader = ({ movie }) => (
  <div className='max-h-none h-full w-full lg:overflow-hidden'>
    <div className='relative h-full w-full'>
      <NextImage
        layout='fill'
        objectFit='cover'
        objectPosition='top'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={`${movie.title}-poster`}
        placeholder='blur'
        blurDataURL={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        priority
        unoptimized
      />
      <div className='z-1 relative h-full'>
        <div className='h-full bg-black bg-opacity-50 backdrop-blur-3xl backdrop-filter'>
          <PageMargin padding className='py-10 lg:py-12'>
            <div className='flex h-full flex-col gap-10 lg:flex-row lg:gap-16 2xl:gap-20'>
              <div className='block h-full w-[calc(40vh*0.7)] flex-none self-center rounded-md drop-shadow-xl lg:w-[calc((40vh-80px)*0.65)]'>
                <NextImage
                  width={500}
                  height={750}
                  layout='responsive'
                  className='rounded-md'
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  placeholder='blur'
                  blurDataURL={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={`${movie.title}-poster`}
                  quality={100}
                  unoptimized
                />
              </div>
              <div className='flex flex-col justify-center gap-6 py-5'>
                <div className='text-3xl font-bold sm:text-5xl'>
                  {movie.title}
                  <span className='text-2xl font-light text-gray-300 sm:text-4xl'>
                    {` (${getMovieYear(movie.release_date)})`}
                  </span>
                </div>
                <div className='flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-4'>
                  {movie.rating && (
                    <div className='inline border border-gray-300 p-[0.4rem] py-[0.2rem] leading-none text-gray-300 sm:text-sm'>
                      {movie.rating}
                    </div>
                  )}
                  <div>{minsToDuration(movie.runtime)}</div>
                  <div className='flex gap-2 sm:gap-4'>
                    {movie.genres.map(({ id, name }) => (
                      <div key={id}>{name}</div>
                    ))}
                  </div>
                </div>
                {movie.tagline && (
                  <div className='font-normal italic text-gray-300'>{movie.tagline}</div>
                )}
                <div>
                  <div className='pb-2 text-xl font-bold'>Overview</div>
                  <div className='font-normal'>{movie.overview}</div>
                </div>
              </div>
            </div>
          </PageMargin>
        </div>
      </div>
    </div>
  </div>
);

export default DetailsHeader;
