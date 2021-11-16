require('dotenv').config();
const axios = require('axios');

const baseURL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;
const requests = {
	movieTrending: `${baseURL}/trending/movie/week?api_key=${API_KEY}`,
	movieNowPlaying: `${baseURL}/movie/now_playing?region=US&language=en-US&api_key=${API_KEY}`,
	moviePopular: `${baseURL}/movie/popular?region=US&language=en-US&api_key=${API_KEY}`,
	movieTopRated: `${baseURL}/movie/top_rated?region=US&language=en-US&api_key=${API_KEY}`,
	movieUpcoming: `${baseURL}/movie/upcoming?region=US&language=en-US&api_key=${API_KEY}`,
};

module.exports.getTrending = async (req, res) => {
	try {
		await axios.get(requests.movieTrending).then(({ data }) => {
			res.status(200).json(data);
		});
	} catch {
		res.status(500);
	}
};

module.exports.getNowPlaying = async (req, res) => {
	try {
		await axios.get(requests.movieNowPlaying).then(({ data }) => {
			res.status(200).json(data);
		});
	} catch {
		res.status(500);
	}
};

module.exports.getPopular = async (req, res) => {
	try {
		await axios.get(requests.moviePopular).then(({ data }) => {
			res.status(200).json(data);
		});
	} catch {
		res.status(500);
	}
};

module.exports.getTopRated = async (req, res) => {
	try {
		await axios.get(requests.movieTopRated).then(({ data }) => {
			res.status(200).json(data);
		});
	} catch {
		res.status(500);
	}
};

module.exports.getUpcoming = async (req, res) => {
	try {
		await axios.get(requests.movieUpcoming).then(({ data }) => {
			res.status(200).json(data);
		});
	} catch {
		res.status(500);
	}
};

module.exports.getMovieById = async (req, res) => {
	try {
		await axios
			.get(`${baseURL}/movie/${req.params.id}?api_key=${API_KEY}`)
			.then(({ data }) => {
				res.status(200).json(data);
			});
	} catch {
		res.status(500);
	}
};
