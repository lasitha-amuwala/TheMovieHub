import React from 'react';
import Link from 'next/link';

export const Navbar = () => (
	<div className='h-16 fixed w-full top-0 bg z-50 bg-almostBlack bg-opacity-80 backdrop-filter backdrop-blur'>
		<div className='flex h-full items-center justify-between mx-7% md:mx-5%'>
			<div className='flex items-center text-white'>
				<Link href='/' className='w-full cursor-pointer' passHref>
					<h6 className='px-4 py-2 font-bold '>MovieHub</h6>
				</Link>
				<div className='flex pl-8 gap-4'>
					<button className='px-4 py-2 hover:text-gray-300 font-normal'>
						Movies
					</button>
					<button className='px-4 py-2 hover:text-gray-300 font-normal'>
						Series
					</button>
					<button className='px-4 py-2 hover:text-gray-300 font-normal'>
						Profile
					</button>
					<button className='px-4 py-2 hover:text-gray-300 font-normal'>
						My List
					</button>
				</div>
			</div>
			<button className='text-gray-700 px-4'></button>
		</div>
	</div>
);