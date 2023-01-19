import { createApi } from 'unsplash-js';

const unsplashAPI = createApi({
  accessKey: process.env.UNSPLASH_KEY,
});

const getPhotosArray = async () => {
  const photos = await unsplashAPI.search.getPhotos({
    query: 'coffee shop',
    perPage: 30,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls['small']);
};

// const latlong_Mitte = '52.523690381430995,13.388525240938048'
const url = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&radius=3000&limit=${limit}`;
};

export const fetchStores = async () => {
  const photos = await getPhotosArray();

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
  );
  const data = await response.json();

  return data.results.map((result, i) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      postcode: result.location.postcode,
      imgUrl: photos.length > 0 ? photos[i] : null,
    };
  });
};
