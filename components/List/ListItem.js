import { useState, forwardRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useApiConfiguration from '../../src/useApiConfig';

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
            <div className='list2 relative h-full overflow-hidden rounded-lg hover:ring-2 hover:ring-borderPrimary'>
              <div className='item-cover block h-full bg-backgroundShadow '>
                <Image
                  width={16}
                  height={9}
                  layout='responsive'
                  className='rounded-t-lg'
                  objectFit='cover'
                  src={getImageUrl(data.backdrop_path, { original: false })}
                  alt={`${data.title.split(' ').join('-')}-poster`}
                />
                <div className='p-2'>{data.title}</div>
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
