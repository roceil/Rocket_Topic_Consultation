/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.css';
import '../styles/antd/style.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../common/redux/store';
import Header from '../common/components/Header';
import Footer from '../common/components/Footer';

// import('../common/msw').then(({ setupMocks }) => {
//   setupMocks();
// });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
