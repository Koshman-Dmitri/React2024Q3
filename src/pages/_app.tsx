import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import { wrapper } from '../lib/store';
import App from '../App';
import Spinner from '../components/Spinner/Spinner';
import '../index.css';

export function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <App>
          <Spinner />
          <Component {...pageProps} />
        </App>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
