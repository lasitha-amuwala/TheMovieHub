import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { Movie } from './pages/Movie';

export const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/details/:type/:id" element={<Movie />} />
	</Routes>
);
