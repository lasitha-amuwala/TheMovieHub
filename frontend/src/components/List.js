import React, { useRef, useState, useEffect } from 'react';

import { ListItem } from './ListItem';
import { ReactComponent as ChevronRight } from '../icons/chevronRight.svg';
import { ReactComponent as ChevronLeft } from '../icons/chevronLeft.svg';

export const List = ({ data, title }) => {
	const listRef = useRef(null);
	const itemRef = useRef(null);

	const [count, setCount] = useState(0);
	const [lastIndex, setLastIndex] = useState(0);

	const handleClick = (direction) =>
		setCount((count) => (direction === 'left' ? count - 1 : count + 1));

	const handleSlide = () => {
		if (listRef.current && itemRef.current) {
			let len = data.length;
			let num = Math.floor(
				listRef.current.clientWidth / itemRef.current.clientWidth
			);

			setLastIndex(Math.ceil(len / num) - 1);

			let remainder = len - num * count;
			let translate = remainder < num ? count - 1 + remainder / num : count;
			listRef.current.style.transform = `translateX(${translate * -100}%)`;
		}
	};

	useEffect(handleSlide, [count]);
	useEffect(() => window.addEventListener('resize', () => setCount(0)), []);

	return (
		<div className="group mt-3 mb-2 text-white w-full">
			<span className="text-white text-xl m-ml-5% font-medium">
				{title}
			</span>
			<div className="mt-3 relative">
				{count > 0 && (
					<div className="w-5% h-full rounded-r-lg cursor-pointer bg-black absolute left-0 z-50 bg-opacity-50 hover:bg-opacity-80">
						<ChevronLeft
							className="w-full h-full opacity-0 group-hover:opacity-100"
							onClick={() => handleClick('left')}
						/>
					</div>
				)}
				{(count === 0 || count !== lastIndex) && (
					<div className="w-5% h-full rounded-l-lg cursor-pointer bg-black absolute right-0 z-50 bg-opacity-50 hover:bg-opacity-80">
						<ChevronRight
							className="w-full h-full opacity-0 group-hover:opacity-100"
							onClick={() => handleClick('right')}
						/>
					</div>
				)}
				<div className="px-5% overflow-hidden select-none">
					<ul
						ref={listRef}
						className="flex transition duration-700 ease-in-out"
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
