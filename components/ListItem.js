import React, { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ListItem = forwardRef(({ data }, ref) => {
  let id = data.id || data.tv_id;
  return (
    data.poster_path && (
      <li className='item listWidth h-full shrink-0 overflow-hidden px-1 transition-all duration-700 sm:px-[6px] 3xl:px-3'>
        <Link href={`/details/${id}`}>
          <a className='relative'>
            <div className='relative'>
              <img
                ref={ref}
                className='item-poster absolute cursor-pointer rounded-md transition-opacity duration-500'
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                alt={`${data.title.split(' ').join('-')}-poster`}
              />
            </div>
            <div className='item-cover relative h-full rounded-md opacity-0 transition-opacity duration-500'>
              <div className='h-full rounded-md bg-backgroundShadow'>
                <Image
                  width={500}
                  height={350}
                  layout='responsive'
                  objectFit='cover'
                  quality={100}
                  className='cursor-pointer rounded-t-md opacity-100'
                  src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
                  alt={`${data.title.split(' ').join('-')}-poster`}
                />
                <div className='flex p-2 text-center'>
                  <div>{data.title}</div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </li>
    )
  );
});

ListItem.displayName = 'ListItem'; // getting past lint error Component definition is missing display name  react/display-name
export default ListItem;
