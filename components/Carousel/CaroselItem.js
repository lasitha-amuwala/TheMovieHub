import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { HiOutlineInformationCircle } from 'react-icons/hi';

export const CarouselItem = ({ slide }) => {
  const { title, backdrop_path, overview, id } = slide;

  const InfoCard = () => (
    <div className='absolute left-0 bottom-0 w-full rounded-none bg-almostBlack bg-opacity-50 px-12 py-2 text-white backdrop-blur-md backdrop-filter sm:px-7% md:px-5% lg:left-24 lg:bottom-28 lg:w-1/2 lg:rounded-xl lg:px-6 lg:py-5 2xl:left-5% 2xl:bottom-56 2xl:w-1/3'>
      <div className='flex items-center justify-between gap-4'>
        <p className='flex-grow font-medium sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl'>
          {title}
        </p>
        <Link href={`/details/${id}`} passHref>
          <div className='hidden flex-shrink-0 items-center gap-2 rounded-xl bg-blue-700 bg-opacity-40 px-3 py-3 text-base font-semibold hover:bg-opacity-60 focus:bg-opacity-60 focus:ring-4 lg:flex'>
            <HiOutlineInformationCircle className='h-6 w-6' />
            More Info
          </div>
        </Link>
      </div>
      <p className='my-2 hidden sm:text-sm md:text-base md:line-clamp-2 lg:my-3 lg:line-clamp-3 xl:my-4 xl:line-clamp-4 2xl:text-lg 2xl:font-normal 2xl:line-clamp-5'>
        {overview}
      </p>
    </div>
  );

  return (
    <li className='relative max-h-85vh min-w-full max-w-full'>
      <div className='h-56vw block w-full'>
        <Image
          width={17}
          height={11}
          layout='responsive'
          className='relative block h-full w-full select-none object-cover object-top'
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt={`${title.split(' ').join('-')}-poster`}
          quality={100}
          priority
        />
      </div>
      <InfoCard />
    </li>
  );
};
