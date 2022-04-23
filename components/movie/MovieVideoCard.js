import React from 'react';
import NextImage from '../NextImage';
import Link from 'next/link';
import useRouter from '../../src/hooks/useRouter';

const MovieVideoCard = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <Link href={{ pathname: router.asRoute, query: { v: data.key } }} shallow>
        <a>
          <div className='mx-2 flex h-full flex-col overflow-hidden rounded-lg bg-card duration-300 hover:bg-cardHover'>
            <div className='relative aspect-video'>
              <NextImage
                src={`http://img.youtube.com/vi/${data.key}/hqdefault.jpg`}
                layout='fill'
                objectFit='cover'
              />
            </div>
            <div className='flex grow flex-col justify-center p-3 text-center'>
              <div>{data.name}</div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};
export default MovieVideoCard;
