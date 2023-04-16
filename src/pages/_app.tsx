/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.css';
import '../styles/antd/style.css';
import '../styles/swiper/style.css';
import '../styles/waves/style.css';
import 'swiper/css';
import 'swiper/css/pagination';

import type { AppProps } from 'next/app';
import ChatRoom from '@/common/components/ChatRoom';
import Loading from '@/common/components/Loading';
import wrapper from '@/common/redux/store';
import Header from '@/common/components/Header';
import Footer from '@/common/components/Footer';

import('../common/msw').then(({ setupMocks }) => {
  setupMocks();
});

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <ChatRoom />
      <Loading />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default wrapper.withRedux(App);
