import Image from 'next/image';
import { SearchOutlined } from '@ant-design/icons';
import { ConfigProvider, Input } from 'antd';
import right from '../../../../public/images/Right.svg';
import userImg from '../../../../public/images/User01.jpg';

const userInfo = [
  {
    id: 1,
    image: userImg,
    name: '第一筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
    caseNum: 10,
  },
  {
    id: 2,
    image: userImg,
    name: '第二筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
    caseNum: 9,
  },
  {
    id: 3,
    image: userImg,
    name: '第三筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
    caseNum: 8,
  },
  {
    id: 4,
    image: userImg,
    name: '第四筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
    caseNum: 7,
  },
  {
    id: 5,
    image: userImg,
    name: '第五筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
    caseNum: 6,
  },
  {
    id: 6,
    image: userImg,
    name: '第六筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
    caseNum: 6,
  },
  {
    id: 7,
    image: userImg,
    name: '第七筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
    caseNum: 6,
  },
  {
    id: 8,
    image: userImg,
    name: '第八筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
    caseNum: 6,
  },
];

export default function CounselorCaseRecordPC() {
  return (
    <div className="">
      {/* 搜尋框 */}
      <div className="mb-6 w-full max-w-[200px]">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#424242',
              borderRadius: 9999,
              colorTextPlaceholder: '#9E9E9E',
              // colorText: colorPrimary,
              colorBgContainer: '#F5F5F5', // controlOutline: colorPrimary,
            },
          }}
        >
          <Input
            placeholder="輸入個案姓名"
            suffix={<SearchOutlined className="text-[#000000/85]" />}
            className="rounded-full border-none px-5 py-[10px]"
          />
        </ConfigProvider>
      </div>

      <div className="flex justify-between space-x-[60px] rounded-2xl bg-gray-200 pb-9 text-gray-900 lg:p-8 lg:pb-12">
        <ul className="flex flex-wrap">
          {userInfo.map((item) => (
            <li key={item.id} className="mr-[20px] w-[278px] rounded-xl">
              <button
                type="button"
                className="mb-4 flex w-full items-center rounded-lg bg-white py-5 px-2 text-center text-sm text-gray-900 hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src={item.image}
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>{item.name}</p>
                </div>

                <div className="w-[42.1176%] ">
                  {item.caseNum}
                  筆
                </div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
