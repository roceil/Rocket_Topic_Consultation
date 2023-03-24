/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.css';
import '../styles/antd/style.css';
import type { AppProps } from 'next/app';
import wrapper from '../common/redux/store';
import Header from '../common/components/Header';
import Footer from '../common/components/Footer';

import('../common/msw').then(({ setupMocks }) => {
  setupMocks();
});

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default wrapper.withRedux(App);

