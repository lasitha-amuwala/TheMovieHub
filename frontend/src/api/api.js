import axios from 'axios';

export const api = axios.create({
	baseURL:
		!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
			? 'http://localhost:5000/api/'
			: '/api/',
});
