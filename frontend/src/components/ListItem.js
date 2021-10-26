import React, { forwardRef } from 'react';

export const ListItem = forwardRef(({ data }, ref) => (
	<li className='px-1 min-w-1/3 sm:min-w-1/4 md:min-w-1/5 lg:min-w-1/6 xl:min-w-1/7 2xl:min-w-1/8'>
		<img
			ref={ref}
			className="h-full cursor-pointer rounded-lg "
			src={
				data.poster_path &&
				`https://image.tmdb.org/t/p/w500/${data.poster_path}`
			}
			alt={`${data.title.split(' ').join('-')}-poster`}
		/>
	</li>
));

//transform hover:scale-125 hover:-translate-x-2/3 z-20 hover:z-30 transition-all duration-500 ease-in-out
/**
 * 
 * 		<img
			ref={ref}
			className="h-full w-c-1/3 sm:w-c-1/4 md:w-c-1/5 lg:w-c-1/6 xl:w-c-1/7 2xl:w-c-1/8 cursor-pointer rounded-lg"
			src={
				data.poster_path &&
				`https://image.tmdb.org/t/p/w500/${data.poster_path}`
			}
			alt={`${data.title.split(' ').join('-')}-poster`}
		/>
 */
