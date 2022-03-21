import React from 'react';
import { useRouter } from 'next/router';
import { apiQueries } from '../../src/http-client/apiQueries';
import { QueryClient, dehydrate, useQuery } from 'react-query';

import Title from '../../components/Title';
import VideoModal from '../../components/VideoModal';
import PageMargin from '../../components/PageMargin';
import DetailsHeader from '../../components/Movie/DetailsHeader';
import MovieCastCarousel from '../../components/Movie/MovieCastCarousel';
import MovieVideoCarousel from '../../components/Movie/MovieVideoCarousel';

export const getServerSideProps = async ({ params }) => {
  try {
    const queryClient = new QueryClient();
    await Promise.all([
      queryClient.fetchQuery(apiQueries.common.configuration()),
      queryClient.fetchQuery(apiQueries.movies.movie(params.id)),
      queryClient.fetchQuery(apiQueries.people.movie(params.id)),
      queryClient.fetchQuery(apiQueries.movies.movieVideos(params.id)),
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
  const { data: movieData } = useQuery(apiQueries.movies.movie(router.query.id));
  const movie = filterData(movieData);

  if (router.isFallback) return <div>error</div>;
  return (
    <>
      <Title title={movie.title} />
      <DetailsHeader movie={movie} />
      <PageMargin padding className='py-10'>
        <MovieCastCarousel id={router.query.id} />
        <MovieVideoCarousel id={router.query.id} />
      </PageMargin>
      <VideoModal />
    </>
  );
};

export default Movie;
