import { useRef, useState, useEffect } from 'react';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';
import ListItem from './ListItem';
import ListButton from './ListButton';

export const List = ({ data, title }) => {
  const listRef = useRef(null);
  const itemRef = useRef(null);

  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [numItems, setNumItems] = useState(0);
  const [numPages, setNumPages] = useState(0);

  const handleResize = () => {
    if (window.innerWidth > 1536) setWindowWidth(1);
    else if (window.innerWidth > 1280) setWindowWidth(2);
    else if (window.innerWidth > 1024) setWindowWidth(3);
    else if (window.innerWidth > 768) setWindowWidth(4);
    else if (window.innerWidth > 640) setWindowWidth(5);
    else setWindowWidth(6);
  };

  const setStates = () => {
    const numItemsOnScreen = Math.round(listRef.current.clientWidth / itemRef.current.clientWidth);
    const numTotalItems = Math.round(listRef.current.scrollWidth / itemRef.current.clientWidth);
    const numOfPages = Math.ceil(numTotalItems / numItemsOnScreen);
    setNumItems(numTotalItems);
    setNumPages(numOfPages);
  };

  const handleLeftClick = () => handleClick('left');
  const handleRightClick = () => handleClick('right');

  const onItemHover = data => {
    /*
    console.log(data);
    if (data == true) {
      listRef.current.style.transition = 'transform 500ms 200ms;';
      listRef.current.style.transform = `translateX(-${itemRef.current.clientWidth}px)`;
    } else {
      const str = listRef.current.style.transform;
      const str2 = Number(str.substring(str.indexOf('(') + 1, str.lastIndexOf('px)')));
      listRef.current.style.transform = `translateX(-${str2 + itemRef.current.clientWidth}px)`;
    }
    */
  };

  const handleClick = direction => {
    setStates();
    if (direction == 'left') {
      setCount(count ? count - 1 : 0);
    } else {
      setCount(count >= numPages - 1 ? numPages : count + 1);
    }
  };

  useEffect(() => {
    setStates();

    const list = listRef.current;
    const translate = list.clientWidth * count;
    const scrollDiff = list.scrollWidth - list.clientWidth;
    const newTranslate = translate > scrollDiff ? list.scrollWidth - list.clientWidth : translate;

    list.style.transform = `translateX(-${newTranslate}px)`;
  }, [count, numItems, numPages]);

  useEffect(() => window.addEventListener('resize', handleResize), []);

  return (
    <div className='list group relative mt-5 w-full text-white lg:mt-0 lg:mb-12 2xl:mb-12'>
      <span className='ml-3 h-full pl-1 text-xl font-medium text-white sm:ml-7% sm:odd:-top-14 md:ml-5% md:text-xl lg:absolute lg:text-2xl 2xl:-top-16 2xl:text-3xl 3xl:text-4xl'>
        {title}
      </span>
      <div className='highlights-none relative mt-2 h-full md:mt-4 lg:mt-0'>
        {!!count && (
          <ListButton
            icon={<HiOutlineChevronLeft />}
            className='left-0 rounded-r-md'
            onClick={handleLeftClick}
          />
        )}
        {count < numPages - 1 && (
          <ListButton
            icon={<HiOutlineChevronRight />}
            className='right-0 rounded-l-md'
            onClick={handleRightClick}
          />
        )}
        <div
          className={`track select-none overflow-x-scroll px-3 scrollbar-hide sm:overflow-visible sm:px-7% sm:scrollbar-default md:px-5%`}
        >
          <ul className='sm:netflixTransiiton flex h-full' ref={listRef}>
            {data.map((item, index) => (
              <ListItem
                data={item}
                index={index}
                key={item.id}
                ref={itemRef}
                onItemHover={onItemHover}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
