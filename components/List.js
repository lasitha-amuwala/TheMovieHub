import React, { useRef, useState, useEffect } from 'react';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';
import { useSwipeable } from 'react-swipeable';

import ListItem from './ListItem';

export const List = ({ data, title }) => {
  const listRef = useRef(null);
  const itemRef = useRef(null);

  const [count, setCount] = useState(0);
  const [lastIndex, setLastIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);

  const length = data.length;

  const handleClick = (direction) => {
    if (direction === 'left') setCount((c) => (c > 0 ? c - 1 : 0));
    else setCount((c) => (c < lastIndex ? c + 1 : lastIndex));
  };

  const handleResize = () => {
    if (window.innerWidth > 1536) setWindowWidth(1);
    else if (window.innerWidth > 1280) setWindowWidth(2);
    else if (window.innerWidth > 1024) setWindowWidth(3);
    else if (window.innerWidth > 768) setWindowWidth(4);
    else if (window.innerWidth > 640) setWindowWidth(5);
    else setWindowWidth(6);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleClick('right'),
    onSwipedRight: () => handleClick('left'),
  });

  useEffect(() => {
    let cl = listRef.current;
    let ci = itemRef.current;

    if (cl && cl.clientWidth && ci && ci.clientWidth) {
      let num = Math.floor(cl.clientWidth / ci.clientWidth);
      let newLastIndex = Math.abs(Math.ceil(length / num) - 1);

      setLastIndex(newLastIndex);
      if (count > newLastIndex) setCount(newLastIndex);

      let remainder = length - num * count;
      let translate = remainder < num ? count - 1 + remainder / num : count;
      cl.style.transform = `translateX(${translate * -100}%)`;
    }
  }, [count, windowWidth, length]);

  useEffect(() => window.addEventListener('resize', handleResize), []);

  return (
    <div className='group relative mb-5 mt-5 w-full text-white lg:mt-0 lg:mb-20 2xl:mb-24'>
      <span className='-top-14 ml-7% pl-1 font-medium text-white md:ml-5% md:text-2xl lg:absolute lg:text-3xl 2xl:-top-16 2xl:text-4xl'>
        {title}
      </span>
      <div className='highlights-none relative mt-3'>
        {count > 0 && (
          <div className='absolute left-0 z-50 h-full w-7% cursor-pointer select-none rounded-r-lg bg-black bg-opacity-60 hover:bg-opacity-80 md:w-5%'>
            <HiOutlineChevronLeft
              onClick={() => handleClick('left')}
              className='h-full w-full transform opacity-0 transition duration-200 hover:scale-125 group-hover:opacity-100'
            />
          </div>
        )}
        {(count === 0 || count !== lastIndex) && (
          <div className='absolute right-0 z-50 h-full w-7% cursor-pointer select-none rounded-l-lg bg-black bg-opacity-60 hover:bg-opacity-80 md:w-5%'>
            <HiOutlineChevronRight
              onClick={() => handleClick('right')}
              className='h-full w-full transform opacity-0 transition duration-200 hover:scale-125 group-hover:opacity-100'
            />
          </div>
        )}
        <div {...handlers} className='z-10 select-none px-7% md:px-5%'>
          <ul
            ref={listRef}
            style={{
              display: 'flex',
              transition:
                'transform .75s ease 0s,-webkit-transform .75s ease 0s,-moz-transform .75s ease 0s,-o-transform .75s ease 0s',
            }}
          >
            {data.map((item) => (
              <ListItem data={item} key={item.id} ref={itemRef} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
