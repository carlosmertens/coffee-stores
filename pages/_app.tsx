import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Lato } from '@next/font/google';

const lato = Lato({
  weight: ['400', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={lato.className}>
      <Component {...pageProps} />
    </main>
  );
}
