import Link from 'next/link'
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
  AudioOutlined,
  BorderBottomOutlined
} from '@ant-design/icons'
import {
  Button,
  Input,
  ConfigProvider,
  Breadcrumb,
  Space,
  Select,
  Pagination,
  type SelectProps
} from 'antd'

const { Search } = Input
const onSearch = (value: any) => console.log(value)
const options: SelectProps['options'] = [
  {
    label: '親密關係',
    value: '親密關係'
  },
  {
    label: '青少年',
    value: '青少年'
  },
  {
    label: '女性議題',
    value: '女性議題'
  },
  {
    label: '中老年議題',
    value: '中老年議題'
  },
  {
    label: 'PTSD',
    value: 'PTSD'
  },
  {
    label: '一般成人',
    value: '一般成人'
  }
]

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`)
}

const handleChange1 = (value: string) => {
  console.log(`selected ${value}`)
}
export default function CounselorList() {
  return (
    <>
      {/* navbar  => 要拔掉*/}
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

      {/* 分頁標題 */}
      <section className='my-14 lg:mt-[84px] '>
        <div className='container'>
          {/* 麵包屑 */}
          <Breadcrumb
            items={[
              {
                title: <Link href='/'>Home</Link>
              },
              {
                title: <span className='text-primary-heavy'>諮商師總覽</span>
              }
            ]}
          />

          {/* 分頁標題 */}
          <h1 className='titleDecoration relative mt-3 pl-[30px] text-primary-heavy lg:mt-6 lg:mb-24'>
            諮商師總覽
          </h1>
        </div>
      </section>

      {/* 諮商師篩選 */}
      <section className='container'>
        <div className=' border-y border-secondary py-7 lg:border-y-2 lg:border-[#767494] lg:py-12'>
          <p className='mb-1 text-sm text-primary-heavy lg:mb-2'>
            選擇諮商主題
          </p>
          <div className='selectTopic mb-6 rounded-[24px] border-[1.5px] border-primary-heavy bg-primary-heavy lg:hidden'>
            <Select
              mode='multiple'
              allowClear
              style={{ width: '100%' }}
              defaultValue={['一般成人', 'Kris超人']}
              onChange={handleChange}
              options={options}
            />
          </div>
          <div className='hidden space-x-4 lg:mb-7 lg:flex'>
            <button className=' rounded-3xl border border-primary-heavy text-xs text-primary-heavy hover:opacity-50 focus:bg-[#EEECFA] focus:text-primary-heavy lg:w-[146px] lg:py-3 lg:text-base lg:font-bold'>
              # 親密關係
            </button>

            <button className=' rounded-3xl border border-primary-heavy text-xs text-primary-heavy hover:opacity-50 focus:bg-[#EEECFA] focus:text-primary-heavy lg:w-[146px] lg:py-3 lg:text-base lg:font-bold'>
              # 青少年
            </button>

            <button className=' rounded-3xl border border-primary-heavy text-xs text-primary-heavy hover:opacity-50 focus:bg-[#EEECFA] focus:text-primary-heavy lg:w-[146px] lg:py-3 lg:text-base lg:font-bold'>
              # 女性議題
            </button>

            <button className=' rounded-3xl border border-primary-heavy text-xs text-primary-heavy hover:opacity-50 focus:bg-[#EEECFA] focus:text-primary-heavy lg:w-[146px] lg:py-3 lg:text-base lg:font-bold'>
              # 中老年議題
            </button>

            <button className=' rounded-3xl border border-primary-heavy text-xs text-primary-heavy hover:opacity-50 focus:bg-[#EEECFA] focus:text-primary-heavy lg:w-[146px] lg:py-3 lg:text-base lg:font-bold'>
              # PTSD
            </button>

            <button className=' rounded-3xl border border-primary-heavy text-xs text-primary-heavy hover:opacity-50 focus:bg-[#EEECFA] focus:text-primary-heavy lg:w-[146px] lg:py-3 lg:text-base lg:font-bold'>
              # 一般成人
            </button>
          </div>
          {/* 搜尋欄及篩選 */}
          <div className='search flex justify-between'>
            <ConfigProvider
              theme={{
                token: {
                  // colorPrimary: '#767494',
                  colorTextBase: '#767494', // => 文字顏色
                  // controlItemBgActive:"red" => 下拉選單背景色
                  controlOutline: 'none' // => 膠囊focus
                }
              }}
            >
              <Search
                placeholder='input search text'
                onSearch={onSearch}
                size='large'
                style={{
                  width: 180
                }}
              />

              <Select
                defaultValue='依熱門程度搜尋'
                style={{ width: 178 }}
                options={[{ value: '依熱門程度搜尋', label: '依熱門程度搜尋' }]}
              />
            </ConfigProvider>
          </div>
        </div>
      </section>

      {/* 諮商師列表 */}
      <section className='mt-20 lg:mt-[168px]'>
        <div className='container'>
          {/* 清單區塊 */}
          <ul className='mb-12 flex flex-col space-y-9 lg:mb-16 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-[104px] lg:gap-y-[68px] lg:space-y-0'>
            <li className='flex rounded-3xl border border-secondary '>
              {/* 這是圖片 */}
              <div className='h-[238px] w-[158px] rounded-l-[20px] bg-secondary lg:h-[327px] lg:w-[220px]'></div>

              {/* 這是文字區塊 */}
              <div className='w-[222px] py-6 pl-4 pr-[18px] lg:w-[268px] lg:py-12 lg:px-6'>
                <h3 className='mb-1 text-xl font-bold text-primary-heavy lg:text-2xl'>
                  筱清
                </h3>
                <p className='mb-3 text-sm font-bold text-[#767494] lg:mb-6 lg:text-base'>
                  10年諮商經驗
                </p>
                <p className='mb-6 text-sm text-[#767494] lg:mb-8 lg:text-base'>
                  Lorem ipsum dolor sit amet consecte adipiscing elit amet
                  hendrerit pretium nu.
                </p>

                <div className='flex space-x-3'>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy py-2 text-xs font-semibold text-primary-heavy lg:text-sm'>
                    我有問題
                  </button>
                  <Link href={'CounselorPage'}>
                    <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy bg-primary-heavy py-2 text-xs font-semibold text-white lg:text-sm'>
                      立即預約
                    </button>
                  </Link>
                </div>
              </div>
            </li>

            <li className='flex rounded-3xl border border-secondary '>
              {/* 這是圖片 */}
              <div className='h-[238px] w-[158px] rounded-l-[20px] bg-secondary lg:h-[327px] lg:w-[220px]'></div>

              {/* 這是文字區塊 */}
              <div className='w-[222px] py-6 pl-4 pr-[18px] lg:w-[268px] lg:py-12 lg:px-6'>
                <h3 className='mb-1 text-xl font-bold text-primary-heavy lg:text-2xl'>
                  筱清
                </h3>
                <p className='mb-3 text-sm font-bold text-[#767494] lg:mb-6 lg:text-base'>
                  10年諮商經驗
                </p>
                <p className='mb-6 text-sm text-[#767494] lg:mb-8 lg:text-base'>
                  Lorem ipsum dolor sit amet consecte adipiscing elit amet
                  hendrerit pretium nu.
                </p>

                <div className='flex space-x-3'>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy py-2 text-xs font-semibold text-primary-heavy lg:text-sm'>
                    我有問題
                  </button>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy bg-primary-heavy py-2 text-xs font-semibold text-white lg:text-sm'>
                    立即預約
                  </button>
                </div>
              </div>
            </li>

            <li className='flex rounded-3xl border border-secondary '>
              {/* 這是圖片 */}
              <div className='h-[238px] w-[158px] rounded-l-[20px] bg-secondary lg:h-[327px] lg:w-[220px]'></div>

              {/* 這是文字區塊 */}
              <div className='w-[222px] py-6 pl-4 pr-[18px] lg:w-[268px] lg:py-12 lg:px-6'>
                <h3 className='mb-1 text-xl font-bold text-primary-heavy lg:text-2xl'>
                  筱清
                </h3>
                <p className='mb-3 text-sm font-bold text-[#767494] lg:mb-6 lg:text-base'>
                  10年諮商經驗
                </p>
                <p className='mb-6 text-sm text-[#767494] lg:mb-8 lg:text-base'>
                  Lorem ipsum dolor sit amet consecte adipiscing elit amet
                  hendrerit pretium nu.
                </p>

                <div className='flex space-x-3'>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy py-2 text-xs font-semibold text-primary-heavy lg:text-sm'>
                    我有問題
                  </button>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy bg-primary-heavy py-2 text-xs font-semibold text-white lg:text-sm'>
                    立即預約
                  </button>
                </div>
              </div>
            </li>

            <li className='flex rounded-3xl border border-secondary '>
              {/* 這是圖片 */}
              <div className='h-[238px] w-[158px] rounded-l-[20px] bg-secondary lg:h-[327px] lg:w-[220px]'></div>

              {/* 這是文字區塊 */}
              <div className='w-[222px] py-6 pl-4 pr-[18px] lg:w-[268px] lg:py-12 lg:px-6'>
                <h3 className='mb-1 text-xl font-bold text-primary-heavy lg:text-2xl'>
                  筱清
                </h3>
                <p className='mb-3 text-sm font-bold text-[#767494] lg:mb-6 lg:text-base'>
                  10年諮商經驗
                </p>
                <p className='mb-6 text-sm text-[#767494] lg:mb-8 lg:text-base'>
                  Lorem ipsum dolor sit amet consecte adipiscing elit amet
                  hendrerit pretium nu.
                </p>

                <div className='flex space-x-3'>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy py-2 text-xs font-semibold text-primary-heavy lg:text-sm'>
                    我有問題
                  </button>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy bg-primary-heavy py-2 text-xs font-semibold text-white lg:text-sm'>
                    立即預約
                  </button>
                </div>
              </div>
            </li>

            <li className='flex rounded-3xl border border-secondary '>
              {/* 這是圖片 */}
              <div className='h-[238px] w-[158px] rounded-l-[20px] bg-secondary lg:h-[327px] lg:w-[220px]'></div>

              {/* 這是文字區塊 */}
              <div className='w-[222px] py-6 pl-4 pr-[18px] lg:w-[268px] lg:py-12 lg:px-6'>
                <h3 className='mb-1 text-xl font-bold text-primary-heavy lg:text-2xl'>
                  筱清
                </h3>
                <p className='mb-3 text-sm font-bold text-[#767494] lg:mb-6 lg:text-base'>
                  10年諮商經驗
                </p>
                <p className='mb-6 text-sm text-[#767494] lg:mb-8 lg:text-base'>
                  Lorem ipsum dolor sit amet consecte adipiscing elit amet
                  hendrerit pretium nu.
                </p>

                <div className='flex space-x-3'>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy py-2 text-xs font-semibold text-primary-heavy lg:text-sm'>
                    我有問題
                  </button>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy bg-primary-heavy py-2 text-xs font-semibold text-white lg:text-sm'>
                    立即預約
                  </button>
                </div>
              </div>
            </li>

            {/* 從這開始電腦版會顯示 */}
            <li className='hidden rounded-3xl border border-secondary lg:flex'>
              {/* 這是圖片 */}
              <div className='h-[238px] w-[158px] rounded-l-[20px] bg-secondary lg:h-[327px] lg:w-[220px]'></div>

              {/* 這是文字區塊 */}
              <div className='w-[222px] py-6 pl-4 pr-[18px] lg:w-[268px] lg:py-12 lg:px-6'>
                <h3 className='mb-1 text-xl font-bold text-primary-heavy lg:text-2xl'>
                  筱清
                </h3>
                <p className='mb-3 text-sm font-bold text-[#767494] lg:mb-6 lg:text-base'>
                  10年諮商經驗
                </p>
                <p className='mb-6 text-sm text-[#767494] lg:mb-8 lg:text-base'>
                  Lorem ipsum dolor sit amet consecte adipiscing elit amet
                  hendrerit pretium nu.
                </p>

                <div className='flex space-x-3'>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy py-2 text-xs font-semibold text-primary-heavy lg:text-sm'>
                    我有問題
                  </button>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy bg-primary-heavy py-2 text-xs font-semibold text-white lg:text-sm'>
                    立即預約
                  </button>
                </div>
              </div>
            </li>

            <li className='hidden rounded-3xl border border-secondary lg:flex'>
              {/* 這是圖片 */}
              <div className='h-[238px] w-[158px] rounded-l-[20px] bg-secondary lg:h-[327px] lg:w-[220px]'></div>

              {/* 這是文字區塊 */}
              <div className='w-[222px] py-6 pl-4 pr-[18px] lg:w-[268px] lg:py-12 lg:px-6'>
                <h3 className='mb-1 text-xl font-bold text-primary-heavy lg:text-2xl'>
                  筱清
                </h3>
                <p className='mb-3 text-sm font-bold text-[#767494] lg:mb-6 lg:text-base'>
                  10年諮商經驗
                </p>
                <p className='mb-6 text-sm text-[#767494] lg:mb-8 lg:text-base'>
                  Lorem ipsum dolor sit amet consecte adipiscing elit amet
                  hendrerit pretium nu.
                </p>

                <div className='flex space-x-3'>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy py-2 text-xs font-semibold text-primary-heavy lg:text-sm'>
                    我有問題
                  </button>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy bg-primary-heavy py-2 text-xs font-semibold text-white lg:text-sm'>
                    立即預約
                  </button>
                </div>
              </div>
            </li>

            <li className='hidden rounded-3xl border border-secondary lg:flex'>
              {/* 這是圖片 */}
              <div className='h-[238px] w-[158px] rounded-l-[20px] bg-secondary lg:h-[327px] lg:w-[220px]'></div>

              {/* 這是文字區塊 */}
              <div className='w-[222px] py-6 pl-4 pr-[18px] lg:w-[268px] lg:py-12 lg:px-6'>
                <h3 className='mb-1 text-xl font-bold text-primary-heavy lg:text-2xl'>
                  筱清
                </h3>
                <p className='mb-3 text-sm font-bold text-[#767494] lg:mb-6 lg:text-base'>
                  10年諮商經驗
                </p>
                <p className='mb-6 text-sm text-[#767494] lg:mb-8 lg:text-base'>
                  Lorem ipsum dolor sit amet consecte adipiscing elit amet
                  hendrerit pretium nu.
                </p>

                <div className='flex space-x-3'>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy py-2 text-xs font-semibold text-primary-heavy lg:text-sm'>
                    我有問題
                  </button>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy bg-primary-heavy py-2 text-xs font-semibold text-white lg:text-sm'>
                    立即預約
                  </button>
                </div>
              </div>
            </li>

            <li className='hidden rounded-3xl border border-secondary lg:flex'>
              {/* 這是圖片 */}
              <div className='h-[238px] w-[158px] rounded-l-[20px] bg-secondary lg:h-[327px] lg:w-[220px]'></div>

              {/* 這是文字區塊 */}
              <div className='w-[222px] py-6 pl-4 pr-[18px] lg:w-[268px] lg:py-12 lg:px-6'>
                <h3 className='mb-1 text-xl font-bold text-primary-heavy lg:text-2xl'>
                  筱清
                </h3>
                <p className='mb-3 text-sm font-bold text-[#767494] lg:mb-6 lg:text-base'>
                  10年諮商經驗
                </p>
                <p className='mb-6 text-sm text-[#767494] lg:mb-8 lg:text-base'>
                  Lorem ipsum dolor sit amet consecte adipiscing elit amet
                  hendrerit pretium nu.
                </p>

                <div className='flex space-x-3'>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy py-2 text-xs font-semibold text-primary-heavy lg:text-sm'>
                    我有問題
                  </button>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy bg-primary-heavy py-2 text-xs font-semibold text-white lg:text-sm'>
                    立即預約
                  </button>
                </div>
              </div>
            </li>

            <li className='hidden rounded-3xl border border-secondary lg:flex'>
              {/* 這是圖片 */}
              <div className='h-[238px] w-[158px] rounded-l-[20px] bg-secondary lg:h-[327px] lg:w-[220px]'></div>

              {/* 這是文字區塊 */}
              <div className='w-[222px] py-6 pl-4 pr-[18px] lg:w-[268px] lg:py-12 lg:px-6'>
                <h3 className='mb-1 text-xl font-bold text-primary-heavy lg:text-2xl'>
                  筱清
                </h3>
                <p className='mb-3 text-sm font-bold text-[#767494] lg:mb-6 lg:text-base'>
                  10年諮商經驗
                </p>
                <p className='mb-6 text-sm text-[#767494] lg:mb-8 lg:text-base'>
                  Lorem ipsum dolor sit amet consecte adipiscing elit amet
                  hendrerit pretium nu.
                </p>

                <div className='flex space-x-3'>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy py-2 text-xs font-semibold text-primary-heavy lg:text-sm'>
                    我有問題
                  </button>
                  <button className='h-9 w-[90px] rounded-3xl border border-primary-heavy bg-primary-heavy py-2 text-xs font-semibold text-white lg:text-sm'>
                    立即預約
                  </button>
                </div>
              </div>
            </li>
          </ul>

          {/* 分頁按鈕 */}
          <div className='mb-[94px] flex items-center justify-center lg:justify-end'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </section>
    </>
  )
}
