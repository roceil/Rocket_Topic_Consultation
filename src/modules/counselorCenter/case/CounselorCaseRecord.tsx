import CommonPagination from '@/common/components/CommonPagination';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { ConfigProvider, Input } from 'antd';
import Image from 'next/image';
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

export default function CounselorCaseRecord() {
  return (
    <>
      {/* 搜尋框 */}
      <div className="mb-6 w-full max-w-[200px]">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#424242',
              borderRadius: 9999,
              colorTextPlaceholder: '#9E9E9E',
              // colorText: colorPrimary,
              colorBgContainer: '#F5F5F5',
              // controlOutline: colorPrimary,
            },
          }}
        >
          <Input
            placeholder="輸入個案姓名"
            suffix={<SearchOutlined className="text-[#000000/85]" />}
            className="border-none px-5 py-2 rounded-3xl"
          />
        </ConfigProvider>
      </div>

      <div className="rounded-2xl bg-gray-200 pb-9 mb-10">
        <ul className=" space-y-4 px-5 pt-5">
          {userInfo.map((item) => (
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-3 px-2 text-center text-sm text-gray-900"
              >
                <div className="w-[44.1176%]">
                  <div className="flex items-center justify-center space-x-4 ">
                    <Image
                      width={40}
                      height={40}
                      src={item.image}
                      alt="user_pic"
                      className="rounded-full object-cover h-10 w-10 text-gray-900"
                    />
                    <p>{item.name}</p>
                  </div>
                </div>

                <div className="w-[44.1176%] lg:w-[16.3179%]">
                  {item.caseNum}
                  筆
                </div>

                <div className="flex w-[11.7647%] object-cover justify-center lg:w-[17.364%] lg:pl-[46px]">
                  <RightOutlined style={{ fontSize: '16px', color: '#F5F5F5' }} />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <CommonPagination />
    </>
  );
}
