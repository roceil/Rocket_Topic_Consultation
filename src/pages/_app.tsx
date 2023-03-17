/* eslint-disable react/jsx-props-no-spreading */
import '@/styles/globals.css';
import '../styles/antd/style.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/feature/store';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
