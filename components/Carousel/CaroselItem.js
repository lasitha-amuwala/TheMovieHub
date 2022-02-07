import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { HiOutlineInformationCircle } from 'react-icons/hi';

export const CarouselItem = ({ slide }) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	const { title, backdrop_path, overview, id } = slide;

	const Skeleton = () => <div className='animate-pulse w-full h-16/9'></div>;

	const InfoCard = () => (
		<div className='absolute text-white left-0 lg:left-24 2xl:left-5% bottom-0 lg:bottom-28 2xl:bottom-56 w-full lg:w-1/2 2xl:w-1/3 bg-opacity-50 bg-almostBlack px-12 py-2 sm:px-7% md:px-5% lg:px-6 lg:py-5 rounded-none lg:rounded-xl backdrop-filter backdrop-blur-md'>
			<div className='flex items-center justify-between gap-4'>
				<p className='flex-grow font-medium sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl'>
					{title}
				</p>
				<Link href={`/details/${id}`} passHref>
					<div className='items-center hidden lg:flex flex-shrink-0 gap-2 text-base px-3 py-3 font-semibold bg-blue-700 bg-opacity-40 rounded-xl hover:bg-opacity-60 focus:bg-opacity-60 focus:ring-4'>
						<HiOutlineInformationCircle className='w-6 h-6' />
						More Info
					</div>
				</Link>
			</div>
			<p className='sm:text-sm md:text-base 2xl:text-lg 2xl:font-normal my-2 lg:my-3 xl:my-4 hidden md:line-clamp-2 lg:line-clamp-3 xl:line-clamp-4 2xl:line-clamp-5'>
				{overview}
			</p>
		</div>
	);

	return (
		<li className='min-w-full max-w-full max-h-85vh relative'>
			<div className='w-full h-56vw'>
				{!imageLoaded && Skeleton()}
				<Image
					layout='fill'
					className='w-full h-full object-cover object-top relative select-none block'
					src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
					alt={`${title.split(' ').join('-')}-poster`}
					onLoad={() => setImageLoaded(true)}
					priority
				/>
			</div>
			<InfoCard />
		</li>
	);
};

/**
 * 				<Link
					to={`/details/${id}`}
					className="items-center hidden lg:flex flex-shrink-0 gap-2 text-base px-3 py-3 font-semibold bg-blue-700 bg-opacity-40 rounded-xl hover:bg-opacity-60 focus:bg-opacity-60 focus:ring-4"
				>
					<InfoIcon />
					More Info
				</Link>
 */