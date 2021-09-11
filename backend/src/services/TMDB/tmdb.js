require('dotenv').config();
const axios = require('axios');

const baseURL = 'https://api.themoviedb.org/3/';

module.exports.getTrending = async () => {
  let res = await axios.get(
    `${baseURL}trending/movie/day?api_key=${process.env.TMDB_API_KEY}`
  );

  if (res.status === 200 && res.data) {
    return res.data;
  }
  return null;
};
