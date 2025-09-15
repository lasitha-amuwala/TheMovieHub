import { forwardRef, useEffect, useState } from 'react';
import Link from 'next/link';
import useApiConfiguration from '../../src/hooks/useApiConfig';
import { MdOutlineStar } from 'react-icons/md';
import NextImage from '../NextImage';
import { getYearFromDate } from '../../src/commonUtils';
import Blur from '../Blur';

const ListItem = forwardRef(({ data, index, onItemHover }, ref) => {
  const { getImageUrl } = useApiConfiguration();
  const [hover, setHover] = useState();
  const [blur, setBlur] = useState(0);

  const onMouseOut = () => {
    setHover(hover);
    setBlur(0);
  };
  const onMouseEnter = () => {
    setHover(hover);
    setBlur(64);
  };

  useEffect(() => onItemHover(hover, index), [hover]);

  return (
    data.poster_path && (
      <li
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseOut}
        className='item listWidth listHeight shrink-0 px-1 drop-shadow-md sm:px-2 lg:px-[10px] xl:px-3 3xl:px-[14px]'
      >
        <Link href={`/movie/${data.id}`}>
          <div className='relative h-full overflow-hidden '>
            <div className='item-poster relative top-0 block h-full w-full object-fill '>
              <Blur blurRadius={blur}>
                <NextImage
                  fill
                  src={getImageUrl(data.poster_path)}
                  alt={data.title}
                  className='object-cover object-top'
                  placeholder='blur'
                  blurDataURL='/placeholder.png'
                  unoptimized
                />
              </Blur>
            </div>
            <div className='item-cover absolute top-0 flex h-full w-full flex-col'>
              <div className='relative grow'>
                <NextImage
                  src={getImageUrl(data.backdrop_path)}
                  alt={data.title}
                  fill
                  className='object-cover object-center'
                  unoptimized
                />
              </div>
              <div className='z-[1] flex flex-col justify-center px-5 py-2 bg-black/50'>
                <div className='truncate'>{data.title}</div>
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
        </Link>
      </li>
    )
  );
});

ListItem.displayName = 'ListItem'; // getting past lint error Component definition is missing display name  react/display-name
export default ListItem;
