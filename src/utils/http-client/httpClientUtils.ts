export const createUrl = (endpoint: string, params?: any) => {
  let baseURL = 'https://api.themoviedb.org/3';
  const api_key = process.env.API_KEY;
  let query = new URLSearchParams({
    ...params,
    api_key,
  });
  return `${baseURL}${endpoint}?${query}`;
};
