import React, { useState, useRef, useEffect } from 'react';
import useInterval from '../../../hooks/useInterval';

import { ReactComponent as ChevronRight } from '../../../icons/chevronRight.svg';
import { ReactComponent as ChevronLeft } from '../../../icons/chevronLeft.svg';
import { ReactComponent as InfoIcon } from '../../../icons/infoIcon.svg';
import { Skeleton, SkeletonElement } from '../../../components/Skeleton';
import { Track } from './Track';

export const Featured = ({ slides, autoplay }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [windowWidth, setWindowWidth] = useState(0);
	const [slideIndex, setSlideIndex] = useState(0);
	const [delay, setDelay] = useState(10000);
	const [length, setLength] = useState(0);

	const prevRef = useRef(null);

	useEffect(() => setLength(slides.length - 1), [slides]);
	useEffect(() => setSlideIndex(0), [windowWidth]);

	useInterval(() => handleClick('right'), autoplay ? delay : null);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleClick = (direction) => {
		setDelay(delay + 1);
		direction === 'left'
			? setSlideIndex((idx) => (idx <= 0 ? length : idx - 1))
			: setSlideIndex((idx) => (idx >= length ? 0 : idx + 1));
	};

	const handleResize = () => {
		let timeoutId;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(setWindowWidth(window.innerWidth), 100);
	};

	// if the datails not an array return null
	if (!Array.isArray(slides) || slides.length <= 0) return null;

	const SliderButton = ({ children, classes, onClick }) => {
		const classNames = `absolute flex items-center p-4 ${classes} top-45% rounded-full bg-bg bg-opacity-50 hover:bg-opacity-80 z-10 cursor-pointer select-none backdrop-filter backdrop-blur`;
		return (
			<button className={classNames} onClick={onClick}>
				{children}
			</button>
		);
	};

	const Skeleton = () => <div className="animate-pulse w-full h-16/9"></div>;

	return (
		<div className="relative justify-center items-center">
			<SliderButton onClick={() => handleClick('left')} classes="left-3">
				<ChevronLeft className="h-6 w-6 text-white hover:opacity-100" />
			</SliderButton>
			<SliderButton onClick={() => handleClick('right')} classes="right-3">
				<ChevronRight className="h-6 w-6 text-white hover:opacity-100" />
			</SliderButton>
			<div className="w-full overflow-hidden relative">
				<Track slideIndex={slideIndex} prevRef={prevRef}>
					<ul className="flex relative list-none ">
						{slides.map(({ title, backdrop_path, overview, id }, index) => {
							return (
								<li
									className="min-w-full max-w-full max-h-90vh relative"
									key={index}
								>
									<div className="w-full h-16/9">
										{!imageLoaded && Skeleton()}
										<img
											className="w-full h-full relative select-none block"
											src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
											alt={`${title.split(' ').join('-')}-poster`}
											onLoad={() => setImageLoaded(true)}
										/>
									</div>
									<div className="absolute left-24 bottom-16 text-white w-1/3  bg-opacity-50 bg-bg p-6 rounded-xl backdrop-filter backdrop-blur">
										<p className="text-4xl font-semibold">{title}</p>
										<p className="text-base my-4 max-h-24 line-clamp-4">
											{overview}
										</p>
										<button className="items-center flex gap-1 text-lg px-4 py-2 font-semibold bg-blue-700 bg-opacity-40 rounded-lg hover:bg-opacity-60 focus:bg-opacity-60 focus:ring-4">
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
