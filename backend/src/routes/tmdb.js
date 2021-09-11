const createRouter = require('./router');
const controller = require('../controllers/tmdb');

module.exports = createRouter([['get', '/trending', controller.getTrending]]);
