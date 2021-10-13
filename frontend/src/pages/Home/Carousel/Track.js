import React, { useState, useEffect, useRef } from 'react';
import { usePrevious } from '../../../hooks/usePrevious';

export const Track = ({ children, slideIndex, lastIndex, onLoop }) => {
	const [index, setIndex] = useState(slideIndex);

	const ref = useRef(null);
	const prevIndex = usePrevious(index);

	useEffect(() => setIndex(slideIndex), [slideIndex]);
	useEffect(() => {
		ref.current && handleClick();
		if (index === lastIndex && prevIndex === 0) {
			onLoop(lastIndex - 1);
		}
	}, [index]);

	const handleLoop = () => {
		if (index === lastIndex && prevIndex !== 0) {
			onLoop(0);
		}
	};

	const handleClick = () =>
		(ref.current.style.transform =
			index > prevIndex
				? `translateX(${-ref.current.clientWidth * index}px)`
				: `translateX(${ref.current.clientWidth * -index}px)`);

	return (
		<div
			ref={ref}
			onTransitionEnd={handleLoop}
			className={
				(index === 0 && prevIndex === lastIndex) ||
				(index === lastIndex && prevIndex === lastIndex)
					? ''
					: 'transition duration-500 ease-in-out'
			}
		>
			{children}
		</div>
	);
};
