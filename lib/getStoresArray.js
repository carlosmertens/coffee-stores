export const getStoresArray = async (latLong, query, limit) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=3000&limit=${limit}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FSQ_KEY,
    },
  };

  const response = await fetch(url, options).then((response) =>
    response.json()
  );

  return response;
};
