import React, { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const ListItem = forwardRef(({ data }, ref) => {
	let id = data.id || data.tv_id;
	return (
		data.poster_path && (
			<li className='relative px-1 min-w-1/3 sm:min-w-1/4 md:min-w-1/5 lg:min-w-1/6 xl:min-w-1/7 2xl:min-w-1/8 transform hover:scale-110 transition ease-in-out z-0 hover:z-20'>
				<Link href={`/details/${id}`}>
					<img
						ref={ref}
						layout='fill'
						className='h-auto cursor-pointer rounded-lg'
						src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
						alt={`${data.title.split(' ').join('-')}-poster`}
					/>
				</Link>
			</li>
		)
	);
});
