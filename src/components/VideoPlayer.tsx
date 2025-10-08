import React from 'react';
import ReactPlayer from 'react-player';

type Props = {
  videoId: string;
};

const VideoPlayer = ({ videoId }: Props) => (
  <ReactPlayer
    controls
    playsInline
    src={`https://www.youtube.com/watch?v=${videoId}`}
    width='100%'
    height='100%'
  />
);

export default VideoPlayer;
