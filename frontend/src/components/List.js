import React, { useRef, useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

import { ListItem } from './ListItem';
import { ReactComponent as ChevronRight } from '../icons/chevronRight.svg';
import { ReactComponent as ChevronLeft } from '../icons/chevronLeft.svg';

export const List = ({ data, title }) => {
	const listRef = useRef(null);
	const itemRef = useRef(null);

	const [count, setCount] = useState(0);
	const [lastIndex, setLastIndex] = useState(1);
	const [windowWidth, setWindowWidth] = useState(0);

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
		let currList = listRef.current;
		let currItem = itemRef.current;

		if (currList && currItem) {
			let len = data.length;
			let num = Math.floor(currList.clientWidth / currItem.clientWidth);
			let newLastIndex = Math.ceil(len / num) - 1;

			setLastIndex(newLastIndex);
			if (count > newLastIndex) setCount(newLastIndex);

			let remainder = len - num * count;
			let translate = remainder < num ? count - 1 + remainder / num : count;
			listRef.current.style.transform = `translateX(${translate * -100}%)`;
		}
	}, [count, windowWidth]);

	useEffect(() => window.addEventListener('resize', handleResize), []);

	return (
		<div className="group mt-3 mb-2 text-white w-full">
			<span className="text-white text-xl m-ml-5% font-medium">{title}</span>
			<div className="mt-3 relative">
				{count > 0 && (
					<div className="w-7% md:w-5% h-full rounded-r-lg cursor-pointer bg-black absolute left-0 z-50 bg-opacity-60 hover:bg-opacity-80 select-none">
						<ChevronLeft
							className="w-full h-full opacity-0 group-hover:opacity-100"
							onClick={() => handleClick('left')}
						/>
					</div>
				)}
				{(count === 0 || count !== lastIndex) && (
					<div className="w-7% md:w-5% h-full rounded-l-lg cursor-pointer bg-black absolute right-0 z-50 bg-opacity-60 hover:bg-opacity-80 select-none">
						<ChevronRight
							className="w-full h-full opacity-0 group-hover:opacity-100"
							onClick={() => handleClick('right')}
						/>
					</div>
				)}
				<div
					{...handlers}
					className="px-7% md:px-5% overflow-hidden select-none"
				>
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
