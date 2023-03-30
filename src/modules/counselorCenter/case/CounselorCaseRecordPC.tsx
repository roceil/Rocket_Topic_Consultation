import Image from 'next/image';
import { SearchOutlined } from '@ant-design/icons';
import { ConfigProvider, Input } from 'antd';
import right from '../../../../public/images/Right.svg';

export default function CounselorCaseRecordPC() {
  return (
    <div className="">
      {/* 搜尋框 */}
      <div className="mb-6 w-full max-w-[200px]">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#5D5A88',
              borderRadius: 9999,
              colorTextPlaceholder: '#5D5A88',
              // colorText: colorPrimary,
              colorBgContainer: '#EEECFA', // controlOutline: colorPrimary,
            },
          }}
        >
          <Input
            placeholder="輸入個案姓名"
            suffix={<SearchOutlined className="text-[#5D5A88]" />}
            className="border-none px-5 py-1 "
          />
        </ConfigProvider>
      </div>

      <div className="flex justify-between space-x-[60px] rounded-2xl bg-bg2 pb-9 text-primary-heavy lg:px-8 lg:pb-12">
        <div className="w-[278px] ">
          <ul className="flex border-b border-secondary py-6 text-center font-bold">
            <li className="w-[44.1176%]">個案記錄</li>
            <li className="w-[44.1176%]">記錄筆數</li>
            <li className="w-[11.7647%]" />
          </ul>

          <ul className=" space-y-4 pt-5">
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
          </ul>
        </div>

        <div className="w-[278px] ">
          <ul className="flex border-b border-secondary py-6 text-center font-bold">
            <li className="w-[44.1176%]">個案記錄</li>
            <li className="w-[44.1176%]">記錄筆數</li>
            <li className="w-[11.7647%]" />
          </ul>

          <ul className=" space-y-4 pt-5">
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
          </ul>
        </div>

        <div className="w-[278px] ">
          <ul className="flex border-b border-secondary py-6 text-center font-bold">
            <li className="w-[44.1176%]">個案記錄</li>
            <li className="w-[44.1176%]">記錄筆數</li>
            <li className="w-[11.7647%]" />
          </ul>

          <ul className=" space-y-4 pt-5">
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
