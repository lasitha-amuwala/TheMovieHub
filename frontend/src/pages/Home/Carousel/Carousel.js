import React, { useState, useEffect } from 'react';
import { useInterval } from '../../../hooks/useInterval';

import { ReactComponent as ChevronRight } from '../../../icons/chevronRight.svg';
import { ReactComponent as ChevronLeft } from '../../../icons/chevronLeft.svg';

import { Track } from './Track';
import { CarouselItem } from './CaroselItem';
import { useSwipeable } from 'react-swipeable';

export const Carousel = ({ slides, autoplay }) => {
	const [sliderData, setSliderData] = useState([]);
	const [slideIndex, setSlideIndex] = useState(0);
	const [lastIndex, setLastIndex] = useState(0);
	const [delay, setDelay] = useState(10000);

	// Add first element to the end of the list to create an infinite carousel
	useEffect(() => {
		if (slides.length > 0) {
			let list = slides.concat([slides[0]]);
			setSliderData(list);
			setLastIndex(list.length - 1);
		}
	}, [slides]);

	// enable auto play every set interval
	useInterval(() => handleClick('right'), autoplay ? delay : null);

	const handleClick = (direction) => {
		setDelay(delay + 1);
		direction === 'left'
			? setSlideIndex((idx) => (idx <= 0 ? lastIndex : idx - 1))
			: setSlideIndex((idx) => (idx >= lastIndex ? 0 : idx + 1));
	};
	
	const handlers = useSwipeable({
		onSwipedLeft: () => handleClick('right'),
		onSwipedRight: () => handleClick('left')
	});

	// if the datails not an array return null
	if (!Array.isArray(sliderData) || !sliderData.length) return null;

	const SliderButton = ({ children, classes, onClick }) => {
		const classNames = `absolute flex items-center p-3 sm:p-4 ${classes} bottom-0 sm:bottom sm:bottom-45% sm:rounded-full bg-bg bg-opacity-0 sm:bg-opacity-50 sm:hover:bg-opacity-80 z-10 cursor-pointer select-none backdrop-filter sm:backdrop-blur`;
		return (
			<button className={classNames} onClick={onClick}>
				{children}
			</button>
		);
	};

	return (
		<div className="relative justify-center items-center">
			<SliderButton
				onClick={() => handleClick('left')}
				classes="left-1 sm:left-3"
			>
				<ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
			</SliderButton>
			<SliderButton
				onClick={() => handleClick('right')}
				classes="right-1 sm:right-3"
			>
				<ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
			</SliderButton>
			<div {...handlers} className="w-full overflow-hidden relative">
				<Track
					slideIndex={slideIndex}
					lastIndex={lastIndex}
					onLoop={(index) => setSlideIndex(index)}
				>
					<ul className="flex relative list-none">
						{sliderData.map((data) => (
							<CarouselItem slide={data} />
						))}
					</ul>
				</Track>
			</div>
		</div>
	);
};
