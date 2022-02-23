import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { apiQueries } from '../../utils/http-client/apiQueries';
import { QueryClient, useQuery, dehydrate } from 'react-query';

export const getServerSideProps = async ({ params }) => {
  try {
    const id = params.id;
    const queryClient = new QueryClient();
    await queryClient.fetchQuery(apiQueries.movies.movie(id));
    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (e) {
    console.error(e);
    return { notFound: true };
  }
};

const Details = () => {
  const { query, isFallback } = useRouter();
  const { data } = useQuery(apiQueries.movies.movie(query.id));

  let movie = filterData(data);

  if (isFallback) return <div>error</div>;

  return (
    <div>
      <Head>
        <title>{`${movie.title} - ${process.env.title}`}</title>
      </Head>
      <div className='max-h-none h-full w-full lg:overflow-hidden '>
        <div className='relative h-full w-full'>
          <Image
            layout='fill'
            objectFit='cover'
            objectPosition='top'
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={`${movie.title}-poster`}
            placeholder='blur'
            blurDataURL={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          />
          <div className='z-1 relative h-full'>
            <div className='h-full bg-black bg-opacity-50 backdrop-blur-3xl backdrop-filter'>
              <div className='m-auto flex h-full max-w-[var(--maxPageWidth)] flex-col gap-10 p-8 lg:flex-row lg:gap-16 lg:p-16 2xl:gap-20 2xl:p-20'>
                <div className='block h-full w-[calc(40vh*0.7)] flex-none self-center rounded-xl lg:w-[calc((40vh-80px)*0.65)]'>
                  <Image
                    width={500}
                    height={750}
                    layout='responsive'
                    className='rounded-xl'
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={`${movie.title}-poster`}
                    quality={100}
                  />
                </div>
                <div className='flex flex-col justify-center gap-6 py-5 text-white'>
                  <div className='spacing text-3xl font-bold sm:text-5xl'>
                    {movie.title}
                    <span className='text-2xl font-light text-gray-300 sm:text-4xl'>
                      {` (${movie.release_date.split('-')[0]})`}
                    </span>
                  </div>
                  <div className='flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-4'>
                    {movie.rating && (
                      <div className='inline border border-gray-300 p-[0.4rem] py-[0.2rem] leading-none text-gray-300 sm:text-sm'>
                        {movie.rating}
                      </div>
                    )}
                    <div className=''>{movie.duration}</div>
                    <div className='flex gap-2 sm:gap-4'>
                      {movie.genres.map(({ name }) => (
                        <div>{name}</div>
                      ))}
                    </div>
                  </div>
                  {movie.tagline && (
                    <div className='font-normal italic text-gray-300'>
                      {movie.tagline}
                    </div>
                  )}
                  <div>
                    <div className='pb-2 text-xl font-bold'>Overview</div>
                    <div className='font-normal'>{movie.overview}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=''></div>
    </div>
  );
};

export default Details;

const formatRuntime = (mins) => {
  let min = mins % 60;
  let h = (mins - min) / 60;
  return `${h}h ${min}m`;
};

const filterData = (data) => {
  try {
    let release_dates = data.release_dates.results.find(
      (elem) => elem.iso_3166_1 == 'US'
    );
    // filter thorugh the list of ratings and return the latest
    let rating = release_dates.release_dates.reduce((a, b) => {
      return new Date(a.release_date) > new Date(b.release_date) ? a : b;
    });

    delete data.release_dates;
    delete data.production_companies;
    delete data.production_countries;
    delete data.spoken_languages;
    delete data.adult;

    data.rating = rating.certification;
    data.duration = formatRuntime(data.runtime);

    return data;
  } catch {
    return data;
  }
};
