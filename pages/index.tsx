import style from '../styles/Home.module.css';
import Head from 'next/head';

export default function Home() {
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
      <>
        <h1>Coffee Store Collection</h1>
        <p>Discover your local coffee stores!</p>
      </>
    </>
  );
}
