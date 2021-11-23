import React, { useEffect, useState } from 'react';
import { getMovie } from '../api/tmdb';
import { useParams } from 'react-router';

export const Movie = () => {
	const { id } = useParams();
	const [data, setData] = useState({});

	useEffect(() => getMovie(id).then((res) => setData(res)), [id]);

	if (!Object.keys(data).length) return <div></div>;

	const { backdrop_path, poster_path, title, release_date } = data;
	return (
		<div>
			<div
				className="w-screen bg-cover"
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
				}}
			>
				<div className="flex bg-black bg-opacity-90 h-30vh 2xl:px-25%">
					<div className="flex-none px-10 py-8">
						<img
							className="h-full rounded-xl"
							src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
						></img>
					</div>
					<div className="flex p-10 flex-1 gap-4">
						<p className=" text-white font-normal text-4xl">
							{`${title}`}
						</p>
						<p className="text-white font-light text-4xl"
						>{`(${release_date.split('-')[0]})`}</p>
					</div>
				</div>
			</div>
			<div className="h-screen"></div>
		</div>
	);
};
