import React, { useState, useEffect, useRef } from 'react';

export const Track = ({ children, slideIndex, prevRef, loop }) => {
	const [index, setIndex] = useState(0);
	const ref = useRef(null);
	console.log(loop, slideIndex)
	const handleClick = () =>
		(ref.current.style.transform =
			index > prevRef.current
				? `translateX(${-ref.current.clientWidth * index}px)`
				: `translateX(${ref.current.clientWidth * -index}px)`);

	useEffect(() => setIndex(loop ? slideIndex + 1 : slideIndex), [slideIndex]);

	useEffect(() => {
		ref.current && handleClick();
		prevRef.current = index;
	}, [index]);

	return (
		<div
			ref={ref}
			className={!loop ? 'transition duration-300 ease-in-out' : 'transition duration-300 ease-in-out'}
		>
			{children}
		</div>
	);
};
