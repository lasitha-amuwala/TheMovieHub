import React, { useRef, useState, useEffect } from 'react';

import { ListItem } from './ListItem';
import { ReactComponent as ChevronRight } from '../icons/chevronRight.svg';
import { ReactComponent as ChevronLeft } from '../icons/chevronLeft.svg';

export const List = ({ data, title }) => {
    const [distance, setDistance] = useState(0);
    const [count, setCount] = useState(0);
    const [numToShow, setNumToShow] = useState(0);
    const listRef = useRef();

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
            listRef.current.style.transform = `translateX(${
                width + distance
            }px)`;
            setDistance(distance + width);
        } else if (direction === 'right') {
            setCount(count + numToShow);

            listRef.current.style.transform = `translateX(${
                distance - width
            }px)`;
            setDistance(distance - width);
        }
    };

    return (
        <div className="mt-3 mb-2 text-white w-full overflow-hidden">
            <div className="mt-3 relative">
                <ChevronLeft
                    className="w-12 top-1/4 h-1/2 rounded-lg absolute left-0 z-50 bg-gray-800 bg-opacity-40 hover:bg-opacity-70 cursor-pointer"
                    onClick={() => handleClick('left')}
                />
                <ChevronRight
                    className="w-12 top-1/4 h-1/2 rounded-lg absolute right-0 z-50 bg-gray-800 bg-opacity-40 hover:bg-opacity-70 cursor-pointer"
                    onClick={() => handleClick('right')}
                />
                <div className="flex items-stretch ml-12 w-max gap-2 h-full">
                    {data.map((item) => {
                        return (
                            <div className="text-white bg-white max-w-1/2 sm:max-w-1/3 md:max-w-1/4 lg:max-w-1/5 xl:max-w-1/6 2xl:max-w-1/7 border-2 border-gray-200">
                                <img
                                    className="h-full ring ring-gray-900 ring-opacity-100 cursor-pointer focus:ring-gray-700 rounded-xl"
                                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                    alt={`${item.title
                                        .split(' ')
                                        .join('-')}-poster`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

{
    /*
<div className="w-screen h-52 mt-3 mb-2 text-white">
      <span className="text-white text-xl ml-12 font-medium">{title}</span>
      <div className="mt-3 relative h-full w-full">
        <ChevronLeft
          className="w-12 top-1/4 h-1/2 rounded-lg absolute left-0 z-50 bg-gray-800 bg-opacity-40 hover:bg-opacity-70 cursor-pointer"
          onClick={() => handleClick('left')}
        />
        <ChevronRight
          className="w-12 top-1/4 h-1/2 rounded-lg absolute right-0 z-50 bg-gray-800 bg-opacity-40 hover:bg-opacity-70 cursor-pointer"
          onClick={() => handleClick('right')}
        />
        <div
          className="ml-12 h-full w-full gap-4 flex transform-transform duration-500 ease-linear"
          ref={listRef}
        >
          {data.map((item, index) => (
            <ListItem data={item} />
          ))}
         
        </div>
      </div>
    </div>
  
  */
}
