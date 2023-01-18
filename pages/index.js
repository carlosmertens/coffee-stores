import styles from '../styles/home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import { Banner } from '../components/Banner';
import { Card } from '../components/Card';
import { fetchStores } from '../lib/fetchStores';
// import coffeeStoresData from '../data/coffee-stores.json';

export default function home({ coffeeStores }) {
  const handleOnClick = () => {
    console.log('I have been clicked!');
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
        <Banner buttonText='View stores nearby' handleOnClick={handleOnClick} />
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            alt='coffee hero'
            width={700}
            height={400}
          />
        </div>
        {coffeeStores.length > 0 ? (
          <>
            <h2 className={styles.heading2}>Berlin Mitte Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.fsq_id}
                    href={`/coffee-store/${store.fsq_id}`}
                    name={store.name}
                    imgUrl={
                      store.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </section>
    </>
  );
}

export async function getStaticProps() {
  const coffeeStores = await fetchStores();

  return {
    props: {
      coffeeStores,
    },
  };
}
