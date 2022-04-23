import React from 'react';
import NextImage from '../NextImage';
import Link from 'next/link';
import useRouter from '../../src/hooks/useRouter';
import useApiConfiguration from '../../src/hooks/useApiConfig';

const PersonImageCard = ({ data }) => {
  const router = useRouter();
  const { getImageUrl } = useApiConfiguration();

  return (
    <div className='mx-2 flex h-full flex-col overflow-hidden rounded drop-shadow-md duration-300'>
      <Link href={{ pathname: router.asRoute, query: { i: data.file_path.substring(1) } }} shallow>
        <a>
          <div className='relative aspect-[2/3]'>
            <NextImage
              src={getImageUrl(data.file_path)}
              layout='fill'
              objectFit='cover'
              unoptimized
            />
            <div className='absolute top-0 h-full w-full opacity-10 transition-colors duration-200 hover:bg-white'></div>
          </div>
        </a>
      </Link>
    </div>
  );
};
export default PersonImageCard;
