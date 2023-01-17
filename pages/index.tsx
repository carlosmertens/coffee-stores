import styles from '../styles/home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import { Banner } from '../components/Banner';
import { Card } from '../components/Card';

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
      <section className={styles.section}>
        <Banner buttonText='View stores nearby' handleOnClick={handleOnClick} />
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            alt='coffee hero'
            width={700}
            height={400}
          />
        </div>
      </section>
      <div>
        <Card
          href='/coffee-store/berlin-cafe'
          name='Berlin Cafe'
          imgUrl='/static/hero-image.png'
        />
      </div>
    </>
  );
}
