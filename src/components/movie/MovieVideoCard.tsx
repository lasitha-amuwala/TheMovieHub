import React from 'react';
import Image from '../Image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RippleWrapper from '@/components/RippleWrapper';
import { Video } from '@/types/movies';

const MovieVideoCard = ({ video }: { video: Video }) => {
  const pathname = usePathname();

  return (
    <>
      <Link href={{ pathname, query: { v: video.key } }} scroll={false} replace>
        <RippleWrapper className='flex h-full flex-col overflow-hidden rounded-lg hover:bg-white/15 bg-white/5 duration-300'>
          <div className='relative aspect-video'>
            <Image
              src={`http://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
              alt={video.name}
              fill
              className='object-cover'
            />
          </div>
          <div className='flex grow flex-col justify-center p-3 text-center'>
            <div>{video.name}</div>
          </div>
        </RippleWrapper>
      </Link>
    </>
  );
};
export default MovieVideoCard;
