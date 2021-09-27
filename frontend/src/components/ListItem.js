import React from 'react';

export const ListItem = ({ data }) => (
  <div className="max-w-1/3 sm:max-w-1/4 md:max-w-1/5 lg:max-w-1/6 xl:max-w-1/7 2xl:max-w-1/8 transform hover:scale-125 hover:mx-5 z-20 hover:z-30 transition-all duration-500 ease-in-out">
    <img
      className="h-full cursor-pointer rounded-lg"
      src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
      alt={`${data.title.split(' ').join('-')}-poster`}
    />
  </div>
);
