import React, { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useApiConfiguration from '../src/useApiConfig';

const ListItem = forwardRef(({ data }, ref) => {
  const { getImageUrl } = useApiConfiguration();

  return (
    data.poster_path && (
      <li
        ref={ref}
        className='item listWidth listHeight shrink-0 px-1 sm:px-[6px] 3xl:px-3 '
      >
        <Link href={`/details/${data.id}`}>
          <a>
            <div className='relative h-full overflow-hidden rounded-lg'>
              <div className='item-cover block h-full bg-backgroundShadow'>
                <Image
                  width={3}
                  height={2}
                  layout='responsive'
                  objectFit='cover'
                  src={getImageUrl(data.backdrop_path, { original: false })}
                  alt={`${data.title.split(' ').join('-')}-poster`}
                />
                <div className='p-2'>{data.title}</div>
              </div>
              <div className='item-poster absolute top-0 block h-full w-full'>
                <Image
                  width={2}
                  height={3}
                  layout='responsive'
                  objectFit='cover'
                  objectPosition='top'
                  src={getImageUrl(data.poster_path, { original: false })}
                  alt={`${data.title.split(' ').join('-')}-poster`}
                />
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
