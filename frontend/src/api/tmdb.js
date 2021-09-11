import { api } from "./api";

export const getTrending = async (req, res) => {
  try {
    const response = await api.get('/tmdb/trending');
    return response;
  } catch (e) {
    console.log(e)
  }
}