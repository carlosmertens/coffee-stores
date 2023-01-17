import styles from '../styles/Card.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const Card = ({ href, name, imgUrl }) => {
  return (
    <Link href={href}>
      <div>
        <h1>{name}</h1>
        <Image src={imgUrl} alt='Coffe Shop image' width={260} height={160} />
      </div>
    </Link>
  );
};
