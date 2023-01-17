import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CoffeeStore() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.query.id}</title>
        <meta
          name='description'
          content='My favorite coffee shop in the area'
        />
      </Head>
      <h1>{router.query.id}</h1>
      <p>ID: {router.query.id}</p>
      <p>My favorite place in Berlin</p>
      <Link href='/'>Back to home</Link>
    </>
  );
}
