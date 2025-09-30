'use client';
import Blur from '@/components/Blur';
import NextImage from '@/components/NextImage';
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
      <div className='fixed h-full w-full'>
        {movieData && (
          <Blur blurRadius={64}>
            <NextImage
              fill
              className='object-cover object-top'
              src={getImageUrl(movieData.backdrop_path, { original: false })}
              alt={movieData.backdrop_path}
              priority
              unoptimized
            />
          </Blur>
        )}
      </div>
      <div className='absolute w-full bg-black/65 min-h-screen'>{children}</div>
    </>
  );
}

export default MovieBackdrop;
