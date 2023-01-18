import Head from 'next/head';
import Link from 'next/link';
import { stringify } from 'querystring';
import { useRouter } from 'next/router';
import coffeeStoresData from '../../data/coffee-stores.json';

export async function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoresData.find((store) => {
        return store.id.toString() === params.id; //dynamic id
      }),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '0' } },
      { params: { id: '1' } },
      { params: { id: '300' } },
    ],
    fallback: true,
  };
}

export default function CoffeeStore({ coffeeStore }) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>{coffeeStore.name}</title>
        <meta
          name='description'
          content={`${coffeeStore.name} is your favorite coffee shop ${coffeeStore.neighbourhood}`}
        />
      </Head>
      <h1>{coffeeStore.name}</h1>
      <p>{coffeeStore.neighbourhood}</p>
      <br />
      <Link href='/'>Back to home</Link>
    </>
  );
}
