import React from 'react';
import BaseModal from './BaseModal';
import VideoPlayer from '../VideoPlayer';
import { useRouter } from 'next/router';

const VideoModal = ({ title }) => {
  const router = useRouter();

  return (
    <BaseModal
      title={title}
      isOpen={!!router.query.v}
      onRequestClose={() => router.push(`/movie/${router.query.movieId}`)}
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
