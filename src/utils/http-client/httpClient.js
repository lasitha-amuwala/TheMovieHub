export const httpClient = {
  get: (url) => fetch(url).then(async (res) => await res.json()),
};
