import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Details = (data) => {
  const router = useRouter();
  console.log(data);
  const formatRuntime = (mins) => {
    let min = mins % 60;
    let h = (mins - min) / 60;
    return `${h}h ${min}m`;
  };

  if (router.isFallback) return <div>error</div>;

  return (
    <div>
      <Head>
        <title>{`${data.title} - ${process.env.title}`}</title>
      </Head>
      <div className='max-h-none h-full w-full lg:overflow-hidden '>
        <div className='relative h-full w-full'>
          <Image
            layout='fill'
            objectFit='cover'
            objectPosition='top'
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
            alt={`${data.title}-poster`}
            placeholder='blur'
            blurDataURL={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
          />
          <div className='z-1 relative h-full'>
            <div className='h-full bg-black bg-opacity-50 backdrop-blur-3xl backdrop-filter'>
              <div className='m-auto flex h-full max-w-[var(--maxPageWidth)] flex-col gap-10 p-10 lg:flex-row lg:gap-20 lg:p-20'>
                <div className='block h-full w-[calc(40vh*0.7)] flex-none self-center rounded-xl lg:w-[calc((40vh-80px)*0.65)]'>
                  <Image
                    width={500}
                    height={750}
                    layout='responsive'
                    className='rounded-xl'
                    src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                    alt={`${data.title}-poster`}
                    quality={100}
                  />
                </div>
                <div className='flex flex-col gap-6 py-5 text-white lg:text-5xl'>
                  <div className='flex flex-wrap items-center gap-3 lg:gap-4'>
                    <div className='text-4xl font-bold '>{data.title}</div>
                    <div className='text-4xl font-light text-gray-300'>
                      {`(${data.release_date.split('-')[0]})`}
                    </div>
                  </div>
                  <div className='flex flex-wrap items-center gap-3 text-base lg:gap-4'>
                    {data.rating && (
                      <div className='inline border border-gray-300 py-[0.3rem] px-2 text-sm leading-none text-gray-300'>
                        {data.rating}
                      </div>
                    )}
                    <div>{formatRuntime(data.runtime)}</div>
                    <div className='flex gap-4'>
                      {data.genres.map(({ name }) => (
                        <div className="sm:before:pr-3 sm:before:content-['\2022']">
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                  {data.tagline && (
                    <div className='font-normal italic text-gray-300 md:text-lg'>
                      {data.tagline}
                    </div>
                  )}
                  <div>
                    <div className='pb-2 text-xl font-bold'>Overview</div>
                    <div className='text-base font-normal md:text-lg'>
                      {data.overview}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-screen'></div>
    </div>
  );
};

export default Details;

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;
  const baseURL = 'https://api.themoviedb.org/3';
  const API_KEY = process.env.TMDB_API_KEY;
  const req = `${baseURL}/movie/${id}?api_key=${API_KEY}&append_to_response=release_dates`;

  try {
    const res = await fetch(req);
    let data = await res.json();

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

    return { props: data };
  } catch (e) {
    console.error(e);
    return { notFound: true };
  }
};
