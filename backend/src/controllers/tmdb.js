const {getTrending} = require('../services/TMDB/tmdb')

module.exports.getTrending = async (req, res) => {
  try {
    getTrending().then((data) => {
      res.status(200).json(data);
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
