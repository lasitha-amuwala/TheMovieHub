import React, { useState, useEffect, useRef } from 'react';
import { usePrevious } from '../../../hooks/hooks';

export const Track = ({
	children,
	slideIndex,
	lastIndex,
	animation,
	prevIndex,
	handleIndex,
	handleAnimation,
}) => {
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current)
			ref.current.style.transform = `translateX(${100 * -slideIndex}%)`;
	}, [slideIndex]);

	const handleLoop = () => {
		if (slideIndex === 0 && prevIndex !== 0) {
			handleIndex(lastIndex - 1);
			handleAnimation(false);
		}
		else if(slideIndex === lastIndex - 1){
			handleIndex(0);
			handleAnimation(false);
		}
	};

	return (
		<div
			ref={ref}
			onTransitionEnd={handleLoop}
			style={{
				transition:
					animation &&
					'transform .75s ease 0s,-webkit-transform .75s ease 0s,-moz-transform .75s ease 0s,-o-transform .75s ease 0s',
			}}
		>
			{children}
		</div>
	);
};
