import { getPhotosArray } from './getPhotosArray';
import { getStoresArray } from './getStoresArray';

export const fetchStores = async () => {
  const photosQuery = 'coffee shop';
  const latlong = '52.523690381430995%2C13.388525240938048';
  const stores = 'Cafe';
  const limit = 12;

  const photos = await getPhotosArray(photosQuery);

  const coffeeStores = await getStoresArray(latlong, stores, limit);

  return coffeeStores.results.map((store, i) => {
    return {
      id: store.fsq_id,
      name: store.name,
      address: store.location.address,
      postcode: store.location.postcode,
      imgUrl: photos.length > 0 ? photos[i] : null,
    };
  });
};
