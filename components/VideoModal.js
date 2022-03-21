import React from 'react';
import BaseModal from './BaseModal';
import VideoPlayer from './VideoPlayer';
import { useRouter } from 'next/router';

const VideoModal = () => {
  const router = useRouter();

  return (
    <BaseModal
      isOpen={!!router.query.v}
      onRequestClose={() => router.push(`/movie/${router.query.id}`)}
      contentLabel='video modal'
    >
      <div className='flex w-full flex-col text-white'>
        <div className='aspect-video'>
          <VideoPlayer videoId={router.query.v} />
        </div>
      </div>
    </BaseModal>
  );
};

export default VideoModal;
