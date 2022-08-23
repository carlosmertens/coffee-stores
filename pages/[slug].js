import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Hello() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.query.slug}</title>
      </Head>
      <h1>Welcome to {router.query.slug} Page!!!</h1>;
    </>
  );
}
