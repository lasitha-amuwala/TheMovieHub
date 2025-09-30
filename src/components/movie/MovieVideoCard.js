import React from 'react';
import NextImage from '../NextImage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RippleWrapper from '@/components/RippleWrapper';

const MovieVideoCard = ({ data }) => {
  const pathname = usePathname();

  return (
    <>
      <Link href={{ pathname, query: { v: data.key } }} scroll={false} replace>
        <RippleWrapper className='flex h-full flex-col overflow-hidden rounded-lg hover:bg-white/15 bg-white/5 duration-300'>
          <div className='relative aspect-video'>
            <NextImage
              src={`http://img.youtube.com/vi/${data.key}/hqdefault.jpg`}
              alt={data.name}
              fill
              className='object-cover'
            />
          </div>
          <div className='flex grow flex-col justify-center p-3 text-center'>
            <div>{data.name}</div>
          </div>
        </RippleWrapper>
      </Link>
    </>
  );
};
export default MovieVideoCard;
