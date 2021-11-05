import React, { forwardRef } from 'react';

export const ListItem = forwardRef(
	({ data }, ref) =>
		data.poster_path && (
			<li className="px-1 min-w-1/3 sm:min-w-1/4 md:min-w-1/5 lg:min-w-1/6 xl:min-w-1/7 2xl:min-w-1/8">
				<img
					ref={ref}
					className="h-auto cursor-pointer rounded-lg "
					src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
					alt={`${data.title.split(' ').join('-')}-poster`}
				/>
			</li>
		)
);
