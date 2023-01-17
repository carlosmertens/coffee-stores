import styles from '../styles/home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import { Banner } from '../components/Banner';
import { Card } from '../components/Card';
import coffeeStores from '../data/coffee-stores.json';

export default function home() {
  const handleOnClick = () => {
    console.log('I have been clicked!');
  };

  return (
    <>
      <Head>
        <title>Coffee Store</title>
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
        <div className={styles.cardLayout}>
          {coffeeStores.map((store) => {
            return (
              <Card
                key={store.id}
                href={`/coffee-store/${store.id}`}
                name={store.name}
                imgUrl={store.imgUrl}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
