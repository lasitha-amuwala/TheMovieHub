import React from 'react';
import ProfileTemplate from '../person/ProfileTemplate';
import { getYearFromDate, minsToDuration } from '../../src/commonUtils';

const MovieHeader = ({ movie }) => {
  return (
    <ProfileTemplate
      imageSrc={movie.poster_path}
      imageAlt={movie.title}
      backdropSrc={movie.backdrop_path}
      backdropAlt={movie.title}
    >
      <div className='flex flex-col justify-center gap-6 py-5'>
        <div className='text-3xl font-bold sm:text-5xl'>
          {movie.title}
          <span className='text-2xl font-light text-gray-300 sm:text-4xl'>
            {` (${getYearFromDate(movie.release_date)})`}
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
        {movie.tagline && <div className='font-normal italic text-gray-300'>{movie.tagline}</div>}
        <div>
          <div className='pb-2 text-xl font-bold'>Overview</div>
          <div className='font-normal'>{movie.overview}</div>
        </div>
      </div>
    </ProfileTemplate>
  );
};

export default MovieHeader;
