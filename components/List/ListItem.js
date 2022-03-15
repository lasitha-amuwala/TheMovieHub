import { useState, forwardRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useApiConfiguration from '../../src/useApiConfig';
import { MdOutlineStar } from 'react-icons/md';

const ListItem = forwardRef(({ data, index, onItemHover }, ref) => {
  const { getImageUrl } = useApiConfiguration();

  const onMouseEnter = () => onItemHover(true, index);
  const onMouseOut = () => onItemHover(false, index);

  return (
    data.poster_path && (
      <li
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseOut}
        ref={ref}
        className={`item listWidth listHeight shrink-0 px-1 drop-shadow-[0_7px_7px_rgba(0,0,0,0.3)] sm:px-[6px] 3xl:px-3`}
      >
        <Link href={`/details/${data.id}`}>
          <a>
            <div className='list2 relative h-full overflow-hidden rounded-lg transition delay-200 sm:hover:ring-2 sm:hover:ring-borderPrimary'>
              <div className='item-poster relative top-0 block h-full w-full object-fill '>
                <Image
                  layout='fill'
                  className='rounded-lg'
                  objectFit='cover'
                  objectPosition='top'
                  placeholder='blur'
                  blurDataURL='/placeholder.png'
                  src={getImageUrl(data.poster_path, { original: false })}
                  alt={`${data.title.split(' ').join('-')}-poster`}
                />
              </div>
              <div className='item-cover absolute top-0 flex h-full w-full flex-col bg-backgroundShadow'>
                <div className='sm:block'>
                  <Image
                    width={16}
                    height={8.5}
                    layout='responsive'
                    className='rounded-t-lg'
                    objectFit='cover'
                    src={getImageUrl(data.backdrop_path, { original: false })}
                    alt={`${data.title.split(' ').join('-')}-poster`}
                  />
                </div>
                <div className='flex h-full flex-col justify-center p-1 px-3 text-sm md:text-base xl:text-lg 2xl:p-3 2xl:px-4 2xl:text-xl 3xl:px-5'>
                  <div className='grow font-medium line-clamp-1'>{data.title}</div>
                  <div className='flex grow items-center justify-between  text-gray-300'>
                    <div>{data.release_date.split('-')[0]}</div>
                    <div className='flex items-center gap-2'>
                      <MdOutlineStar className='fill-yellow-400' />
                      <span className='font-semibold text-slate-200'>{data.vote_average}</span> / 10
                    </div>
                  </div>
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
