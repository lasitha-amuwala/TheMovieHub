export const createUrl = (endpoint, params) => {
  let baseURL = 'https://api.themoviedb.org/3';
  const api_key = process.env.TMDB_API_KEY;
  let query = new URLSearchParams({
    ...params,
    api_key,
  });
  return `${baseURL}${endpoint}?${query}`;
};
