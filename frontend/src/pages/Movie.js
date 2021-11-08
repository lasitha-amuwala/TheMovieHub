import React, { useEffect } from 'react';
import { getMovie } from '../api/tmdb';
import { useParams } from 'react-router';

export const Movie = () => {
	let { id, type } = useParams();

	useEffect(() => {
		getMovie(id).then((res) => {
			console.log(res);
		});
	}, [id]);

	return <div>{`Hello, ${id}, ${type}`}</div>;
};
