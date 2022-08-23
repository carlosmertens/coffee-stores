import { useRouter } from 'next/router';
import Link from 'next/link';

export default function CoffeeStore() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h2>Hello Coffee Store Page - Query(id): {router.query.id}</h2>
      <Link href='/'>
        <a>Back to home</a>
      </Link>
    </div>
  );
}
