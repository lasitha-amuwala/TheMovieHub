import React, { useState, useEffect, useRef } from 'react';
import { usePrevious } from '../../../hooks/usePrevious';

export const Track = ({ children, slideIndex, lastIndex, onLoop }) => {
	const [index, setIndex] = useState(slideIndex);

	const ref = useRef(null);
	const prevIndex = usePrevious(index);

	useEffect(() => setIndex(slideIndex), [slideIndex]);

	useEffect(() => {
		if (ref.current)
			ref.current.style.transform = `translateX(${100 * -index}%)`;
		if (index === lastIndex && prevIndex === 0) onLoop(lastIndex - 1);
	}, [index]);

	const handleLoop = () => {
		if (index === lastIndex && prevIndex !== 0) onLoop(0);
	};

	return (
		<div
			ref={ref}
			onTransitionEnd={handleLoop}
			className={
				(index === 0 && prevIndex === lastIndex) ||
				(index === lastIndex && prevIndex === lastIndex)
					? ''
					: 'transition duration-300 md:duration-700 ease-in-out'
			}
		>
			{children}
		</div>
	);
};
