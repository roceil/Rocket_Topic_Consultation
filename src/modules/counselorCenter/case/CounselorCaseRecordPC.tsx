import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { ConfigProvider, Input, Pagination } from 'antd';
import { counselorCasePage } from '@/common/redux/feature/counselorCasePage';

export default function CounselorCaseRecordPC() {
  const token = getCookie('auth');
  const dispatch = useDispatch();
  const pageNum = useSelector((state:{ counselorCasePage:{ value:number } }) => state.counselorCasePage.value);
  const [renderData, setRenderData] = useState([]);
  const [renderPhoto, setRenderPhoto] = useState('');
  const [keyWord, setKeyWord] = useState('');
  const [totalPageNum, setTotalPageNum] = useState(0);

  // ======================== 諮商總記錄 GET ========================
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/AppointmentsLogs?Page=${pageNum}&Name=${keyWord}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { Photo, appointmentsWithOrder, MaxPageNum } = res.data.Data;
        setRenderData(appointmentsWithOrder);
        setRenderPhoto(Photo);
        setTotalPageNum(MaxPageNum);
      } catch (error) {
        console.log('🚀 ~ file: CounselorCaseRecordPC.tsx:92 ~ getRecord ~ error:', error);
      }
    })();
  }, [keyWord]);

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
            defaultValue={keyWord}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const inputElement = e.target as HTMLInputElement;
                setKeyWord(inputElement.value);
              }
            }}

          />
        </ConfigProvider>
      </div>

      <div className="flex justify-center lg:justify-between space-x-[60px] rounded-2xl bg-gray-200 pb-9 text-gray-900 lg:p-8 lg:pb-12 mb-10 lg:min-h-[520px]">

        <ul className="flex lg:flex-wrap flex-col lg:flex-row pt-7">
          {renderData.map(({ AppointmentCount, Appointments: { UserName }, UserId }) => (
            <li key={UserId} className="lg:mr-[20px] w-[278px] rounded-xl">
              <Link
                href={`/counselorcenter/case/${UserName}`}
                className="mb-4 flex w-full items-center rounded-lg bg-white py-4 lg:py-5 px-2 text-center text-sm text-gray-900 hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center space-x-4 ">
                  <Image
                    width={40}
                    height={40}
                    src={renderPhoto}
                    alt={UserName}
                    className="rounded-full object-cover h-10 w-10 text-gray-900 ring-1 ring-secondary"
                  />
                  <p>{UserName}</p>
                </div>

                <div className="w-[42.1176%] ">
                  {AppointmentCount}
                  筆
                </div>

                <div className="flex w-[11.7647%] justify-center ">
                  <RightOutlined style={{ fontSize: '16px', color: '#F5F5F5' }} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12 flex w-full justify-center lg:justify-end">
        <Pagination
          defaultCurrent={pageNum}
          total={totalPageNum * 10}
          onChange={(value) => {
            dispatch(counselorCasePage(value));
          }}
        />
      </div>
    </div>
  );
}
