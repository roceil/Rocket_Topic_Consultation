/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ConfigProvider, Tabs } from 'antd';
import { InfoForm } from '@/modules/counselorCenter/personalInfo/InfoForm';
import userImg from '../../../public/images/User01.jpg';
import { ClassInfo } from '../../modules/counselorCenter/personalInfo/ClassInfo';
import { TimeInfo } from './TimeInfo';

const conselor1 = {
  name: '李森',
  id: 1,
  LicenseNum: 12345678,
  slogan: '您的諮商年資、特殊經歷等...',
  introduce:
    '您好！我是一位經驗豐富的諮商師，專門提供情緒支持、心理諮詢、人際關係建設等方面的服務。我擁有豐富的臨床經驗，並且持有心理學相關的學位和專業認證。我以富有同理心、耐心和關注每位來訪者的需求為信念，努力協助您渡過生命難關',
  image: userImg,
};

export interface CounselorProps {
  name: string;
  id: number;
  LicenseNum: number;
  slogan: string;
  introduce: string;
  // counselorImage: ;
}

const counselorInfoTabAry = [
  {
    key: '基本資料',
    label: '基本資料',
    children: (
      <InfoForm
        name={conselor1.name}
        id={conselor1.id}
        LicenseNum={conselor1.LicenseNum}
        slogan={conselor1.slogan}
        introduce={conselor1.introduce}
        // counselorImage={conselor1.image}
      />
    ),
  },
  {
    key: '課程資訊',
    label: '課程資訊',
    children: <ClassInfo />,
  },
  {
    key: '預約時段',
    label: '預約時段',
    children: <TimeInfo />,
  },
];

// 控制右側選單函式
export default function CounselorInfoTab() {
  // 顯示分頁位置函式
  const onChange = (key: string) => {
    console.log('🚀 ~ file: reservation.tsx:23 ~ onChange ~ key:', key);
  };
  return (
    <div className="counselorTab">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4A5364',
            colorText: '#9E9E9E',
            fontSize: 16,
            margin: 32,
          },
        }}
      >
        <Tabs
          defaultActiveKey="基本資料"
          items={counselorInfoTabAry}
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
}
