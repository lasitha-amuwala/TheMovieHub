import React, { useEffect, useRef } from 'react';

export const Track = ({ children, slideIndex, prevRef }) => {
	const ref = useRef(null);

	const handleClick = () =>
		(ref.current.style.transform =
			slideIndex > prevRef.current
				? `translateX(${-ref.current.clientWidth * slideIndex}px)`
				: `translateX(${ref.current.clientWidth * -slideIndex}px)`);

	useEffect(() => {
		ref.current && handleClick();
		prevRef.current = slideIndex;
	}, [slideIndex]);

	return (
		<div ref={ref} className="transition duration-300 ease-in-out">
			{children}
		</div>
	);
};
