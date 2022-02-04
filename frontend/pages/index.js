import React, { useState, useEffect } from 'react';
import {
	getTrending,
	getPopular,
	getTopRated,
	getUpcoming,
	getNowPlaying,
} from '../src/api/tmdb';

import { Carousel } from '../components/Carousel/Carousel';
import { List } from '../components/List';

const Home = () => {
	const [trendingList, setTrendingList] = useState([]);
	const [nowPlayingList, setNowPlayingList] = useState([]);
	const [popularList, setPopularList] = useState([]);
	const [topRatedList, setTopRatedList] = useState([]);
	const [upcomingList, setUpcomingList] = useState([]);
	const API_KEY = process.env.TMDB_API_KEY;

	useEffect(() => {
		const getData = async () => {
			const res = await fetch(
				`https://api.themoviedb.org/3/trending/movie/week?api_key=***REMOVED***`
			);
			const data = await res.json();
			setTrendingList(data.results);
		};
		getData();
	}, []);

	return (
		<div className='overflow-hidden min-h-screen relative'>
			<Carousel slides={trendingList} autoplay />
			<List data={trendingList} title='Trending' />
		</div>
	);
};

export default Home;
/**
 * 			<List data={popularList} title='Popular' />
			<List data={topRatedList} title='Top Rated' />
			<List data={nowPlayingList} title='Now Playing' />
			<List data={upcomingList} title='Upcoming' />
 */