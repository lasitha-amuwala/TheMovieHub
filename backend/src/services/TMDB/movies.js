require('dotenv').config();
const axios = require('axios');

const baseURL = 'https://api.themoviedb.org/3';

module.exports.getTrending = async () => {
  let res = await axios.get(
    `${baseURL}/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`
  );

  if (res.status === 200 && res.data) {
    return res.data;
  }
  return null;
};

module.exports.getNowPlaying= async () => {
  let res = await axios.get(
    `${baseURL}/movie/now_playing?region=US&language=en-US&api_key=${process.env.TMDB_API_KEY}`
  );

  if (res.status === 200 && res.data) {
    return res.data;
  }
  return null;
}

module.exports.getPopular = async () => {
  let res = await axios.get(
    `${baseURL}/movie/popular?region=US&language=en-US&api_key=${process.env.TMDB_API_KEY}`
  );

  if (res.status === 200 && res.data) {
    return res.data;
  }
  return null;
}

module.exports.getTopRated= async () => {
  let res = await axios.get(
    `${baseURL}/movie/top_rated?region=US&language=en-US&api_key=${process.env.TMDB_API_KEY}`
  );

  if (res.status === 200 && res.data) {
    return res.data;
  }
  return null;
}

module.exports.getUpcoming= async () => {
  let res = await axios.get(
    `${baseURL}/movie/upcoming?region=US&language=en-US&api_key=${process.env.TMDB_API_KEY}`
  );

  if (res.status === 200 && res.data) {
    return res.data;
  }
  return null;
}