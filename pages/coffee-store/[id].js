import styles from '../../styles/coffee-store.module.css';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cls from 'classnames';
import { fetchStores } from '../../lib/fetchStores';
// import coffeeStoresData from '../../data/coffee-stores.json';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchStores();
  return {
    props: {
      coffeeStore: coffeeStores.find((store) => {
        return store.fsq_id.toString() === params.id; //dynamic id
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchStores();
  const paths = coffeeStores.map((store) => {
    return {
      params: { id: store.fsq_id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore(props) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;

  const { name, location, imgUrl } = props.coffeeStore;

  const handleUpvoteButton = () => {
    console.log('I have been upvoted!');
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
        <meta
          name='description'
          content={`${name} is your favorite coffee shop in Berlin`}
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <Link href='/' className={styles.backToHomeLink}>
            Back to home
          </Link>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>

          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            alt={`${name} image`}
            width={600}
            height={360}
            className={styles.storeImg}
          />
        </div>

        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/places.svg'
              alt='Icon location'
              width={24}
              height={24}
            />
            <p className={styles.text}>{location.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/nearMe.svg'
              alt='Icon location'
              width={24}
              height={24}
              className={styles.icon}
            />
            <p className={styles.text}>Postcode {location.postcode}</p>
          </div>

          <div className={styles.iconWrapper}>
            <Image
              src='/static/star.svg'
              alt='Icon rating'
              width={24}
              height={24}
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}
