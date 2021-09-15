const {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
} = require('../services/TMDB/movies');

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

module.exports.getPopular = async (req, res) => {
  try {
    getPopular().then((data) => {
      res.status(200).json(data);
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

module.exports.getTopRated = async (req, res) => {
  try {
    getTopRated().then((data) => {
      res.status(200).json(data);
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

module.exports.getUpcoming = async (req, res) => {
  try {
    getUpcoming().then((data) => {
      res.status(200).json(data);
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
