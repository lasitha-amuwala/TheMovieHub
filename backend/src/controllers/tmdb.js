const {getNowPlaying} = require('../services/TMDB/movies')

module.exports.getTrending = async (req, res) => {
  try {
    getNowPlaying().then((data) => {
      res.status(200).json(data);
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
