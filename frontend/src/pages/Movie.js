import React from 'react';
import { useParams } from 'react-router';

export const Movie = () => {
	let { id, type } = useParams();
	return <div>{`Hello, ${id}, ${type}`}</div>;
};
