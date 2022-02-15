import React, { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ListItem = forwardRef(({ data }, ref) => {
  let id = data.id || data.tv_id;
  return (
    data.poster_path && (
      <li className='relative z-0 min-w-1/3 transform px-1 transition ease-in-out sm:min-w-1/4 md:min-w-1/5 lg:min-w-1/6 xl:min-w-1/7 2xl:min-w-1/8'>
        <Link href={`/details/${id}`}>
          <a className='relative'>
            <img
              ref={ref}
              layout='fill'
              className='h-auto cursor-pointer rounded-lg transition-all duration-300 hover:ring'
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt={`${data.title.split(' ').join('-')}-poster`}
            />
          </a>
        </Link>
      </li>
    )
  );
});

ListItem.displayName = 'ListItem'; // getting past lint error Component definition is missing display name  react/display-name
export default ListItem;
