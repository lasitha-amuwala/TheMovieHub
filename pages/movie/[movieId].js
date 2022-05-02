import React from 'react';
import { useRouter } from 'next/router';
import { tmdb } from '../../src/http-client/tmdb';
import { QueryClient, dehydrate, useQuery } from 'react-query';

import Title from '../../components/Title';
import PageMargin from '../../components/PageMargin';
import MovieHeader from '../../components/movie/MovieHeader';
import MovieCastCarousel from '../../components/movie/MovieCastCarousel';
import MovieVideoCarousel from '../../components/movie/MovieVideoCarousel';

export const getServerSideProps = async ({ params }) => {
  try {
    const queryClient = new QueryClient();
    await Promise.all([
      queryClient.prefetchQuery(tmdb.common.configuration()),
      queryClient.prefetchQuery(tmdb.movies.movie(params.movieId)),
      queryClient.prefetchQuery(tmdb.movies.credits(params.movieId)),
      queryClient.prefetchQuery(tmdb.movies.videos(params.movieId)),
    ]);

    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

const filterData = data => {
  try {
    let release_dates = data.release_dates.results.find(elem => elem.iso_3166_1 == 'US');
    // filter thorugh the list of ratings and return the latest
    let rating = release_dates.release_dates.reduce((a, b) => {
      return new Date(a.release_date) > new Date(b.release_date) ? a : b;
    });

    data.rating = rating.certification;

    return data;
  } catch {
    return data;
  }
};

const Movie = () => {
  const router = useRouter();
  const { data: movieData } = useQuery(tmdb.movies.movie(router.query.movieId));
  const movie = filterData(movieData);

  if (router.isFallback) return <div>error</div>;
  return (
    <>
      <Title title={movie.title} />
      <MovieHeader movie={movie} />
      <PageMargin padding className='py-10'>
        <MovieCastCarousel id={router.query.movieId} />
        <MovieVideoCarousel id={router.query.movieId} />
      </PageMargin>
    </>
  );
};

export default Movie;
