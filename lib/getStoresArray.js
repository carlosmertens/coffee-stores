export const getStoresArray = async (latlong, query, limit) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&radius=3000&limit=${limit}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FSQ_KEY,
    },
  };

  const response = await fetch(url, options).then((response) =>
    response.json()
  );

  return response;
};
