import React, { useState, useRef, useEffect } from 'react';

import { ReactComponent as ChevronRight } from '../icons/chevronRight.svg';
import { ReactComponent as ChevronLeft } from '../icons/chevronLeft.svg';
import { ReactComponent as InfoIcon } from '../icons/infoIcon.svg';
import { Skeleton, SkeletonElement } from './Skeleton';

const Track = ({ children, slideIndex, prevRef }) => {
	const ref = useRef(null);
	console.log(slideIndex, prevRef);
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

export const Featured = ({ slides }) => {
	const [slideIndex, setSlideIndex] = useState(0);
	const [windowWidth, setWindowWidth] = useState(0);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [length, setLength] = useState(0);

	const prevRef = useRef(null);

	const handleClick = (direction) =>
		direction
			? setSlideIndex((idx) => (idx <= 0 ? length : idx - 1))
			: setSlideIndex((idx) => (idx >= length ? 0 : idx + 1));

	const handleResize = () => {
		let timeoutId;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(setWindowWidth(window.innerWidth), 100);
	};

	useEffect(() => setLength(slides.length - 1), [slides]);

	useEffect(() => setSlideIndex(0), [windowWidth]);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		const interval = setInterval(
			() => setSlideIndex((idx) => (idx >= length ? 0 : idx + 1)),
			15000
		);
		return () => clearInterval(interval);
	}, [length]);

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
			<SliderButton onClick={() => handleClick(1)} classes="left-3">
				<ChevronLeft className="h-6 w-6 text-white hover:opacity-100" />
			</SliderButton>
			<SliderButton onClick={() => handleClick(0)} classes="right-3">
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

/*
  const filterImages = () => {
    let newSlideList = [];
    slides.map((slide) => {
      let img = new Image();
      img.src = `https://image.tmdb.org/t/p/original/${slide.backdrop_path}`;
      img.onload = () =>
        img.height > 1080 && img.width > 1920 && newSlideList.push(slide);
    });
    return newSlideList;
  }
  useEffect(async () => {
    let newSlideList = await filterImages()
    setSlideList(newSlideList);
  }, [slides]);
*/

/**
 * 		<div className="relative justify-center items-center">
			<SliderButton onClick={prevSlide} classes="left-3">
				<ChevronLeft className="h-6 w-6 text-white hover:opacity-100" />
			</SliderButton>
			<SliderButton onClick={nextSlide} classes="right-3">
				<ChevronRight className="h-6 w-6 text-white hover:opacity-100" />
			</SliderButton>
			<div>
				<ul className="flex h-full w-max overflow-hidden">
					{slides.map(({ title, backdrop_path, overview, id }) => {
						return (
							<li className="max-h-90vh overflow-hidden relative" key={id}>
								<div className="w-full h-16/9">
									<img
										className="w-full h-full"
										src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
										alt={`${title.split(' ').join('-')}-poster`}
									/>
								</div>
								<div className="absolute left-24 bottom-16 text-white w-1/3 bg-opacity-50 bg-bg p-6 rounded-xl backdrop-filter backdrop-blur">
									<p className="text-4xl font-semibold">{title}</p>
									<p className="text-base py-4 line-clamp-4">{overview}</p>
									<button className="items-center flex gap-1 text-lg px-4 py-2 font-semibold bg-blue-700 bg-opacity-40 rounded-lg hover:bg-opacity-60 focus:bg-opacity-60 focus:ring-4">
										<InfoIcon />
										More Info
									</button>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
 */

/**
		 * 		<div className="relative justify-center items-center">
			<SliderButton onClick={prevSlide} classes="left-3">
				<ChevronLeft className="h-6 w-6 text-white hover:opacity-100" />
			</SliderButton>
			<SliderButton onClick={nextSlide} classes="right-3">
				<ChevronRight className="h-6 w-6 text-white hover:opacity-100" />
			</SliderButton>
			<div ref={ref} className="w-full overflow-hidden relative">
				<ul className="flex relative list-none">
					{slides.map(({ title, backdrop_path, overview, id }, index) => {
						return (
							<li className="min-w-full max-h-90vh relative p-4" key={id}>
								<div className="w-full h-16/9">
									<img
										className="w-full h-full"
										src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
										alt={`${title.split(' ').join('-')}-poster`}
									/>
								</div>
								<div className="absolute left-24 bottom-16 text-white w-1/3 bg-opacity-50 bg-bg p-6 rounded-xl backdrop-filter backdrop-blur">
									<p className="text-4xl font-semibold">{title}</p>
									<p className="text-base py-4 line-clamp-4">{overview}</p>
									<button className="items-center flex gap-1 text-lg px-4 py-2 font-semibold bg-blue-700 bg-opacity-40 rounded-lg hover:bg-opacity-60 focus:bg-opacity-60 focus:ring-4">
										<InfoIcon />
										More Info
									</button>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
		 */
