import Head from 'next/head'
import Image from 'next/image'
import star from '../../public/images/star.svg'
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
  AudioOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Button, Input, ConfigProvider, Collapse } from 'antd'

// Header - input 元件(PC)
const { Search } = Input
const onSearch = (value: any) => console.log(value)
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff'
    }}
  />
)

// Footer - 折疊元件(Mobile)
const { Panel } = Collapse
const text = (
  <p style={{ paddingLeft: 24, color: '#9795B5', fontSize: '14px' }}>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
)

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
        <div className='h-[244px] w-[244px] rounded bg-secondary lg:h-[280px] lg:w-[280px]'></div>

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
  const panelStyle = {
    background: '#FFF',
    colorPrimary: '#9795B5',
    fontSize: '16px'
  }

  return (
    <>
      <Head>
        <title>11T 諮商平台建置中</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* navbar */}
      <header className='my-[18px] lg:my-0 lg:py-[30px] lg:shadow-md lg:shadow-gray-300'>
        <div className='container flex items-center justify-between'>
          <div className='text-2xl font-bold leading-normal text-[#5D5A88]'>
            Logo
          </div>
          <div className='flex h-6 w-6 items-center justify-center  lg:hidden xl:hidden'>
            <div className='h-[10px] w-[18px] border-y-2 border-y-[#5D5A88]'></div>
          </div>
          {/* PC 版導覽列 */}
          <ul className='flex hidden items-center space-x-5 lg:block'>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#D4D2E3',
                  borderRadius: 100,
                  colorBorder: '#D4D2E3'
                },
                components: {}
              }}
            >
              <Search
                placeholder='input search text'
                onSearch={onSearch}
                size='large'
                style={{ width: 180 }}
              />
              <Button
                type='default'
                shape='circle'
                size='large'
                icon={
                  <ShoppingCartOutlined
                    style={{ fontSize: '20px', color: '#8D8BA7' }}
                  />
                }
              />
              <Button
                type='default'
                shape='circle'
                size='large'
                icon={
                  <BellOutlined
                    style={{ fontSize: '20px', color: '#8D8BA7' }}
                  />
                }
              />
              <Button
                type='default'
                shape='circle'
                size='large'
                icon={
                  <UserOutlined
                    style={{ fontSize: '20px', color: '#8D8BA7' }}
                  />
                }
              />
            </ConfigProvider>
            <input
              type='button'
              value='尋找諮商師'
              className='rounded-[50px] bg-primary-heavy py-3
          px-6 text-[14px] font-bold text-white'
            />
          </ul>
        </div>
      </header>
      {/* Banner */}
      <main className='container lg:container lg:my-[128px] lg:flex lg:justify-between'>
        <section className='mt-10 flex flex-col items-center justify-center text-center lg:mt-0 lg:items-start'>
          <h1 className='text-5xl font-bold text-primary-heavy'>Slogan</h1>
          <p className='mt-5 text-[14px] text-primary lg:mt-[84px] lg:max-w-[612px] lg:text-left lg:text-lg'>
            Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
            phasellus mollis sit aliquam sit nullam.
          </p>
          <ul className='mt-10 space-x-6 lg:mt-[52px]'>
            <input
              type='button'
              value='尋找專屬諮商師'
              className='rounded-[50px] bg-primary-heavy py-5 px-9 text-base font-bold text-white'
            />
            <input
              type='button'
              value='立即註冊'
              className='rounded-[50px] border-2 border-primary-heavy bg-white py-5 px-9 text-base font-bold text-primary-heavy'
            />
          </ul>
        </section>
        <section className='flex lg:w-[608px] lg:justify-end'>
          <div className='mt-9 mb-[60px] h-[380px] w-[380px] rounded-[24px] bg-primary-light text-center lg:my-0 lg:h-[556px] lg:w-[556px]'>
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

            <ul className='mt-[34px] flex flex-wrap items-center justify-center gap-x-5 gap-y-10 lg:gap-x-8 lg:gap-y-12'>
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
            <p className='mt-2 mb-3 text-primary lg:mt-3 lg:mb-[76px] lg:max-w-[612px] lg:text-lg'>
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

        {/* 平台特色 */}
        <section>
          <div className='container py-20 text-center lg:flex lg:justify-center lg:space-x-[216px] lg:py-[157px]'>
            <div>
              {/* 這裡是圖片 */}
              <div className='hidden rounded bg-secondary lg:mb-11 lg:block lg:h-[108px] lg:w-[108px]'></div>
              <h2 className='lg:text-left'>平台特色</h2>
              <p className='subTitle mb-10 lg:max-w-[326px] lg:text-left'>
                Lorem ipsum dolor sit amet consectet adipiscing elit eget
                quamumto.
              </p>
            </div>

            <ul className='flex flex-wrap lg:w-[546px]'>
              <li className='flex w-1/2 flex-col items-center justify-center  border-b border-secondary p-6 text-primary-heavy'>
                <h3 className='mb-2 text-lg  font-bold lg:text-[28px]'>
                  客製化
                </h3>
                <p className='text-xs lg:text-lg'>Lorem ipsum dolor</p>
              </li>

              <li className='flex w-1/2 flex-col items-center justify-center  border-b border-l border-secondary p-6 text-primary-heavy'>
                <h3 className='mb-2 text-lg  font-bold lg:text-[28px]'>
                  全程保密
                </h3>
                <p className='text-xs lg:text-lg'>Lorem ipsum dolor</p>
              </li>

              <li className='flex w-1/2 flex-col items-center justify-center p-6 text-primary-heavy'>
                <h3 className='mb-2 text-lg  font-bold lg:text-[28px]'>
                  體驗課程
                </h3>
                <p className='text-xs lg:text-lg'>Lorem ipsum dolor</p>
              </li>

              <li className='flex w-1/2 flex-col items-center justify-center  border-l border-secondary p-6 text-primary-heavy'>
                <h3 className='mb-2 text-lg  font-bold lg:text-[28px]'>
                  專業心理師
                </h3>
                <p className='text-xs lg:text-lg'>Lorem ipsum dolor</p>
              </li>
            </ul>
          </div>
        </section>

        {/* 用戶好評 */}
        <section className=' bg-bg1'>
          <div className='py-20 text-center'>
            <div className='flex flex-col items-center'>
              <h2 className='mb-[49px] lg:mb-3'>用戶好評</h2>
              <p className='subTitle mb-[116px] hidden lg:block lg:font-normal'>
                Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat
                gravida malesuada quam commodo id integer nam.
              </p>
            </div>

            <div className='flex flex-col items-center'>
              {/* 第一條 */}
              <ul className='lg: min-w-screen flex flex-col items-center justify-center space-y-[37px] lg:flex-row lg:justify-start lg:space-y-0 lg:space-x-14 lg:px-8'>
                <li className='h-[172px] w-[380px] rounded-[400px] bg-white px-8 py-[27px] lg:w-[400px] lg:pr-14'>
                  <div className='flex items-center justify-center space-x-4'>
                    {/* 這是圖片 */}
                    <div className='h-[72px] w-[72px] rounded-full bg-secondary'></div>

                    {/* 用戶名稱及評價 */}
                    <div className=''>
                      <div className='flex items-center justify-between'>
                        <p className='text-xl font-bold text-primary-heavy'>
                          家洋
                        </p>
                        <div className='flex space-x-2'>
                          <Image
                            src={star}
                            width={20}
                            height={19}
                            alt='rate_star'
                          />
                          <p className='items-center justify-center font-bold text-primary'>
                            5.0
                          </p>
                        </div>
                      </div>

                      {/* 評價內容 */}
                      <p className='mt-2 max-w-[210px] text-left text-sm text-[#767494]'>
                        平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師
                      </p>
                    </div>
                  </div>
                </li>

                <li className='h-[172px] w-[380px] rounded-[400px] bg-white px-8 py-[27px] lg:w-[400px] lg:pr-14'>
                  <div className='flex items-center justify-center space-x-4'>
                    {/* 這是圖片 */}
                    <div className='h-[72px] w-[72px] rounded-full bg-secondary'></div>

                    {/* 用戶名稱及評價 */}
                    <div className=''>
                      <div className='flex items-center justify-between'>
                        <p className='text-xl font-bold text-primary-heavy'>
                          家洋
                        </p>
                        <div className='flex space-x-2'>
                          <Image
                            src={star}
                            width={20}
                            height={19}
                            alt='rate_star'
                          />
                          <p className='items-center justify-center font-bold text-primary'>
                            5.0
                          </p>
                        </div>
                      </div>

                      {/* 評價內容 */}
                      <p className='mt-2 max-w-[210px] text-left text-sm text-[#767494]'>
                        平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師
                      </p>
                    </div>
                  </div>
                </li>

                <li className='h-[172px] w-[380px] rounded-[400px] bg-white px-8 py-[27px] lg:w-[400px] lg:pr-14'>
                  <div className='flex items-center justify-center space-x-4'>
                    {/* 這是圖片 */}
                    <div className='h-[72px] w-[72px] rounded-full bg-secondary'></div>

                    {/* 用戶名稱及評價 */}
                    <div className=''>
                      <div className='flex items-center justify-between'>
                        <p className='text-xl font-bold text-primary-heavy'>
                          家洋
                        </p>
                        <div className='flex space-x-2'>
                          <Image
                            src={star}
                            width={20}
                            height={19}
                            alt='rate_star'
                          />
                          <p className='items-center justify-center font-bold text-primary'>
                            5.0
                          </p>
                        </div>
                      </div>

                      {/* 評價內容 */}
                      <p className='mt-2 max-w-[210px] text-left text-sm text-[#767494]'>
                        平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師
                      </p>
                    </div>
                  </div>
                </li>

                <li className='h-[172px] w-[380px] rounded-[400px] bg-white px-8 py-[27px] lg:hidden lg:w-[400px] lg:pr-14'>
                  <div className='flex items-center justify-center space-x-4'>
                    {/* 這是圖片 */}
                    <div className='h-[72px] w-[72px] rounded-full bg-secondary'></div>

                    {/* 用戶名稱及評價 */}
                    <div className=''>
                      <div className='flex items-center justify-between'>
                        <p className='text-xl font-bold text-primary-heavy'>
                          家洋
                        </p>
                        <div className='flex space-x-2'>
                          <Image
                            src={star}
                            width={20}
                            height={19}
                            alt='rate_star'
                          />
                          <p className='items-center justify-center font-bold text-primary'>
                            5.0
                          </p>
                        </div>
                      </div>

                      {/* 評價內容 */}
                      <p className='mt-2 max-w-[210px] text-left text-sm text-[#767494]'>
                        平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師
                      </p>
                    </div>
                  </div>
                </li>
              </ul>

              {/* 第二條 */}
              <ul className='lg: min-w-screen hidden flex-col items-center justify-center space-y-[37px] lg:mt-14 lg:flex lg:flex-row lg:justify-start lg:space-y-0 lg:space-x-14 lg:pl-[120px]'>
                <li className='h-[172px] w-[380px] rounded-[400px] bg-white px-8 py-[27px] lg:w-[400px] lg:pr-14'>
                  <div className='flex items-center justify-center space-x-4'>
                    {/* 這是圖片 */}
                    <div className='h-[72px] w-[72px] rounded-full bg-secondary'></div>

                    {/* 用戶名稱及評價 */}
                    <div className=''>
                      <div className='flex items-center justify-between'>
                        <p className='text-xl font-bold text-primary-heavy'>
                          家洋
                        </p>
                        <div className='flex space-x-2'>
                          <Image
                            src={star}
                            width={20}
                            height={19}
                            alt='rate_star'
                          />
                          <p className='items-center justify-center font-bold text-primary'>
                            5.0
                          </p>
                        </div>
                      </div>

                      {/* 評價內容 */}
                      <p className='mt-2 max-w-[210px] text-left text-sm text-[#767494]'>
                        平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師
                      </p>
                    </div>
                  </div>
                </li>

                <li className='h-[172px] w-[380px] rounded-[400px] bg-white px-8 py-[27px] lg:w-[400px] lg:pr-14'>
                  <div className='flex items-center justify-center space-x-4'>
                    {/* 這是圖片 */}
                    <div className='h-[72px] w-[72px] rounded-full bg-secondary'></div>

                    {/* 用戶名稱及評價 */}
                    <div className=''>
                      <div className='flex items-center justify-between'>
                        <p className='text-xl font-bold text-primary-heavy'>
                          家洋
                        </p>
                        <div className='flex space-x-2'>
                          <Image
                            src={star}
                            width={20}
                            height={19}
                            alt='rate_star'
                          />
                          <p className='items-center justify-center font-bold text-primary'>
                            5.0
                          </p>
                        </div>
                      </div>

                      {/* 評價內容 */}
                      <p className='mt-2 max-w-[210px] text-left text-sm text-[#767494]'>
                        平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師
                      </p>
                    </div>
                  </div>
                </li>

                <li className='h-[172px] w-[380px] rounded-[400px] bg-white px-8 py-[27px] lg:w-[400px] lg:pr-14'>
                  <div className='flex items-center justify-center space-x-4'>
                    {/* 這是圖片 */}
                    <div className='h-[72px] w-[72px] rounded-full bg-secondary'></div>

                    {/* 用戶名稱及評價 */}
                    <div className=''>
                      <div className='flex items-center justify-between'>
                        <p className='text-xl font-bold text-primary-heavy'>
                          家洋
                        </p>
                        <div className='flex space-x-2'>
                          <Image
                            src={star}
                            width={20}
                            height={19}
                            alt='rate_star'
                          />
                          <p className='items-center justify-center font-bold text-primary'>
                            5.0
                          </p>
                        </div>
                      </div>

                      {/* 評價內容 */}
                      <p className='mt-2 max-w-[210px] text-left text-sm text-[#767494]'>
                        平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 預約教學 */}
        <section className='bg-[#FAFAFF]'>
          <div className='container py-20 text-center lg:py-[180px]'>
            <div className='lg:flex lg:justify-between '>
              <div className=''>
                <h2 className='mb-9 lg:mt-[68px] lg:text-left'>預約教學</h2>
              </div>

              <ul className='flex flex-col items-center gap-y-8 lg:w-[704px] lg:flex-row lg:flex-wrap  lg:items-start lg:justify-between lg:gap-y-0'>
                <li className='flex w-[280px] flex-col items-center lg:-mb-11 lg:w-[328px]'>
                  {/* 這裡是圖片 */}
                  <div className='h-[360px] w-[280px] rounded bg-secondary lg:block lg:h-[415px] lg:w-full'></div>
                  <p className='mt-1 w-full text-left text-xl font-bold text-primary-heavy lg:mt-3'>
                    Step1
                  </p>
                </li>

                <li className='flex w-[280px] flex-col items-center lg:mt-[182px] lg:mb-11 lg:w-[328px]'>
                  {/* 這裡是圖片 */}
                  <div className='h-[360px] w-[280px] rounded bg-secondary lg:block lg:h-[415px] lg:w-full'></div>
                  <p className='mt-1 w-full text-left text-xl font-bold text-primary-heavy lg:mt-3'>
                    Step2
                  </p>
                </li>

                <li className='flex w-[280px] flex-col items-center lg:!mt-[-182px] lg:w-[328px]'>
                  {/* 這裡是圖片 */}
                  <div className='h-[360px] w-[280px] rounded bg-secondary lg:block lg:h-[415px] lg:w-full'></div>
                  <p className='mt-1 w-full text-left text-xl font-bold text-primary-heavy lg:mt-3'>
                    Step3
                  </p>
                </li>

                <li className='flex w-[280px] flex-col items-center lg:w-[328px] '>
                  {/* 這裡是圖片 */}
                  <div className='h-[360px] w-[280px] rounded bg-secondary lg:block lg:h-[415px] lg:w-full'></div>
                  <p className='mt-1 w-full text-left text-xl font-bold text-primary-heavy lg:mt-3'>
                    Step4
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className='lg:py-[72px] footer-shadow'>
        {/* PC Footer */}
        <div className='hidden lg:block'>
          <div className='container flex h-[217px] w-[1056px] justify-between p-0'>
            {/* Logo & copy right */}
            <section className='flex flex-col justify-between'>
              <h2 className='text-[24px]'>Logo</h2>
              <div>
                <p className='text-[14px] leading-normal text-[#9795B5]'>
                  Copyright © 2023 xxxxxxxxxxx
                </p>
                <p className='text-[14px] leading-normal text-[#9795B5]'>
                  All Rights Reserved
                </p>
              </div>
            </section>
            {/* Footers */}
            <div className='flex space-x-[120px]'>
              <section>
                <h3 className='mb-6 text-base font-bold text-primary-heavy'>
                  會員中心
                </h3>
                <ul className='space-y-4'>
                  <li className='text-[14px] text-[#9795B5]'>個人資料</li>
                  <li className='text-[14px] text-[#9795B5]'>預約記錄</li>
                  <li className='text-[14px] text-[#9795B5]'>加入會員</li>
                  <li className='text-[14px] text-[#9795B5]'>最新活動</li>
                </ul>
              </section>
              <section>
                <h3 className='mb-6 text-base font-bold text-primary-heavy'>
                  常見問題
                </h3>
                <ul className='space-y-4'>
                  <li className='text-[14px] text-[#9795B5]'>預約教學</li>
                  <li className='text-[14px] text-[#9795B5]'>註冊認證</li>
                  <li className='text-[14px] text-[#9795B5]'>付款相關</li>
                  <li className='text-[14px] text-[#9795B5]'>退課相關</li>
                  <li className='text-[14px] text-[#9795B5]'>條款與政策</li>
                </ul>
              </section>
              <section>
                <h3 className='mb-6 text-base font-bold text-primary-heavy'>
                  關於我們
                </h3>
                <ul className='space-y-4'>
                  <li className='text-[14px] text-[#9795B5]'>品牌故事</li>
                  <li className='text-[14px] text-[#9795B5]'>合作機構</li>
                </ul>
              </section>
              <section>
                <h3 className='mb-6 text-base font-bold text-primary-heavy'>
                  追蹤我們
                </h3>
                <ul className='space-y-4'>
                  <li className='text-[14px] text-[#9795B5]'>Facebook</li>
                  <li className='text-[14px] text-[#9795B5]'>Instagram</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
        {/* Mobile Footer */}
        <div className='container py-[72px] lg:hidden'>
          <div className='mb-12 px-7'>
            <ConfigProvider
              theme={{
                token: {
                  colorTextBase: '#5D5A88', // 變更標題色
                  colorBgBase: '#5D5A88' // 變更 border 顏色
                }
              }}
            >
              <Collapse
                bordered={false}
                expandIconPosition='end'>
                <Panel header='會員中心' key='1' style={panelStyle}>
                  {text}
                </Panel>
                <Panel header='常見問題' key='2' style={panelStyle}>
                  {text}
                </Panel>
                <Panel header='關於我們' key='3' style={panelStyle}>
                  {text}
                </Panel>
                <Panel header='追蹤我們' key='4' style={panelStyle}>
                  {text}
                </Panel>
              </Collapse>
            </ConfigProvider>
          </div>
          <div className='px-7'>
            <p className='text-[14px] leading-normal text-[#9795B5]'>
              Copyright © 2023 xxxxxxxxxxx
            </p>
            <p className='text-[14px] leading-normal text-[#9795B5]'>
              All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
