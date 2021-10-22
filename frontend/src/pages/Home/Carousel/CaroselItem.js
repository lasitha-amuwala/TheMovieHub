import React, { useState } from 'react';
import { ReactComponent as InfoIcon } from '../../../icons/infoIcon.svg';
import { Skeleton, SkeletonElement } from '../../../components/Skeleton';

export const CarouselItem = ({ slide }) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	const { title, backdrop_path, overview, id } = slide;

	const Skeleton = () => <div className="animate-pulse w-full h-16/9"></div>;

	return (
		<li className="min-w-full max-w-full max-h-90vh relative" key={id}>
			<div className="w-full h-50vw">
				{!imageLoaded && Skeleton()}
				<img
					className="w-full h-full object-cover relative select-none block"
					src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
					alt={`${title.split(' ').join('-')}-poster`}
					onLoad={() => setImageLoaded(true)}
				/>
			</div>
			<div className="absolute text-white left-0 lg:left-24 bottom-0 lg:bottom-16 2xl:bottom-24 w-full lg:w-1/2 2xl:w-1/3 bg-opacity-40 bg-bg px-12 py-3 sm:px-7 lg:px-6 lg:py-4 rounded-none lg:rounded-xl backdrop-filter backdrop-blur-lg">
				<div className="flex justify-between gap-4 items-start">
					<p className="text-sm flex-grow sm:text-xl md:text-xl lg:text-3xl xl:text-4xl sm:font-semibold">
						{title}
					</p>
					<button className="items-center hidden lg:flex flex-shrink-0 gap-2 text-base px-3 py-3 font-semibold bg-blue-700 bg-opacity-40 rounded-xl hover:bg-opacity-60 focus:bg-opacity-60 focus:ring-4">
						<InfoIcon />
						More Info
					</button>
				</div>
				<p className="sm:text-sm md:text-base my-2 lg:my-3 xl:my-4 hidden md:line-clamp-2 lg:line-clamp-3 xl:line-clamp-4 2xl:line-clamp-5">
					{overview}
				</p>
			</div>
		</li>
	);
};
