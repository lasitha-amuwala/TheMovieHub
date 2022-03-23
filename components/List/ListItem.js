import { forwardRef } from 'react';
import Link from 'next/link';
import useApiConfiguration from '../../src/hooks/useApiConfig';
import { MdOutlineStar } from 'react-icons/md';
import NextImage from '../NextImage';
import { getMovieYear } from '../../src/movieUtils';

const ListItem = forwardRef(({ data, index, onItemHover }, ref) => {
  const { getImageUrl } = useApiConfiguration();

  const onMouseEnter = () => onItemHover(true, index);
  const onMouseOut = () => onItemHover(false, index);

  return (
    data.poster_path && (
      <li
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseOut}
        className={`item listWidth listHeight shrink-0 px-1 drop-shadow-md sm:px-[6px] lg:px-2 3xl:px-3`}
      >
        <Link href={`/movie/${data.id}`}>
          <a>
            <div className='relative h-full overflow-hidden rounded-md'>
              <div className='item-poster relative top-0 block h-full w-full object-fill '>
                <NextImage
                  layout='fill'
                  className='rounded-md'
                  objectFit='cover'
                  objectPosition='top'
                  placeholder='blur'
                  blurDataURL='/placeholder.png'
                  src={getImageUrl(data.poster_path)}
                  alt={data.title}
                />
              </div>
              <div className='item-cover absolute top-0 flex h-full w-full flex-col  bg-black bg-opacity-40 backdrop-blur-2xl'>
                <div className='sm:block'>
                  <NextImage
                    width={16}
                    height={8.5}
                    layout='responsive'
                    className='rounded-t-md'
                    objectFit='cover'
                    src={getImageUrl(data.backdrop_path)}
                    alt={data.title}
                  />
                </div>
                <div className='2x1:text-base flex h-full flex-col justify-center p-1 px-3 text-sm md:p-2 md:px-3 md:text-sm lg:text-base 2xl:p-3 2xl:px-4 2xl:text-xl 3xl:p-5 3xl:text-2xl'>
                  <div className='grow font-medium line-clamp-1'>{data.title}</div>
                  <div className='flex grow justify-between text-gray-300'>
                    <div>{getMovieYear(data.release_date)}</div>
                    <div className='flex items-center gap-2'>
                      <MdOutlineStar className='fill-yellow-400' />
                      <span className='font-medium text-white'>{data.vote_average}</span> / 10
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
