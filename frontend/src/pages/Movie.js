import React, { useEffect, useState } from 'react';
import { getMovie } from '../api/tmdb';
import { useParams } from 'react-router';
import { Navbar } from '../components/Navbar';

export const Movie = () => {
	const { id, type } = useParams();
	const [data, setData] = useState({});

	useEffect(() => getMovie(id).then((res) => setData(res)), [id]);

	return (
		<div>
			<img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} />
			{`HelloWorld, ${id}, ${data.title}`}
		</div>
	);
};
