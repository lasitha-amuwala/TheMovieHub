export const getYearFromDate = date => {
  if (!date) return null;
  return new Date(date).getFullYear();
};

export const getLocaleDate = date => {
  if (!date) return null;
  return new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const minsToDuration = mins => {
  if (isNaN(mins)) return null;
  let min = mins % 60;
  let h = (mins - min) / 60;
  return `${h}h ${min}m`;
};
