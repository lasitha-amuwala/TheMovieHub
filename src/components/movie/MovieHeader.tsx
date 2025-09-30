'use client';
import React from 'react';
import ProfileTemplate from '../ProfileTemplate';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '@/utils/http-client/tmdb';
import MovieOverview from '@/components/movie/MovieOverview';
import { MovieDetails } from '@/types/movies';

const getRating = (data: MovieDetails) => {
  try {
    let release_dates = data?.release_dates?.results.find(elem => elem.iso_3166_1 == 'US');
    // filter thorugh the list of ratings and return the latest
    let rating = release_dates?.release_dates.reduce((a, b) => {
      return new Date(a.release_date) > new Date(b.release_date) ? a : b;
    });
    return rating?.certification ? rating.certification : 'N/A';
  } catch {
    return 'N/A';
  }
};

type MovieHeaderProps = {
  movieId: string;
};

const MovieHeader = ({ movieId }: MovieHeaderProps) => {
  const {
    data: movieData,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetails>(tmdb.movies.movie(movieId));

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error... {error}</>;

  if (!movieData) return <></>;
  const rating = getRating(movieData);

  return (
    <ProfileTemplate imageSrc={movieData.poster_path} imageAlt={movieData.title}>
      <MovieOverview movie={movieData} rating={rating} />
    </ProfileTemplate>
  );
};

export default MovieHeader;
