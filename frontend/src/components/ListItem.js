import React from 'react';

export const ListItem = ({data}) => {
  return (
    <div className="h-80 select-none">
      <img
        className="h-full w-54 max-w-none ring ring-gray-900 ring-opacity-100 cursor-pointer focus:ring-gray-700 rounded-lg"
        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
        alt={`${data.title.split(' ').join('-')}-poster`}
      />
    </div>
  );
};
