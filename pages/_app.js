import '@/styles/globals.css';
// import type { AppProps } from 'next/app';
import { Lato } from '@next/font/google';
import { createContext, useReducer } from 'react';

const lato = Lato({
  weight: ['400', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_STORES_NEARBY: 'SET_STORES_NEARBY',
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_STORES_NEARBY: {
      return { ...state, storesNearby: action.payload.storesNearby };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initState = {
    latLong: '',
    storesNearby: {},
  };

  const [state, dispatch] = useReducer(storeReducer, initState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
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
