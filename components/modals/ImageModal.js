import React from 'react';
import BaseModal from './BaseModal';
import { useRouter } from 'next/router';
import useApiConfiguration from '../../src/hooks/useApiConfig';
import NextImage from '../NextImage';

const ImageModal = ({ title }) => {
  const router = useRouter();
  const { getImageUrl } = useApiConfiguration();
  console.log(router.query);
  return (
    <BaseModal
      title={title}
      isOpen={!!router.query.i}
      onRequestClose={() => router.push(`/person/${router.query.personId}`)}
      contentLabel='image modal'
    >
      <div className='text-white'>
        <div className='m-auto block aspect-[2/3] w-[40%]'>
          <NextImage
            width={200}
            height={300}
            objectFit='cover'
            layout='responsive'
            src={getImageUrl('/' + router.query.i, { original: true })}
            priority
            quality={100}
            unoptimized
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default ImageModal;
