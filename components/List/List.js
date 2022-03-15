import { useRef, useState, useEffect } from 'react';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';
import ListItem from './ListItem';
import ListButton from './ListButton';

export const List = ({ data, title }) => {
  const listRef = useRef(null);
  const itemRef = useRef(null);

  const [count, setCount] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [hoverList, setHoverList] = useState([]);
  const [hover, setHover] = useState(false);

  const handleLeftClick = () => handleClick('left');
  const handleRightClick = () => handleClick('right');

  const handleClick = direction => {
    setStates();

    direction == 'left'
      ? setCount(c => (c ? c - 1 : 0))
      : setCount(c => (c >= numPages - 1 ? numPages : c + 1));
  };

  const onItemHover = (isHover, index) =>
    setHover(isHover && hoverList[count] == index + 1 ? true : false);

  const setStates = () => {
    const numItemsOnScreen = Math.round(listRef.current.clientWidth / itemRef.current.clientWidth);
    const numTotalItems = Math.round(listRef.current.scrollWidth / itemRef.current.clientWidth);
    const numOfPages = Math.ceil(numTotalItems / numItemsOnScreen);

    const hoverItems = Array(numTotalItems) // create an array of numTotalItems
      .fill()
      .map((x, i) => i);
    hoverItems = hoverItems.filter(i => i % numItemsOnScreen == 0); // filter array with indexes divisible by numOfItemsOnScreen
    hoverItems.shift(0);
    hoverItems.push(numTotalItems);

    setHoverList(hoverItems);
    setNumPages(numOfPages);
  };

  let resizeTimer;
  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setStates();
    }, 100);
  };

  useEffect(() => {
    addEventListener('resize', handleResize);
    return () => removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setStates();
    const list = listRef.current;
    const translate = list.clientWidth * count;
    const scrollDiff = list.scrollWidth - list.clientWidth;
    const newTranslate = translate > scrollDiff ? list.scrollWidth - list.clientWidth : translate;
    list.style.transform = `translateX(-${newTranslate}px)`;
  }, [count]);

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
          <ul
            className={`${hover && 'hideFistChild'} sm:netflixTransiiton flex h-full`}
            ref={listRef}
          >
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
