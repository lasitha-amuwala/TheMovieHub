import { forwardRef } from 'react';
import Link from 'next/link';
import useApiConfiguration from '../../src/hooks/useApiConfig';
import { MdOutlineStar } from 'react-icons/md';
import NextImage from '../NextImage';
import { getYearFromDate } from '../../src/commonUtils';

const ListItem = forwardRef(({ data, index, onItemHover }, ref) => {
  const { getImageUrl } = useApiConfiguration();

  const onMouseOut = () => onItemHover(false, index);
  const onMouseEnter = () => onItemHover(true, index);

  return (
    data.poster_path && (
      <li
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseOut}
        className='item listWidth listHeight shrink-0 px-1 drop-shadow-md sm:px-2 lg:px-[10px] xl:px-3 3xl:px-[14px]'
      >
        <Link href={`/movie/${data.id}`}>
          <a>
            <div className='relative h-full overflow-hidden rounded-md'>
              <div className='item-poster relative top-0 block h-full w-full object-fill '>
                <NextImage
                  layout='fill'
                  src={getImageUrl(data.poster_path)}
                  alt={data.title}
                  className='rounded-md'
                  objectFit='cover'
                  objectPosition='top'
                  placeholder='blur'
                  blurDataURL='/placeholder.png'
                  unoptimized
                />
              </div>
              <div className='item-cover absolute top-0 flex h-full w-full flex-col bg-black bg-opacity-70 backdrop-blur-3xl'>
                <div className='relative grow'>
                  <NextImage
                    src={getImageUrl(data.backdrop_path)}
                    alt={data.title}
                    layout='fill'
                    className='rounded-t-md'
                    objectFit='cover'
                    objectPosition='center'
                    unoptimized
                  />
                </div>
                <div className='flex flex-col justify-center px-5 py-2'>
                  <div className='flex items-center'>{data.title}</div>
                  <div className='h-1/2 w-full'>
                    <div className='flex grow items-center justify-between text-gray-300'>
                      <div>{getYearFromDate(data.release_date)}</div>
                      <div className='flex items-center gap-2'>
                        <MdOutlineStar className='fill-yellow-400' />
                        <span className='font-medium text-white'>{data.vote_average}</span> / 10
                      </div>
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
// <div className='flex h-1/2 w-full grow items-center font-medium line-clamp-1'>
//   <div>{data.title}</div>
// </div>
ListItem.displayName = 'ListItem'; // getting past lint error Component definition is missing display name  react/display-name
export default ListItem;

/*                  <h6 className='grow font-medium line-clamp-1'>{data.title}</h6>
                  <div className='flex grow items-center justify-between text-gray-300'>
                    <div>{getYearFromDate(data.release_date)}</div>
                    <div className='flex  gap-2'>
                      <MdOutlineStar className='fill-yellow-400' />
                      <span className='font-medium text-white'>{data.vote_average}</span> / 10
                    </div>
                  </div> */
