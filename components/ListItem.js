import React, { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ListItem = forwardRef(({ data }, ref) => {
  let id = data.id || data.tv_id;
  return (
    data.poster_path && (
      <li className='item relative z-0 min-w-[33.33%] px-[6px] sm:min-w-[25%] md:min-w-[20%] lg:min-w-[16.66%] xl:min-w-[14.29%] 2xl:min-w-[12.5%]  2xl:px-3'>
        <Link href={`/details/${id}`}>
          <a className='relative'>
            <img
              ref={ref}
              layout='fill'
              className='h-auto cursor-pointer rounded-md transition-all duration-300 hover:ring'
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
