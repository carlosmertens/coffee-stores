import styles from '../styles/Card.module.css';
import Image from 'next/image';
import Link from 'next/link';
import cls from 'classnames';

export const Card = ({ href, name, imgUrl }) => {
  return (
    <Link href={href} className={styles.cardLink}>
      <div className={cls('glass', styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            src={imgUrl}
            alt='Coffe Shop image'
            width={260}
            height={160}
            className={styles.cardImage}
          />
        </div>
      </div>
    </Link>
  );
};
