import styles from '../styles/home.module.css';
import Head from 'next/head';
import { Banner } from '../components/Banner';

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
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section className={styles.section}>
        <Banner buttonText='View stores nearby' handleOnClick={handleOnClick} />
      </section>
    </>
  );
}
