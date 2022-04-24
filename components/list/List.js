import { useRef, useState, useEffect } from 'react';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';
import ListItem from './ListItem';
import ListButton from './ListButton';
import { useQuery } from 'react-query';
import classNames from 'classnames';

export const List = ({ query, title }) => {
  const listRef = useRef(null);
  const itemRef = useRef(null);

  const { data } = useQuery(query);

  const [count, setCount] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [numItemsOnScreen, setNumItemsOnScreen] = useState([]);
  const [hover, setHover] = useState(false);
  const [animation, setAnimation] = useState(true);

  const handleLeftClick = () => handleClick('left');
  const handleRightClick = () => handleClick('right');

  const onItemHover = (isHover, i) =>
    setHover(isHover && ((i + 1) % numItemsOnScreen == 0 || i == data.results.length - 1));

  const handleClick = direction =>
    direction == 'left'
      ? setCount(c => (c ? c - 1 : 0))
      : setCount(c => (c >= numPages - 1 ? numPages : c + 1));

  const setStates = () => {
    const numItemsOnScreen = Math.round(listRef.current.clientWidth / itemRef.current.clientWidth);
    const numTotalItems = Math.round(listRef.current.scrollWidth / itemRef.current.clientWidth);
    const numPages = Math.ceil(numTotalItems / numItemsOnScreen);
    setNumItemsOnScreen(numItemsOnScreen);
    setNumPages(numPages);
  };

  useEffect(() => {
    const list = listRef.current;
    const translate = list.clientWidth * count;
    const scrollDiff = list.scrollWidth - list.clientWidth;
    const newTranslate = translate > scrollDiff ? list.scrollWidth - list.clientWidth : translate;
    list.style.transform = `translateX(-${newTranslate}px)`;
  }, [count]);

  useEffect(() => setStates(), []);

  // Temperarily stop animations on window resize for better performance
  useEffect(() => {
    addEventListener('resize', handleResize);
    return () => removeEventListener('resize', handleResize);
  }, []);

  let resizeTimer;
  const handleResize = () => {
    // setAnimation(false);
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setStates();
      // setAnimation(true);
    }, 100);
  };

  return (
    <div
      className={classNames('list group relative w-full', {
        'resize-animation-stopper': !animation,
      })}
    >
      <h1 className='pl-4 text-2xl font-semibold sm:ml-5% sm:pl-1 lg:pl-2'>{title}</h1>
      <div className='highlights-none relative mt-2 h-full w-full md:mt-4 lg:mt-6'>
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
        <div className='track w-full select-none overflow-x-scroll pl-3 pr-5% scrollbar-hide sm:overflow-visible sm:px-5% sm:scrollbar-default'>
          <ul
            className={`${hover && 'hideFistChild'} sm:netflixTransition flex h-full w-full`}
            ref={listRef}
          >
            {data.results.map((item, index) => (
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
