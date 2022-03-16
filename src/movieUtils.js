export const getMovieYear = (date) => {
  if (!date) return null;
  return new Date(date).getFullYear();
};
