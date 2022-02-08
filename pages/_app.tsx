import '@fortawesome/fontawesome-free/css/all.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { AppStateProvider } from '../utils/appState';
import { CartStateProvider } from '../utils/cartState';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartStateProvider>
      <AppStateProvider initialData={pageProps.initialData}>
        <Component {...pageProps} />
      </AppStateProvider>
    </CartStateProvider>
  );
}

export default MyApp;
