import '@/styles/globals.css'
import '../styles/antd/style.css'
import type { AppProps } from 'next/app'
import { Header } from '@/layout/Header'
import { Footer } from '@/layout/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
