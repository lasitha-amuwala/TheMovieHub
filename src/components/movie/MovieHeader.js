import React from 'react';
import ProfileTemplate from '../ProfileTemplate';
import { getYearFromDate, minsToDuration } from '@/utils/commonUtils';

const MovieHeader = ({ movie }) => {
  return (
    <ProfileTemplate
      imageSrc={movie.poster_path}
      imageAlt={movie.title}
      backdropSrc={movie.backdrop_path}
      backdropAlt={movie.title}
    >
      <div className='flex flex-col justify-center gap-4 py-5 sm:gap-6'>
        <div className='text-3xl font-bold sm:text-5xl'>
          {movie.title}
          <span className='text-3xl font-light text-gray-300 sm:text-5xl'>
            {` (${getYearFromDate(movie.release_date)})`}
          </span>
        </div>
        <div className='flex flex-nowrap items-center'>
          <div className='inline border border-gray-300 p-[0.4rem] py-[0.2rem] leading-none text-gray-300 sm:text-sm'>
            {movie.rating ? movie.rating : 'N/A'}
          </div>
          <div className='before:px-2 before:content-["•"]'>
            {movie.runtime ? minsToDuration(movie.runtime) : '0h 00m'}
          </div>
        </div>
        {movie.genres && movie.genres.length && (
          <div>
            {movie.genres.map(({ id, name }, i) => (
              <span key={id} className={i ? 'before:px-2 before:content-["•"]' : undefined}>
                {name}
              </span>
            ))}
          </div>
        )}
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
