import React from 'react';
import Link from 'next/link';
import NextImage from '../NextImage';
import useApiConfiguration from '../../src/hooks/useApiConfig';
import PersonPlaceholder from '../PersonPlaceholder';

const MovieCastCard = ({ data }) => {
  const { getImageUrl } = useApiConfiguration();

  return (
    <div className='mx-1 h-full rounded sm:rounded-xl bg-card p-1 duration-300 hover:bg-cardHover sm:mx-2 lg:p-3'>
      <Link href={`/person/${data.id}`}>
        <a>
          <div className='flex h-full flex-col gap-3'>
            <div className='relative aspect-square shrink-0 drop-shadow-md'>
              {data.profile_path && (
                <NextImage
                  src={getImageUrl(data.profile_path)}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-lg'
                  unoptimized
                ></NextImage>
              )}
              <PersonPlaceholder />
            </div>
            <div className='flex grow flex-col justify-center text-center text-sm sm:text-base'>
              <div className='font-medium'>{data.name}</div>
              <div className='text-slate-300'>{data.character}</div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
export default MovieCastCard;
