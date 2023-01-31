import '@/styles/globals.css';
// import type { AppProps } from 'next/app';
import { Lato } from '@next/font/google';
import { createContext } from 'react';

const lato = Lato({
  weight: ['400', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const initState = {
    latLong: '',
    coffeeStores: [],
  };
  return (
    <StoreContext.Provider value={{ state: initState }}>
      {children}
    </StoreContext.Provider>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <main className={lato.className}>
        <Component {...pageProps} />
      </main>
    </StoreProvider>
  );
}
