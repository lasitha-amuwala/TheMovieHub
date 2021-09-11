const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const tmdbRoutes = require('./routes/tmdb');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use('/api/tmdb', tmdbRoutes);

module.exports = app;
