import React from 'react';
import BaseModal from './BaseModal';
import NextImage from '../NextImage';
import { useRouter } from '../../src/hooks/useRouter';
import useApiConfiguration from '../../src/hooks/useApiConfig';
import { FaExpand, FaCompress } from 'react-icons/fa';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import IconButton from '../IconButton';

const ImageModal = ({ title, paths }) => {
  const router = useRouter();
  const handle = useFullScreenHandle();
  const { getImageUrl } = useApiConfiguration();

  const currIndex = paths.indexOf(router.query.i);

  const isInRange = index => index >= 0 && index < paths.length;
  const goToNextPath = () => (isInRange(currIndex + 1) ? goToPath(currIndex + 1) : currIndex);
  const goToPrevPath = () => (isInRange(currIndex - 1) ? goToPath(currIndex - 1) : currIndex);

  const goToPath = index =>
    router.push({ pathname: router.asRoute, query: { i: paths[index] } }, undefined, {
      shallow: true,
    });

  return (
    <BaseModal
      title={title}
      isOpen={!!router.query.i}
      onRequestClose={() => router.push(router.asRoute, undefined, { shallow: true })}
      contentLabel='image modal'
    >
      <div className='relative text-white'>
        <FullScreen handle={handle}>
          <div className='m-auto block aspect-[2/3] w-[40%] drop-shadow-md'>
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
          {isInRange(currIndex + 1) && (
            <button
              onClick={goToNextPath}
              className='absolute right-0 top-1/2 z-10 mx-4 aspect-square w-14 -translate-y-1/2 rounded-full bg-accentBlue bg-opacity-50 backdrop-blur-md duration-300 hover:bg-opacity-80 lg:p-4'
            >
              <HiChevronRight className='h-full w-full' />
            </button>
          )}
          {isInRange(currIndex - 1) && (
            <button
              onClick={goToPrevPath}
              className='absolute left-0 top-1/2 z-10 mx-4 aspect-square w-14 -translate-y-1/2 rounded-full bg-accentBlue bg-opacity-50 backdrop-blur-md duration-300 hover:bg-opacity-80 lg:p-4'
            >
              <HiChevronLeft className='h-full w-full' />
            </button>
          )}
          <IconButton
            onClick={handle.active ? handle.exit : handle.enter}
            className='absolute top-0 right-0 mx-4 my-2'
            icon={handle.active ? <FaCompress /> : <FaExpand />}
          />
        </FullScreen>
      </div>
    </BaseModal>
  );
};

export default ImageModal;
