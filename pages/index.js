import { useContext, useEffect, useState } from 'react';
import styles from '../styles/home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import { Banner } from '../components/Banner';
import { Card } from '../components/Card';
import { fetchStores } from '../lib/fetchStores';
import { useTrackLocation } from '../hooks/use-track-location';
import { ACTION_TYPES, StoreContext } from './_app';
// import coffeeStoresData from '../data/coffee-stores.json';

export async function getStaticProps() {
  const coffeeStores = await fetchStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home({ coffeeStores }) {
  // const [storesNearby, setStoresNearby] = useState('');
  const [storesNearbyError, setStoresNearbyError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);

  const { storesNearby, latLong } = state;

  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  // console.log({ latLong, locationErrorMsg });

  useEffect(() => {
    const fetchedCoffeeStores = async () => {
      if (latLong) {
        try {
          const data = await fetchStores(latLong);
          dispatch({
            type: ACTION_TYPES.SET_STORES_NEARBY,
            payload: { storesNearby: data },
          });
        } catch (error) {
          setStoresNearbyError(error.message);
        }
      }
    };
    fetchedCoffeeStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latLong]);

  const handleOnClick = () => {
    handleTrackLocation();
  };

  return (
    <>
      <Head>
        <title>Coffee Stores</title>
        <meta
          name='description'
          content='Search for coffee stores in Berlin or your nearby location'
        />
      </Head>
      <section className={styles.sectionBanner}>
        <Banner
          buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
          handleOnClick={handleOnClick}
        />

        {locationErrorMsg && (
          <div>Something went wrong: {locationErrorMsg}</div>
        )}

        {storesNearbyError && (
          <div>Something went wrong: {storesNearbyError}</div>
        )}

        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            alt='coffee hero'
            width={700}
            height={400}
          />
        </div>

        {storesNearby.length > 0 ? (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Cafes nearby</h2>
            <div className={styles.cardLayout}>
              {storesNearby.map((store) => {
                return (
                  <Card
                    key={store.id}
                    href={`/coffee-store/${store.id}`}
                    name={store.name}
                    imgUrl={
                      store.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                  />
                );
              })}
            </div>
          </div>
        ) : null}

        {coffeeStores.length > 0 ? (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Berlin Mitte</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.id}
                    href={`/coffee-store/${store.id}`}
                    name={store.name}
                    imgUrl={
                      store.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
