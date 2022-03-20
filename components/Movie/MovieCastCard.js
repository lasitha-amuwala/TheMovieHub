import React from 'react';
import Link from 'next/link';
import NextImage from '../NextImage';
import useApiConfiguration from '../../src/hooks/useApiConfig';
import { MdPerson } from 'react-icons/md';

const MovieCastCard = ({ data }) => (
  <div className='mx-2 h-full rounded-xl bg-card p-1 duration-300 hover:bg-cardHover lg:p-3'>
    <Link href={'/'}>
      <a>
        <div className='flex h-full flex-col gap-3'>
          <div className='relative aspect-square shrink-0 drop-shadow-md'>
            {data.profile_path ? (
              <NextImage
                src={useApiConfiguration().getImageUrl(data.profile_path)}
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
                unoptimized
              ></NextImage>
            ) : (
              <div className='h-full w-full rounded-lg bg-[rgb(5,5,5)]'>
                <MdPerson className='h-full w-full fill-[rgb(35,35,35)]' />
              </div>
            )}
          </div>
          <div className='flex grow flex-col justify-center text-center'>
            <div className='font-medium lg:text-lg'>{data.name}</div>
            <div className='text-slate-300'>{data.character}</div>
          </div>
        </div>
      </a>
    </Link>
  </div>
);

export default MovieCastCard;
