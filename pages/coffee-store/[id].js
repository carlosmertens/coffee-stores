import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cls from 'classname';
import styles from '../../styles/coffee-store.module.css';
import coffeeStoresData from '../../data/coffee-stores.json';

// API key from Foursquare:
// fsq3/V+TbzGtjZjrQSY2LCFdtbMVFK/rzlc2q/TI6626Fzg=

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  // console.log('params:', params);
  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeStore) => {
        return coffeStore.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore(props) {
  const router = useRouter();
  const { name, address, neighbourhood, imgUrl } = props.coffeeStore;
  // console.log('props:', props);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpvoteButton = () => {
    console.log('Up vote clicked!!');
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backTohomeLink}>
            <Link href='/'>
              <a>⬅️ Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            alt={name}
            className={styles.storeImg}
          />
        </div>

        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/places.svg'
              width={24}
              height={24}
              alt='Address icon'
            />
            <p className={styles.text}>{address}</p>
          </div>

          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/nearMe.svg'
              width={24}
              height={24}
              alt='Neighbourhood icon'
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>

          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width={24}
              height={24}
              alt='Star icon'
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
