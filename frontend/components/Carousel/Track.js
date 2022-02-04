import React, { useEffect, useRef } from 'react';

export const Track = ({ handleAnimation, handleIndex, ...props }) => {
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current)
			ref.current.style.transform = `translateX(${100 * -props.slideIndex}%)`;
	}, [props.slideIndex]);

	const handleLoop = () => {
		if (props.slideIndex === 0 && props.prevIndex !== 0) {
			handleIndex(props.lastIndex - 1);
			handleAnimation(false);
		} else if (props.slideIndex === props.lastIndex - 1) {
			handleIndex(0);
			handleAnimation(false);
		}
	};

	const transition =
		'transform .75s ease 0s,-webkit-transform .75s ease 0s,-moz-transform .75s ease 0s,-o-transform .75s ease 0s';
	return (
		<div
			ref={ref}
			onTransitionEnd={handleLoop}
			style={{ transition: props.animation && transition }}
		>
			{props.children}
		</div>
	);
};
