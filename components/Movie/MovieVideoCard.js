import React from 'react';
import NextImage from '../NextImage';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MovieVideoCard = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <Link href={`/movie/${router.query.id}?v=${data.key}`}>
        <a>
          <div className='mx-2 flex h-full flex-col overflow-hidden rounded-lg bg-card duration-300 hover:bg-cardHover'>
            <div className='relative aspect-video'>
              <NextImage
                src={`http://img.youtube.com/vi/${data.key}/maxresdefault.jpg`}
                layout='fill'
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
