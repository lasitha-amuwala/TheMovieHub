import { useState, forwardRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useApiConfiguration from '../../src/useApiConfig';
import { MdOutlineStar } from 'react-icons/md';

const ListItem = forwardRef(({ data, index, numPerList, onItemHover }, ref) => {
  const { getImageUrl } = useApiConfiguration();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const onLoad = useCallback(() => {});

  const onMouseEnter = () => index == 5 && onItemHover(true);
  const onMouseOut = () => index == 5 && onItemHover(false);

  return (
    data.poster_path && (
      <li
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseOut}
        ref={ref}
        className={`item listWidth listHeight shrink-0 px-1 drop-shadow-[0_7px_7px_rgba(0,0,0,0.3)] sm:px-[6px] 3xl:px-3`}
      >
        <Link href={`/details/${data.id}`}>
          <a>
            <div className='list2 relative h-full overflow-hidden rounded-lg transition duration-200 sm:hover:ring-2 sm:hover:ring-borderPrimary'>
              <div className='item-cover flex h-full flex-col bg-backgroundShadow'>
                <div className='hidden sm:block '>
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
                <div className='flex h-full flex-col justify-center p-1 px-3 2xl:p-3 2xl:px-4 3xl:px-5 text-sm md:text-base xl:text-lg 2xl:text-xl'>
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
              <div className='item-poster absolute top-0 block h-full w-full '>
                <Image
                  width={200}
                  height={300}
                  layout='responsive'
                  className='rounded-lg'
                  objectFit='cover'
                  objectPosition='top'
                  placeholder='blur'
                  blurDataURL='/placeholder.png'
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
