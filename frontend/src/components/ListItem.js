import React, { useEffect, forwardRef } from 'react';

export const ListItem = forwardRef((props, ref) => {

  return (
    <img
      ref={ref}
      className=" h-full w-c-1/3 sm:w-c-1/4 md:w-c-1/5 lg:w-c-1/6 xl:w-c-1/7 2xl:w-c-1/8 cursor-pointer rounded-lg"
      src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
      alt={`${props.data.title.split(' ').join('-')}-poster`}
    />
  );
});

//transform hover:scale-125 hover:-translate-x-2/3 z-20 hover:z-30 transition-all duration-500 ease-in-out
