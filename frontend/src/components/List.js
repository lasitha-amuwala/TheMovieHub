import React, { useRef, useState } from 'react';

import { ListItem } from './ListItem';
import { ReactComponent as ChevronRight } from '../icons/chevronRight.svg';
import { ReactComponent as ChevronLeft } from '../icons/chevronLeft.svg';

export const List = ({ data, title }) => {
  const [dat, setData] = useState(data);
  const [distance, setDistance] = useState(0);
  const [count, setCount] = useState(0)
  const listRef = useRef();


  const handleClick = (direction) => {
    //let distance = listRef.current.getBoundingClientRect().x - 48;
    let num = Math.floor((window.innerWidth - 48)/231)
    let width = num * 231
    if (direction === 'left') {
      listRef.current.style.transform = `translateX(${width + distance}px)`;
      setDistance(distance + width);
    } else {
      listRef.current.style.transform = `translateX(${-width + distance}px)`;
      setDistance(distance - width);
    }
  };

  return (
    <div className="w-full mt-5 text-white">
      <span className="text-white text-xl ml-12 font-medium">{title}</span>
      <div className="mt-3 relative">
        <ChevronLeft
          className="w-12 top-1/4 h-1/2 rounded-lg absolute left-0 z-50 bg-gray-800 bg-opacity-40 hover:bg-opacity-70 cursor-pointer"
          onClick={() => handleClick('left')}
        />
        <ChevronRight
          className="w-12 top-1/4 h-1/2 rounded-lg absolute right-0 z-50 bg-gray-800 bg-opacity-40 hover:bg-opacity-70 cursor-pointer"
          onClick={() => handleClick('right')}
        />
        <div
          className="ml-12 gap-4 flex w-max transform-transform duration-500 ease-linear"
          ref={listRef}
        >
          {data.map((item, index) => (
            <ListItem data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
