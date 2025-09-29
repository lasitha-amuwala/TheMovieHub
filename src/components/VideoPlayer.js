import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoId }) => (
  <ReactPlayer
    controls
    playsinline
    src={`https://www.youtube.com/watch?v=${videoId}`}
    width='100%'
    height='100%'
  />
);

export default VideoPlayer;
