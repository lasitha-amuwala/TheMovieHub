import React from 'react';
import { useRouter } from 'next/router';
import { apiQueries } from '../../src/http-client/apiQueries';
import { QueryClient, dehydrate, useQueries } from 'react-query';

import Title from '../../components/Title';
import Carousel from '../../components/NewCarousel';
import DetailsHeader from '../../components/DetailsHeader';
import MovieCastCard from '../../components/MovieCastCard';
import MovieImageCard from '../../components/MovieImageCard';

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

const Details = () => {
  const { query, isFallback } = useRouter();

  const results = useQueries([
    apiQueries.movies.movie(query.id),
    apiQueries.people.movie(query.id),
    apiQueries.movies.movieVideos(query.id),
  ]);

  const [{ data: movieData }, { data: castData }, { data: videoData }] = results;

  let movie = filterData(movieData);

  if (isFallback) return <div>error</div>;

  return (
    <>
      <Title title={movie.title} />
      <DetailsHeader movie={movie} />
      <div className='m-auto w-full max-w-[var(--maxPageWidth)] text-white'>
        <div className='my-10 mx-8 lg:mx-16 2xl:mx-20'>
          <Carousel
            label='Cast'
            data={castData.cast}
            visibleSlides={6}
            component={<MovieCastCard />}
            isIntrinsicHeight
          />
          <Carousel
            label='Videos'
            data={videoData.results}
            visibleSlides={4}
            component={<MovieImageCard />}
            isIntrinsicHeight
          />
        </div>
      </div>
    </>
  );
};

export default Details;
