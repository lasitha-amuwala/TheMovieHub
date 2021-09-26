import React, { useRef, useState, useEffect } from 'react';

import { ListItem } from './ListItem';
import { ReactComponent as ChevronRight } from '../icons/chevronRight.svg';
import { ReactComponent as ChevronLeft } from '../icons/chevronLeft.svg';

export const List = ({ data, title }) => {
  //const [distance, setDistance] = useState(0);
  //const [count, setCount] = useState(0);
  //const [numToShow, setNumToShow] = useState(0);
  const listRef = useRef();

  const handleLeftClick = () => {};
  const handleRightClick = () => {};

  return (
    <div className="group mt-3 mb-2 text-white w-full">
      <span className="text-white text-xl m-ml-4% 2xl:ml-14 font-medium">
        {title}
      </span>
      <div className="mt-3 relative">
        <div className="w-4% 2xl:w-14 h-full rounded-r-lg cursor-pointer bg-black absolute left-0 z-50 bg-opacity-50 hover:bg-opacity-70">
          <ChevronLeft
            className="w-full h-full opacity-0 group-hover:opacity-100"
            onClick={() => handleLeftClick()}
          />
        </div>
        <div className="w-4% 2xl:w-14 h-full rounded-l-lg cursor-pointer bg-black absolute right-0 z-50 bg-opacity-50 hover:bg-opacity-70">
          <ChevronRight
            className="w-full h-full opacity-0 group-hover:opacity-100"
            onClick={() => handleRightClick()}
          />
        </div>
        <div
          ref={listRef}
          className="flex m-ml-4% 2xl:ml-14 w-max gap-2 h-full transform-transform duration-300 ease-linear "
        >
          {data.map((item) => (
            <ListItem data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

/*
  const handleClick = (direction) => {
    //let distance = listRef.current.getBoundingClientRect().x - 48;
    //let num = Math.floor((window.innerWidth - 48) / 231);
    //setNum(num);
    let width;
    if (count + numToShow > data.length) {
      width = (data.length % numToShow) * 231;
      setCount(numToShow);
    } else {
      width = numToShow * 231;
    }

    if (direction === 'left') {
      setCount(count - numToShow);
      listRef.current.style.transform = `translateX(${width + distance}px)`;
      setDistance(distance + width);
    } else if (direction === 'right') {
      console.log('yo');
      setCount(count + numToShow);
      console.log(distance - width);
      listRef.current.style.transform = `translateX(${
        -window.innerHeight + 48 * 2
      }px)`;
      setDistance(distance - width);
    }
  };
*/
