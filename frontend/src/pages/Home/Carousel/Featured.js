import React, { useState, useRef, useEffect } from 'react';
import { useInterval } from '../../../hooks/useInterval';

import { ReactComponent as ChevronRight } from '../../../icons/chevronRight.svg';
import { ReactComponent as ChevronLeft } from '../../../icons/chevronLeft.svg';
import { ReactComponent as InfoIcon } from '../../../icons/infoIcon.svg';
import { Skeleton, SkeletonElement } from '../../../components/Skeleton';
import { Track } from './Track';

export const Featured = ({ slides, autoplay }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [windowWidth, setWindowWidth] = useState(0);
	const [sliderData, setSliderData] = useState([]);
	const [slideIndex, setSlideIndex] = useState(0);
	const [lastIndex, setLastIndex] = useState(0);
	const [delay, setDelay] = useState(10000);

	useEffect(() => {
		if (slides.length > 0) {
			let list = slides.concat([slides[0]]);
			setSliderData(list);
			setLastIndex(list.length - 1);
		}
	}, [slides]);

//	useEffect(() => windowWidth && setSlideIndex(0), [windowWidth]);

	useInterval(() => handleClick('right'), autoplay ? delay : null);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleClick = (direction) => {
		setDelay(delay + 1);
		direction === 'left'
			? setSlideIndex((idx) => (idx <= 0 ? lastIndex : idx - 1))
			: setSlideIndex((idx) => (idx >= lastIndex ? 0 : idx + 1));
	};

	const handleResize = () => {
		let timeoutId;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(setWindowWidth(window.innerWidth), 100);
	};

	const setIndex = (index) => {
		console.log('index: ', index);
		setSlideIndex(index);
	};

	// if the datails not an array return null
	if (!Array.isArray(sliderData) || !sliderData.length) return null;

	const SliderButton = ({ children, classes, onClick }) => {
		const classNames = `absolute flex items-center p-3 sm:p-4 ${classes} bottom-0 sm:bottom sm:bottom-45% sm:rounded-full bg-bg bg-opacity-0 sm:bg-opacity-50 hover:bg-opacity-80 z-10 cursor-pointer select-none backdrop-filter sm:backdrop-blur`;
		return (
			<button className={classNames} onClick={onClick}>
				{children}
			</button>
		);
	};

	const Skeleton = () => <div className="animate-pulse w-full h-16/9"></div>;

	return (
		<div className="relative justify-center items-center">
			<SliderButton onClick={() => handleClick('left')} classes="left-1 sm:left-3">
				<ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white hover:opacity-100" />
			</SliderButton>
			<SliderButton onClick={() => handleClick('right')} classes="right-1 sm:right-3">
				<ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white hover:opacity-100" />
			</SliderButton>
			<div className="w-full overflow-hidden relative">
				<Track slideIndex={slideIndex} lastIndex={lastIndex} onLoop={setIndex}>
					<ul className="flex relative list-none ">
						{sliderData.map(({ title, backdrop_path, overview}, index) => {
							return (
								<li
									className="min-w-full max-w-full max-h-90vh relative"
									key={index}
								>
									<div className="w-full h-50vw">
										{!imageLoaded && Skeleton()}
										<img
											className="w-full h-full object-cover relative select-none block"
											src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
											alt={`${title.split(' ').join('-')}-poster`}
											onLoad={() => setImageLoaded(true)}
										/>
									</div>
									<div className="absolute left-0sm:left-24 bottom-0 sm:bottom-16 text-white w-full sm:w-1/3 bg-opacity-40 bg-bg px-12 py-3 sm:px-6 sm:py-6 rounded-none sm:rounded-xl backdrop-filter backdrop-blur-lg">
										<p className="text-sm sm:text-4xl sm:font-semibold">{title}</p>
										<p className="text-base my-4 max-h-24 hidden sm:line-clamp-4">
											{overview}
										</p>
										<button className="items-center hidden sm:flex gap-1 text-lg px-4 py-2 font-semibold bg-blue-700 bg-opacity-40 rounded-lg hover:bg-opacity-60 focus:bg-opacity-60 focus:ring-4">
											<InfoIcon />
											More Info
										</button>
									</div>
								</li>
							);
						})}
					</ul>
				</Track>
			</div>
		</div>
	);
};
