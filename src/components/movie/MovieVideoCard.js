import React from 'react';
import NextImage from '../NextImage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MovieVideoCard = ({ data }) => {
  const pathname = usePathname();

  return (
    <>
      <Link href={{ pathname, query: { v: data.key } }} shallow>
        <div className='mx-2 flex h-full flex-col overflow-hidden rounded-lg bg-card duration-300 hover:bg-cardHover'>
          <div className='relative aspect-video'>
            <NextImage
              src={`http://img.youtube.com/vi/${data.key}/hqdefault.jpg`}
              fill
              className='object-cover'
            />
          </div>
          <div className='flex grow flex-col justify-center p-3 text-center'>
            <div>{data.name}</div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default MovieVideoCard;
