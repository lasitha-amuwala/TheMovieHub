import React from 'react';
import NextImage from '../NextImage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useApiConfiguration from '../../src/hooks/useApiConfig';

const PersonImageCard = ({ data }) => {
  const router = useRouter();
  const { getImageUrl } = useApiConfiguration();
  return (
    <>
      <Link href={`/`}>
        <a>
          <div className='mx-2 flex h-full flex-col overflow-hidden rounded-lg bg-card duration-300 hover:bg-cardHover'>
            <div className='relative aspect-[2/3]'>
              <NextImage
                src={getImageUrl(data.file_path, { original: true })}
                layout='fill'
                objectFit='cover'
              />
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};
export default PersonImageCard;
