'use client';

import BaseModal from './BaseModal';
import VideoPlayer from '../VideoPlayer';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const VideoModal = ({ paths }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const videoId = searchParams.get('v');

  const currIndex = paths.findIndex(i => i.key == videoId);
  const currName = currIndex >= 0 ? paths[currIndex].name : '';

  const isInRange = index => index >= 0 && index < paths.length;
  const goToNextPath = () => (isInRange(currIndex + 1) ? goToPath(currIndex + 1) : currIndex);
  const goToPrevPath = () => (isInRange(currIndex - 1) ? goToPath(currIndex - 1) : currIndex);

  const goToPath = index => router.replace(`${pathname}?v=${paths[index].key}`, { scroll: false });

  return (
    <BaseModal
      title={currName}
      isOpen={!!videoId}
      onRequestClose={() => router.replace(pathname, { scroll: false })}
      contentLabel='video modal'
    >
      <div className='group relative flex w-full flex-col text-white'>
        <div className='aspect-video'>
          <VideoPlayer videoId={videoId} />
        </div>
        {isInRange(currIndex + 1) && (
          <button
            onClick={goToNextPath}
            className='absolute right-0 top-1/2 z-10 mx-4 aspect-square w-14 -translate-y-1/2 rounded-full bg-accentBlue bg-opacity-80 opacity-0 backdrop-blur-md duration-300 hover:bg-opacity-80 group-hover:opacity-100 lg:p-4'
          >
            <HiChevronRight className='h-full w-full' />
          </button>
        )}
        {isInRange(currIndex - 1) && (
          <button
            onClick={goToPrevPath}
            className='absolute left-0 top-1/2 z-10 mx-4 aspect-square w-14 -translate-y-1/2 rounded-full bg-accentBlue bg-opacity-50 opacity-0 backdrop-blur-md duration-300 hover:bg-opacity-80 group-hover:opacity-100 lg:p-4'
          >
            <HiChevronLeft className='h-full w-full' />
          </button>
        )}
      </div>
    </BaseModal>
  );
};

export default VideoModal;
