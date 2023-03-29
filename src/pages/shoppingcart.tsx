import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb, ConfigProvider } from 'antd';
import close from '../../public/images/Close.svg';
import example from '../../public/images/shoppingcart/example.svg';

const breadcrumbTabs = [
  {
    title: (
      <Link href="/" className="lg:text-base">
        Home
      </Link>
    ),
  },
  {
    title: <p className="text-secondary lg:text-base">購物車</p>,
  },
];

export default function ShopCart() {
  return (
    <section className="bg-white pt-14 pb-28 lg:pt-[84px] lg:pb-[152px]">
      <div className="container text-center">
        <div>
          <ConfigProvider>
            <Breadcrumb items={breadcrumbTabs} />
          </ConfigProvider>
        </div>

        <h2 className="relative mt-9 pb-3 after:absolute after:left-1/2 after:-bottom-1 after:h-1 after:w-10 after:-translate-x-1/2 after:bg-secondary lg:mt-[65px]">購物車</h2>

        {/* 表格 */}
        <div className="mt-12 rounded-[30px] border-2 border-gray-400 text-sm text-gray-700 lg:mt-[84px]">
          <ul className="flex border-b-2 border-gray-400 py-5 font-bold lg:py-[29px] lg:text-left lg:text-base">
            <li className="w-1/2 lg:pl-[130px]">預約項目</li>
            <li className="w-1/4 lg:pl-[85px]">堂數</li>
            <li className="w-1/4 lg:text-center">定價</li>
          </ul>

          <ul className="text-gray-900 lg:text-left lg:text-base">
            <li className="flex items-center border-b-2 border-gray-400 py-5">
              <div className="flex w-1/2 pl-7 lg:items-center lg:pl-14">
                <button type="button">
                  <Image src={close} alt="delete_icon" className="mr-6 lg:mr-0 lg:hover:opacity-50" />
                </button>

                <Image src={example} className="hidden rounded-2xl lg:ml-14 lg:block" alt="product-pic" width={100} height={100} priority />

                <div className="lg:ml-6">
                  <p className="mb-1 font-bold">親密關係</p>
                  <p className="text-left">誰跟誰</p>
                </div>
              </div>

              <div className="w-1/4 lg:pl-[84px]">
                <p>三堂</p>
              </div>

              <div className="w-1/4 lg:text-center">
                <p>$5,500</p>
              </div>
            </li>

            <li className="flex items-center border-b-2 border-gray-400 py-5">
              <div className="flex w-1/2 pl-7 lg:items-center lg:pl-14">
                <button type="button">
                  <Image src={close} alt="delete_icon" className="mr-6 lg:mr-0 lg:hover:opacity-50" />
                </button>

                <Image src={example} className="hidden rounded-2xl lg:ml-14 lg:block" alt="product-pic" width={100} height={100} priority />

                <div className="lg:ml-6">
                  <p className="mb-1 font-bold">親密關係</p>
                  <p className="text-left">誰跟誰</p>
                </div>
              </div>

              <div className="w-1/4 lg:pl-[84px]">
                <p>三堂</p>
              </div>

              <div className="w-1/4 lg:text-center">
                <p>$5,500</p>
              </div>
            </li>

            <li className="flex items-center border-b-2 border-gray-400 py-5">
              <div className="flex w-1/2 pl-7 lg:items-center lg:pl-14">
                <button type="button">
                  <Image src={close} alt="delete_icon" className="mr-6 lg:mr-0 lg:hover:opacity-50" />
                </button>

                <Image src={example} className="hidden rounded-2xl lg:ml-14 lg:block" alt="product-pic" width={100} height={100} priority />

                <div className="lg:ml-6">
                  <p className="mb-1 font-bold">親密關係</p>
                  <p className="text-left">誰跟誰</p>
                </div>
              </div>

              <div className="w-1/4 lg:pl-[84px]">
                <p>三堂</p>
              </div>

              <div className="w-1/4 lg:text-center">
                <p>$5,500</p>
              </div>
            </li>
          </ul>

          <div className=" flex justify-end space-x-5 py-6 pr-[25px] text-gray-900 lg:space-x-9 lg:py-8 lg:pr-[97px] lg:text-base">
            <p className="font-bold">總計</p>
            <p>$11,000</p>
          </div>
        </div>

        {/* 內含付款跟須知 */}
        <div className="lg:mt-12 lg:flex lg:justify-between">
          {/* 付款 */}
          <div className="mt-7 flex space-x-8 rounded-xl border-2 border-gray-400 py-5 px-7 font-bold text-gray-900 lg:mt-0 lg:w-[38.3399%] lg:justify-center lg:py-7 lg:text-lg">
            <p className="">進行付款</p>
            <button type="button" className="flex w-[156px] items-center justify-center rounded-xl bg-primary py-5 text-xl ring-secondary focus:ring-2 lg:w-[188px] lg:py-[55px]">
              信用卡
            </button>
          </div>

          {/* 預約須知 */}
          <div className="mt-7 rounded-xl border-2 border-gray-400 py-4 px-5 text-left font-bold text-gray-900 lg:mt-0 lg:w-[58.7944%] lg:py-5 lg:px-7 lg:text-lg">
            <p className="mb-2">預約須知</p>

            <ol className="ml-4 list-decimal text-sm font-normal leading-[175%] text-gray-800 lg:text-base">
              <li className="">請於結帳完成後，至會員中心選擇預約時段。</li>
              <li>
                預約成立後若要更改時段，請至
                <Link href="UserCenter" className="underline lg:hover:opacity-50">
                  {' '}
                  會員中心 / 預約管理 / 已成立
                  {' '}
                </Link>
                更改時段。
              </li>
              <li>為維護雙方權益，預約日前三天不可更改時段。</li>
              <li>如需取消預約，請聯絡小幫手處理。</li>
            </ol>
          </div>
        </div>

        {/* 按鈕 */}
        <div className="mt-7 flex space-x-5 text-base font-bold lg:mt-16 lg:justify-end lg:space-x-7 lg:text-base">
          <button type="button" className="fakeBorder w-full max-w-[180px] rounded-full py-4 text-secondary lg:hover:opacity-50">
            返回
          </button>

          <button type="button" className="fakeBorder w-full max-w-[180px] rounded-full bg-secondary py-4 text-white lg:hover:opacity-50">
            完成結帳
          </button>
        </div>
      </div>
    </section>
  );
}
