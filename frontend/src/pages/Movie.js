import React, { useEffect, useState } from 'react';
import { getMovie } from '../api/tmdb';
import { useParams } from 'react-router';

export const Movie = () => {
	const { id } = useParams();
	const [data, setData] = useState({});

	useEffect(() => getMovie(id).then((res) => setData(res)), [id]);

	return (
		<div>
			<div
				className="w-screen bg-cover 2xl:h-50vh"
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
				}}
			>
				<div className="grid grid-cols-5 bg-black bg-opacity-90 2xl:px-72">
					<div className="w-full h-16:9 2xl:h-50vh col-span-2">
						<img
							className="h-full p-16"
							src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
						></img>
					</div>
					<div className="p-16 col-span-3">
						<p className="text-white font-bold sm:text-2xl md:text-3xl lg:text-5xl 2xl:text-6xl">
							{data.title}
						</p>
					</div>
				</div>
			</div>
			<div className="h-screen"></div>
		</div>
	);
};
