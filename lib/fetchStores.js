// const latlong_Mitte = '52.523690381430995,13.388525240938048'
const url = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&radius=3000&limit=${limit}`;
};

export const fetchStores = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FSQ_KEY,
    },
  };

  const response = await fetch(
    url('52.523690381430995%2C13.388525240938048', 'Cafe', 12),
    options
  ).then((response) => response.json());
  // catch((err) => console.error(err));

  return response.results;
};
