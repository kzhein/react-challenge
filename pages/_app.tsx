import '@fortawesome/fontawesome-free/css/all.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { AppStateProvider } from '../utils/appState';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider initialData={pageProps.initialData}>
      <Component {...pageProps} />
    </AppStateProvider>
  );
}

export default MyApp;
