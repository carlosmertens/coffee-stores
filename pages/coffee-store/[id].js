import styles from '../../styles/coffee-store.module.css';
import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cls from 'classnames';
import { StoreContext } from '../_app';
import { fetchStores } from '../../lib/fetchStores';
import { isEmpty } from '../../utils';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchStores();
  const findCoffeeStoreById = coffeeStores.find((store) => {
    return store.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchStores();
  const paths = coffeeStores.map((store) => {
    return {
      params: { id: store.id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore(initProps) {
  const router = useRouter();
  const id = router.query.id;

  const {
    state: { storesNearby },
  } = useContext(StoreContext);

  const [coffeeStore, setCoffeeStore] = useState(initProps.coffeeStore);

  useEffect(() => {
    if (isEmpty(initProps.coffeeStore)) {
      if (storesNearby.length > 0) {
        const findCoffeeStoreById = storesNearby.find((store) => {
          return store.id.toString() === id;
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (router.isFallback) return <div>Loading...</div>;

  const { name, address, postcode, imgUrl } = coffeeStore;

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
            ← Back to home
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
          {address ? (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/places.svg'
                alt='Icon address'
                width={24}
                height={24}
              />
              <p className={styles.text}>{address}</p>
            </div>
          ) : (
            <div></div>
          )}

          {postcode ? (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/nearMe.svg'
                alt='Icon postcode'
                width={24}
                height={24}
                className={styles.icon}
              />
              <p className={styles.text}>Postcode {postcode}</p>
            </div>
          ) : (
            <div></div>
          )}

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
