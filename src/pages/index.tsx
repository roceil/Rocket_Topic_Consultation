import Head from 'next/head'
import Image from 'next/image'

import { ShoppingCartOutlined, BellOutlined, UserOutlined, AudioOutlined } from '@ant-design/icons'
import { Button, Input, ConfigProvider, Checkbox } from 'antd';
const { Search } = Input;
const onSearch = (value: any) => console.log(value);
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const fakeCounselorAry = [
  '#女性議題',
  '#親密關係',
  '#青少年',
  '#中老年議題',
  '#一般成人',
  '#PTSD'
]


function CounselorCard() {
  return (
    <div className='p-[36px]'>
      <div className='max-w-[244px] lg:max-w-[280px]'>
        {/* 這是圖片 */}
        <div className='h-[244px] w-[244px] rounded bg-secondary lg:w-[280px] lg:h-[280px]'></div>

        {/* 諮商師名稱 */}
        <div className='flex items-center justify-between px-2'>
          <span className='py-5 text-left text-xl font-bold text-primary-heavy lg:text-[28px]'>
            劉斯木
          </span>
          <div className='rounded border border-primary py-1 px-3 '>
            <p className='text-xs font-bold text-primary'>熱門諮商師 TOP1</p>
          </div>
        </div>

        {/* 諮商師tag */}
        <ul className='flex flex-wrap border-y-2 border-third py-2'>
          {fakeCounselorAry.map((data, index) => {
            return (
              <li
                key={index}
                className=' py-2 px-3 text-xs font-bold text-primary lg:text-sm'
              >
                <p>{data}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>11T 諮商平台建置中</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* navbar */}
      <header className='my-[18px] lg:my-0 lg:py-[30px] lg:shadow-gray-300 lg:shadow-md'>
        <div className="container flex justify-between items-center">
          <div className='text-2xl text-[#5D5A88] font-bold leading-normal'>Logo</div>
          <div className='flex h-6 w-6 items-center justify-center  lg:hidden xl:hidden'>
            <div className='h-[10px] w-[18px] border-y-2 border-y-[#5D5A88]'></div>
          </div>
          {/* PC 版導覽列 */}
          <ul className='flex space-x-5 items-center hidden lg:block'>
            < ConfigProvider
              theme = { {
                token :{
                  colorPrimary : '#D4D2E3' ,
                  borderRadius: 100,
                  colorBorder: '#D4D2E3',
                },
                components : { 
                } ,
              } }
            >
              <Search placeholder="input search text" onSearch={onSearch} size='large' 
              style={{width: 180}} />
              <Button type="default" shape="circle" size='large' icon={<ShoppingCartOutlined style={{ fontSize: '20px', color: '#8D8BA7' }}/>} />
              <Button type="default" shape="circle" size='large' icon={<BellOutlined style={{ fontSize: '20px', color: '#8D8BA7' }}/>} />
              <Button type="default" shape="circle" size='large' icon={<UserOutlined style={{ fontSize: '20px', color: '#8D8BA7' }}/>} />
            </ ConfigProvider >
            <input type="button" value="尋找諮商師" className='text-[14px] font-bold text-white
          bg-primary-heavy py-3 px-6 rounded-[50px]'/>
          </ul>
        </div>
      </header>
      {/* Banner */}
      <main className="container xl:container lg:flex lg:justify-between lg:my-[128px]">
        <section className='flex flex-col justify-center items-center mt-10 text-center lg:items-start lg:mt-0'>
          <h1 className='text-5xl font-bold text-primary-heavy'>Slogan</h1>
          <p className='mt-5 text-primary text-[14px] lg:max-w-[612px] lg:text-lg lg:mt-[84px] lg:text-left'>
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
              phasellus mollis sit aliquam sit nullam.
          </p>
          <ul className='space-x-6 mt-10 lg:mt-[52px]'>
            <input type="button" value="尋找專屬諮商師" className='text-base bg-primary-heavy text-white font-bold py-5 px-9 rounded-[50px]'/>
            <input type="button" value="立即註冊" className='text-base bg-white text-primary-heavy font-bold border-primary-heavy border-2 py-5 px-9 rounded-[50px]'/>
          </ul>
        </section>
        <section className='flex lg:w-[608px] lg:justify-end'>
          <div className='mt-9 bg-primary-light w-[380px] h-[380px] rounded-[24px] text-center mb-[60px] lg:w-[556px] lg:h-[556px] lg:my-0'>
            image
          </div>
        </section>
      </main>
      <main>
        {/* 客製化諮商主題 */}
        <section>
          <div className='container flex w-screen flex-col items-center  py-20 text-center lg:py-[100px]'>
            <h2>客製化諮商主題</h2>
            <p className='subTitle'>
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
              phasellus mollis sit aliquam sit nullam.
            </p>

            {/* 卡片 */}

            <ul className='mt-[34px] flex flex-wrap items-center justify-center gap-x-5 gap-y-10'>
              <li className='w-[180px] lg:w-[316px]'>
                {/* 這是圖片 */}
                <div className='h-[180px] w-[180px] rounded-t-2xl border border-b-0 border-secondary bg-secondary lg:h-[286px] lg:w-[316px]'></div>

                {/* 文字區塊 */}
                <div className='rounded-b-2xl border border-t-0 border-secondary pt-4 pb-7 lg:pt-5 lg:pb-8'>
                  <h3 className='mb-1 font-bold text-primary-heavy lg:text-xl'>
                    女性議題
                  </h3>
                  <p className='text-xs text-[#9795B5] lg:text-base'>
                    產後憂鬱、更年期
                  </p>
                </div>
              </li>

              <li className='w-[180px] lg:w-[316px]'>
                {/* 這是圖片 */}
                <div className='h-[180px] w-[180px] rounded-t-2xl border border-b-0 border-secondary bg-secondary lg:h-[286px] lg:w-[316px]'></div>

                {/* 文字區塊 */}
                <div className='rounded-b-2xl border border-t-0 border-secondary pt-4 pb-7 lg:pt-5 lg:pb-8'>
                  <h3 className='mb-1 font-bold text-primary-heavy lg:text-xl'>
                    女性議題
                  </h3>
                  <p className='text-xs text-[#9795B5] lg:text-base'>
                    產後憂鬱、更年期
                  </p>
                </div>
              </li>

              <li className='w-[180px] lg:w-[316px]'>
                {/* 這是圖片 */}
                <div className='h-[180px] w-[180px] rounded-t-2xl border border-b-0 border-secondary bg-secondary lg:h-[286px] lg:w-[316px]'></div>

                {/* 文字區塊 */}
                <div className='rounded-b-2xl border border-t-0 border-secondary pt-4 pb-7 lg:pt-5 lg:pb-8'>
                  <h3 className='mb-1 font-bold text-primary-heavy lg:text-xl'>
                    女性議題
                  </h3>
                  <p className='text-xs text-[#9795B5] lg:text-base'>
                    產後憂鬱、更年期
                  </p>
                </div>
              </li>

              <li className='w-[180px] lg:w-[316px]'>
                {/* 這是圖片 */}
                <div className='h-[180px] w-[180px] rounded-t-2xl border border-b-0 border-secondary bg-secondary lg:h-[286px] lg:w-[316px]'></div>

                {/* 文字區塊 */}
                <div className='rounded-b-2xl border border-t-0 border-secondary pt-4 pb-7 lg:pt-5 lg:pb-8'>
                  <h3 className='mb-1 font-bold text-primary-heavy lg:text-xl'>
                    女性議題
                  </h3>
                  <p className='text-xs text-[#9795B5] lg:text-base'>
                    產後憂鬱、更年期
                  </p>
                </div>
              </li>

              <li className='w-[180px] lg:w-[316px]'>
                {/* 這是圖片 */}
                <div className='h-[180px] w-[180px] rounded-t-2xl border border-b-0 border-secondary bg-secondary lg:h-[286px] lg:w-[316px]'></div>

                {/* 文字區塊 */}
                <div className='rounded-b-2xl border border-t-0 border-secondary pt-4 pb-7 lg:pt-5 lg:pb-8'>
                  <h3 className='mb-1 font-bold text-primary-heavy lg:text-xl'>
                    女性議題
                  </h3>
                  <p className='text-xs text-[#9795B5] lg:text-base'>
                    產後憂鬱、更年期
                  </p>
                </div>
              </li>

              <li className='w-[180px] lg:w-[316px]'>
                {/* 這是圖片 */}
                <div className='h-[180px] w-[180px] rounded-t-2xl border border-b-0 border-secondary bg-secondary lg:h-[286px] lg:w-[316px]'></div>

                {/* 文字區塊 */}
                <div className='rounded-b-2xl border border-t-0 border-secondary pt-4 pb-7 lg:pt-5 lg:pb-8'>
                  <h3 className='mb-1 font-bold text-primary-heavy lg:text-xl'>
                    女性議題
                  </h3>
                  <p className='text-xs text-[#9795B5] lg:text-base'>
                    產後憂鬱、更年期
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        {/* 推薦諮商師 */}
        <section className='bg-[#FAFAFF] '>
          <div className='container flex w-screen flex-col items-center  py-20 text-center'>
            <h2 className='font-bold text-primary-heavy '>推薦諮商師</h2>
            <p className='mt-2 mb-3 text-primary lg:mt-3 lg:max-w-[612px] lg:text-lg lg:mb-[76px]'>
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
              phasellus mollis sit aliquam sit nullam.
            </p>
            <div className='block lg:hidden'>
              <CounselorCard />
            </div>
            <ul className='hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-16'>
              {fakeCounselorAry.map((data, index) => {
                return <CounselorCard key={index} />
              })}
            </ul>
          </div>
        </section>


      </main>
    </>
  )
}


