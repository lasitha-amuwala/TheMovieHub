import { api } from './api';

export const getTrending = async () => {
	try {
		const response = await api.get('/tmdb/trending');
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getNowPlaying = async () => {
	try {
		const response = await api.get('/tmdb/nowPlaying');
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getPopular = async () => {
	try {
		const response = await api.get('/tmdb/popular');
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getTopRated = async () => {
	try {
		const response = await api.get('/tmdb/topRated');
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getUpcoming = async () => {
	try {
		const response = await api.get('/tmdb/upcoming');
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getMovie = async (id) => {
	try {
		const response = await api.get(`/tmdb/movie/${id}`);
		return response.data;
	} catch (e) {
		console.log(e);
	}
};
