import React, { useRef, useState, useEffect } from 'react';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import { ListItem } from './ListItem';

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
		<div className='relative group mb-5 mt-5 lg:mt-0 lg:mb-20 2xl:mb-24 text-white w-full'>
			<span className='lg:absolute -top-14 2xl:-top-16 text-white md:text-2xl lg:text-3xl 2xl:text-4xl pl-1 ml-7% md:ml-5% font-medium'>
				{title}
			</span>
			<div className='mt-3 relative'>
				{count > 0 && (
					<div className='w-7% md:w-5% h-full rounded-r-lg cursor-pointer bg-black absolute left-0 z-50 bg-opacity-60 hover:bg-opacity-80 select-none'>
						<HiOutlineChevronLeft
							onClick={() => handleClick('left')}
							className='w-full h-full opacity-0 group-hover:opacity-100 transform transition duration-200 hover:scale-125'
						/>
					</div>
				)}
				{(count === 0 || count !== lastIndex) && (
					<div className='w-7% md:w-5% h-full rounded-l-lg cursor-pointer bg-black absolute right-0 z-50 bg-opacity-60 hover:bg-opacity-80 select-none'>
						<HiOutlineChevronRight
							onClick={() => handleClick('right')}
							className='h-full w-full opacity-0 group-hover:opacity-100 transform transition duration-200 hover:scale-125'
						/>
					</div>
				)}
				<div {...handlers} className='px-7% md:px-5% z-10 select-none'>
					<ul
						ref={listRef}
						style={{
							display: 'flex',
							transition:
								'transform .75s ease 0s,-webkit-transform .75s ease 0s,-moz-transform .75s ease 0s,-o-transform .75s ease 0s',
						}}>
						{data.map((item) => (
							<ListItem data={item} key={item.id} ref={itemRef} />
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
