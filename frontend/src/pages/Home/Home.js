import React, { useState, useEffect } from 'react';
import {
	getTrending,
	getPopular,
	getTopRated,
	getUpcoming,
} from '../../api/tmdb';

import { Navbar } from '../../components/Navbar';
import { Carousel } from './Carousel/Carousel';
import { List } from '../../components/List';

export const Home = () => {
	const [trendingList, setTrendingList] = useState([]);
	const [popularList, setPopularList] = useState([]);
	const [topRatedList, setTopRatedList] = useState([]);
	const [upcomingList, setUpcomingList] = useState([]);

	useEffect(() => {
		const getData = async () => {
			await Promise.all([
				getTrending().then((res) => setTrendingList(res.data.results)),
				getPopular().then((res) => setPopularList(res.data.results)),
				getTopRated().then((res) => setTopRatedList(res.data.results)),
				getUpcoming().then((res) => setUpcomingList(res.data.results)),
			]);
		};
		getData();
	}, []);

	return (
		<div className="overflow-hidden min-h-screen relative pb-16 mt-16">
			<Navbar />
			<Carousel slides={trendingList} autoplay />
			<List data={popularList} title="Popular" />
			<List data={topRatedList} title="Top Rated" />
			<List data={upcomingList} title="Upcoming" />
			<div className="absolute bottom-0 w-full h-16 bg-black bg-opacity-30"></div>
		</div>
	);
};
