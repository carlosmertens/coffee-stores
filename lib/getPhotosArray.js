import { createApi } from 'unsplash-js';

export const getPhotosArray = async (query) => {
  const unsplashAPI = createApi({
    accessKey: process.env.UNSPLASH_KEY,
  });

  const photos = await unsplashAPI.search.getPhotos({
    query,
    perPage: 30,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls['small']);
};
