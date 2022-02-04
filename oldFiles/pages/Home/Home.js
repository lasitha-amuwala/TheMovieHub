import React, { useState, useEffect } from 'react';
import {
	getTrending,
	getPopular,
	getTopRated,
	getUpcoming,
	getNowPlaying,
} from '../../api/tmdb';

import { Carousel } from './Carousel/Carousel';
import { Footer } from '../../components/Footer';
import { List } from '../../components/List';

export const Home = () => {
	const [trendingList, setTrendingList] = useState([]);
	const [nowPlayingList, setNowPlayingList] = useState([]);
	const [popularList, setPopularList] = useState([]);
	const [topRatedList, setTopRatedList] = useState([]);
	const [upcomingList, setUpcomingList] = useState([]);

	useEffect(() => {
		const getData = async () => {
			await Promise.all([
				getTrending().then((res) => setTrendingList(res.data.results)),
				getNowPlaying().then((res) => setNowPlayingList(res.data.results)),
				getPopular().then((res) => setPopularList(res.data.results)),
				getTopRated().then((res) => setTopRatedList(res.data.results)),
				getUpcoming().then((res) => setUpcomingList(res.data.results)),
			]);
		};
		getData();
	}, []);

	return (
		<div className="overflow-hidden min-h-screen relative pb-16">
			<Carousel slides={trendingList} autoplay />
			<List data={popularList} title="Popular" />
			<List data={topRatedList} title="Top Rated" />
			<List data={nowPlayingList} title="Now Playing" />
			<List data={upcomingList} title="Upcoming" />
			<Footer />
		</div>
	);
};