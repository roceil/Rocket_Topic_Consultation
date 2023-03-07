import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className="container  w-screen h-screen xl:container">


        <div className='flex h-full justify-center items-center'>
          <h1 className='text-6xl font-bold'>諮商平台的環境啦～～～</h1>
        </div>


      </main>
    </>
  )
}
