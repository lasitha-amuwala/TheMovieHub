import React from 'react';
import { List } from '../components/List';
import { Carousel } from '../components/Carousel/Carousel';

const Home = (props) => (
	<div className='overflow-hidden min-h-screen relative'>
		<Carousel slides={props.trendingList.results} autoplay />
		<List data={props.popularList.results} title='Popular' />
		<List data={props.topRatedList.results} title='Top Rated' />
		<List data={props.nowPlayingList.results} title='Now Playing' />
		<List data={props.upcomingList.results} title='Upcoming' />
	</div>
);

export default Home;

export const getServerSideProps = async () => {
	const baseURL = 'https://api.themoviedb.org/3';
	const API_KEY = `api_key=${process.env.TMDB_API_KEY}`;
	
	const [trendingRes, nowPlayingRes, popularRes, topRatedRes, upcomingRes] =
		await Promise.all([
			fetch(`${baseURL}/trending/movie/week?${API_KEY}`),
			fetch(`${baseURL}/movie/now_playing?region=US&language=en-US&${API_KEY}`),
			fetch(`${baseURL}/movie/popular?region=US&language=en-US&${API_KEY}`),
			fetch(`${baseURL}/movie/top_rated?region=US&language=en-US&${API_KEY}`),
			fetch(`${baseURL}/movie/upcoming?region=US&language=en-US&${API_KEY}`),
		]);

	const [
		trendingList,
		nowPlayingList,
		popularList,
		topRatedList,
		upcomingList,
	] = await Promise.all([
		trendingRes.json(),
		nowPlayingRes.json(),
		popularRes.json(),
		topRatedRes.json(),
		upcomingRes.json(),
	]);

	return {
		props: {
			trendingList,
			nowPlayingList,
			popularList,
			topRatedList,
			upcomingList,
		},
	};
};