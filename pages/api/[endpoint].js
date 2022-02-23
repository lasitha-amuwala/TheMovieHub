export default function handler(req, res) {
  const { endpoint, ...queryStrings } = req.query;
  const query = new URLSearchParams(queryStrings);

  try {
    const apiResponse = await httpClient.get(`${endpoint}?${query}`);
    return res.json(apiResponse);
  } catch (error) {}
  res.end(`Post: ${query}`);
}
