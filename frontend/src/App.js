import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import { Home } from './pages/Home/Home';
import { Movie } from './pages/Movie';

export const App = () => (
	<div>
		<Navbar />
		<div className="mt-16">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/details/:type/:id" element={<Movie />} />
			</Routes>
		</div>
	</div>
);
