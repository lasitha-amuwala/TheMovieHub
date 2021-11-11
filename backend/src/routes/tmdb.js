const createRouter = require('./router');
const controller = require('../controllers/tmdb');

module.exports = createRouter([
	['get', '/trending', controller.getTrending],
	['get', '/nowPlaying', controller.getNowPlaying],
	['get', '/popular', controller.getPopular],
	['get', '/topRated', controller.getTopRated],
	['get', '/upcoming', controller.getUpcoming],
	['get', '/movie/:id', controller.getMovieById],
]);
