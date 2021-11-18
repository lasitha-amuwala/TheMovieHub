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
				className="w-full  bg-contain "
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
				}}
			>
				<div className="grid grid-cols-2 h-full bg-black bg-opacity-80">
					<div className="h-full w-full">
						<img
							src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
						></img>
						hi
					</div>
					<div className="h-full w-full"></div>
				</div>
			</div>
			<div className="h-screen">hm</div>
		</div>
	);
};

//					src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
