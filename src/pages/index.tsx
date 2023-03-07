import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>11T 諮商平台建置中</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        {/* 推薦諮商師 */}
        <div className='container h-screen w-screen bg-[#FAFAFF] '></div>
      </main>
    </>
  )
}
