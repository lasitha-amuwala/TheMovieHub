import React from 'react';
import NextImage from './NextImage';

const MovieImageCard = ({ data }) => (
  <div className='mx-2 flex h-full flex-col overflow-hidden rounded-lg bg-[rgb(10,10,10)] duration-300 hover:bg-[rgb(35,35,35)]'>
    <div className='relative aspect-video'>
      <NextImage src={`http://img.youtube.com/vi/${data.key}/maxresdefault.jpg`} layout='fill' />
    </div>
    <div className='flex grow flex-col justify-center p-3 text-center'>
      <div className=''>{data.name}</div>
    </div>
  </div>
);

export default MovieImageCard;
