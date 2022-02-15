import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Details = (data) => {
  const router = useRouter();

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
      <div className='max-h-none h-full w-full lg:h-[40vh] lg:max-h-40vh lg:overflow-hidden '>
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
            <div className='h-full bg-black bg-opacity-70'>
              <div className='m-auto flex h-full max-w-[var(--maxPageWidth)] flex-col gap-16 p-10 lg:flex-row'>
                <div className='block h-full w-[calc(40vh*0.7)] flex-none self-center rounded-xl border-2 border-cyan-200 lg:w-[calc((40vh-80px)*0.65)]'>
                  <Image
                    width={1080}
                    height={1669}
                    layout='responsive'
                    className='rounded-xl'
                    src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                    alt={`${data.title}-poster`}
                    quality={100}
                    placeholder='blur'
                    blurDataURL={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                  />
                </div>
                <div className='flex flex-col gap-4 text-4xl text-white'>
                  <div className='flex flex-wrap items-center gap-3 lg:gap-4'>
                    <div className='font-bold'>{data.title}</div>
                    <div className='text-3xl font-light text-gray-300'>
                      {`(${data.release_date.split('-')[0]})`}
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    {data.rating && (
                      <div className='inline border border-gray-400 p-1 px-2 text-sm text-gray-400'>
                        {data.rating}
                      </div>
                    )}
                    <div className='text-base'>
                      {formatRuntime(data.runtime)}
                    </div>
                  </div>
                  <div className='text-base font-normal md:text-lg'>
                    {data.overview}
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
