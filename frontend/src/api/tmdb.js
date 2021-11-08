import { api } from './api';

export const getTrending = async (req, res) => {
	try {
		const response = await api.get('/tmdb/trending');
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getNowPlaying = async (req, res) => {
	try {
		const response = await api.get('/tmdb/nowPlaying');
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getPopular = async (req, res) => {
	try {
		const response = await api.get('/tmdb/popular');
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getTopRated = async (req, res) => {
	try {
		const response = await api.get('/tmdb/topRated');
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getUpcoming = async (req, res) => {
	try {
		const response = await api.get('/tmdb/upcoming');
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getMovie = async (req, res) => {
	try {
		console.log(req)
		const response = await api.get(`/tmdb/movie/${req.params.id}`);
		return response;
	} catch (e) {
		console.log(e);
	}
};
