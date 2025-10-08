'use client';
import Blur from '@/components/Blur';
import Image from '@/components/Image';
import useApiConfiguration from '@/hooks/useApiConfig';
import { MovieDetails } from '@/types/movies';
import { tmdb } from '@/utils/http-client/tmdb';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type Props = { movieId: string; children: React.ReactNode };

function MovieBackdrop({ movieId, children }: Props) {
  const { getImageUrl } = useApiConfiguration();

  const {
    data: movieData,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetails>(tmdb.movies.movie(movieId));

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className='fixed h-full w-full '>
        {movieData && (
          <>
            <Blur blurRadius={64}>
              <Image
                fill
                className='object-cover object-top filter:'
                src={getImageUrl(movieData.backdrop_path, { original: false })}
                alt={movieData.backdrop_path}
                priority
                unoptimized
                loading='eager'
              />
            </Blur>
            <div className='absolute inset-0 bg-black/65' />
          </>
        )}
      </div>
      <div className='absolute w-full'>{children}</div>
    </>
  );
}

export default MovieBackdrop;
