export const httpClient = {
  get: (url: string) => fetch(url).then(async res => await res.json()),
};
