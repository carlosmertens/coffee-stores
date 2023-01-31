import { getPhotosArray } from './getPhotosArray';
import { getStoresArray } from './getStoresArray';

const initLatLong = '52.523690381430995%2C13.388525240938048';

export const fetchStores = async (latLong = initLatLong) => {
  const query = 'coffee shop';
  const limit = 12;

  const photos = await getPhotosArray(query);

  const coffeeStores = await getStoresArray(latLong, query, limit);

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
